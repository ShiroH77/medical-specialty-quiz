'use strict';

/**
 * scoring.js — Pure scoring functions, no DOM dependencies.
 * Compatible with browser (<script src="scoring.js">) and Node.js (LINE Bot etc.)
 *
 *  Node.js usage:
 *    const Scoring = require('./scoring');
 *
 *  Browser usage:
 *    Scoring.calculateSpecialtyMatches(dimScores, specialties)
 *
 * Scoring algorithm (v6):
 *   Old approach: weighted sum → 100 % for all specialties when all answers are
 *   identical (e.g. all-5), so JSON order decided the ranking.
 *
 *   New approach: Euclidean distance between the user's dimension-score vector
 *   and each specialty's "ideal profile" vector (weights normalised 1-5 → 0-1).
 *   matchScore = 1 − normalised_distance  →  displayed as 0-100 %.
 *   When answers are uniform, specialties whose ideal aligns with the flat vector
 *   still score differently from each other, avoiding a total tie.
 *   A low-variance warning is shown when answer spread is too small.
 */

var Scoring = (function () {

  // ─────────────────────────────────────────────────────────────────
  //  normalizeAnswers
  // ─────────────────────────────────────────────────────────────────
  /**
   * Map raw 1-5 answers to a 0-1 scale.
   * Missing answers default to 3 (neutral → 0.5).
   *
   * @param  {Object} answers   { questionId: 1-5 }
   * @param  {Array}  questions Array of question objects
   * @returns {Object}          { questionId: 0-1 }
   */
  function normalizeAnswers(answers, questions) {
    var result = {};
    questions.forEach(function (q) {
      var raw = (answers[q.id] != null) ? answers[q.id] : 3;
      result[q.id] = (raw - 1) / 4;
    });
    return result;
  }

  // ─────────────────────────────────────────────────────────────────
  //  calculateDimensionScores
  // ─────────────────────────────────────────────────────────────────
  /**
   * Average normalised answer scores per dimension (dim).
   *
   * @param  {Object} normAnswers { questionId: 0-1 }
   * @param  {Array}  questions
   * @returns {Object}            { dim: 0-1 }
   */
  function calculateDimensionScores(normAnswers, questions) {
    var totals = {}, counts = {};
    questions.forEach(function (q) {
      var v = (normAnswers[q.id] != null) ? normAnswers[q.id] : 0.5;
      totals[q.dim] = (totals[q.dim] || 0) + v;
      counts[q.dim] = (counts[q.dim] || 0) + 1;
    });
    var dimScores = {};
    Object.keys(totals).forEach(function (d) {
      dimScores[d] = totals[d] / counts[d];
    });
    return dimScores;
  }

  // ─────────────────────────────────────────────────────────────────
  //  calculateSpecialtyMatches
  // ─────────────────────────────────────────────────────────────────
  /**
   * Score each specialty by comparing the user's dimension-score vector
   * against the specialty's "ideal profile" vector.
   *
   * Ideal profile: specialty.weights (1-5) normalised to [0, 1]
   *   idealNorm[d] = (weight[d] - 1) / 4
   *
   * Distance metric: normalised Euclidean distance over all dimensions
   *   dist = sqrt( Σ (userScore[d] - idealNorm[d])² / numDims )
   *   Range: [0, 1]  (0 = perfect match, 1 = worst possible)
   *
   * Match score → percentage
   *   pct = round( (1 - dist) × 100 )
   *
   * Why this is better than the old weighted-sum:
   *   • Old: all-identical answers → every specialty gets 100 % → JSON order wins.
   *   • New: specialties whose ideal is far from the flat user vector score lower,
   *     so there is always real differentiation.
   *
   * @param  {Object} dimScores   { dim: 0-1 }
   * @param  {Array}  specialties Array of specialty objects with a .weights map
   * @returns {Array}             Sorted [{ sp, pct, dimScore, dist }], best first
   */
  function calculateSpecialtyMatches(dimScores, specialties) {
    var scored = specialties.map(function (sp) {
      var dims = Object.keys(sp.weights);
      var sumSqDiff = 0;

      dims.forEach(function (d) {
        var idealNorm = (sp.weights[d] - 1) / 4;           // 1→0, 3→0.5, 5→1
        var userScore = (dimScores[d] != null) ? dimScores[d] : 0.5;
        var diff = userScore - idealNorm;
        sumSqDiff += diff * diff;
      });

      // Divide by numDims to keep distance in [0, 1] regardless of dimension count
      var dist = Math.sqrt(sumSqDiff / dims.length);
      var pct  = Math.round((1 - dist) * 100);

      return { sp: sp, pct: pct, dimScore: dimScores, dist: dist };
    });

    scored.sort(function (a, b) { return b.pct - a.pct; });
    return scored;
  }

  // ─────────────────────────────────────────────────────────────────
  //  computeAnswerVariance
  // ─────────────────────────────────────────────────────────────────
  /**
   * Population variance of raw 1-5 answers.
   * Useful for detecting low-information responses (all same value).
   *
   * Typical ranges:
   *   0       — all identical (e.g. all-3 or all-5)
   *   0.5-1.0 — limited spread
   *   1.5-2.5 — normal spread
   *   4.0     — maximally polarised (alternating 1 and 5)
   *
   * @param  {Object} answers { questionId: 1-5 }
   * @returns {number}
   */
  function computeAnswerVariance(answers) {
    var vals = [];
    Object.keys(answers).forEach(function (k) { vals.push(answers[k]); });
    if (!vals.length) return 0;
    var mean = vals.reduce(function (s, v) { return s + v; }, 0) / vals.length;
    var variance = vals.reduce(function (s, v) {
      return s + (v - mean) * (v - mean);
    }, 0) / vals.length;
    return variance;
  }

  // ─────────────────────────────────────────────────────────────────
  //  _buildSummary  (internal)
  // ─────────────────────────────────────────────────────────────────
  function _buildSummary(ranked, answers, msgs) {
    var variance = computeAnswerVariance(answers);
    var top2diff = (ranked.length >= 2) ? (ranked[0].pct - ranked[1].pct) : 100;
    return {
      variance:        variance,
      isLowVariance:   variance < 0.8,          // std_dev < ~0.9
      isTied:          top2diff <= 5,            // 1st and 2nd within 5 pts
      lowVarianceMsg:  msgs.lowVariance,
      tiedMsg:         msgs.tied
    };
  }

  // ─────────────────────────────────────────────────────────────────
  //  buildResultSummaryForStudent
  // ─────────────────────────────────────────────────────────────────
  /**
   * Compute result meta-information for the student-facing view.
   * Intended for display by the UI layer (not for scoring itself).
   *
   * @param  {Array}  ranked  Output of calculateSpecialtyMatches()
   * @param  {Object} answers Raw 1-5 answers
   * @returns {{ variance, isLowVariance, isTied, lowVarianceMsg, tiedMsg }}
   */
  function buildResultSummaryForStudent(ranked, answers) {
    return _buildSummary(ranked, answers, {
      lowVariance: '回答のばらつきが少ないため、診断結果の確信度は低めです。気になる科を複数見比べてください。',
      tied:        '上位は僅差です。1位だけでなく2〜3位も参考にしてください。'
    });
  }

  // ─────────────────────────────────────────────────────────────────
  //  buildResultSummaryForPublic
  // ─────────────────────────────────────────────────────────────────
  /**
   * Compute result meta-information for the general-public view.
   *
   * @param  {Array}  ranked
   * @param  {Object} answers
   * @returns {{ variance, isLowVariance, isTied, lowVarianceMsg, tiedMsg }}
   */
  function buildResultSummaryForPublic(ranked, answers) {
    return _buildSummary(ranked, answers, {
      lowVariance: '回答が似た値に偏っているため、診断の精度が下がる場合があります。気になるタイプをいくつか読み比べてみてください！',
      tied:        '上位タイプは僅差でした！1位だけでなく2・3位のタイプも読んでみてください。'
    });
  }

  // ─────────────────────────────────────────────────────────────────
  //  Public API
  // ─────────────────────────────────────────────────────────────────
  return {
    normalizeAnswers:             normalizeAnswers,
    calculateDimensionScores:     calculateDimensionScores,
    calculateSpecialtyMatches:    calculateSpecialtyMatches,
    computeAnswerVariance:        computeAnswerVariance,
    buildResultSummaryForStudent: buildResultSummaryForStudent,
    buildResultSummaryForPublic:  buildResultSummaryForPublic
  };

}());

// CommonJS export — makes the same file usable in Node.js (LINE Bot, unit tests)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Scoring;
}
