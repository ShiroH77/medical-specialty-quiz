# 診療科マッチング診断

医学生・一般向けの診療科適性診断 Web アプリです。30問の質問に答えるだけで、あなたに合う診療科タイプを発見できます。

## デモ

> Vercel / Netlify にデプロイ後、URL をここに記載してください。

## 機能

- **医学生向けモード** — 臨床的な質問と診療科ごとの詳細解説で、進路検討をサポート
- **一般向けモード** — 専門用語なし。性格診断感覚で「何科タイプか」を発見
- 30問 × 10次元のスコアリング（ユークリッド距離法）で 15 診療科とマッチング
- 結果は「3秒サマリー」でファーストビューに集約。詳細は任意展開
- 回答のばらつき検出・僅差通知・結果シェア機能

## ローカル起動

ビルド不要。Python が入っていれば即起動できます。

```bash
cd medical-specialty-quiz
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080` を開いてください。

`python3` がない場合は Node.js でも起動できます。

```bash
npx serve .
```

> `file://` で直接開いた場合、`fetch()` によるデータ読み込みが失敗しますが、アプリ内のフォールバックデータで動作します。

## 公開方法

### Vercel

1. このリポジトリを GitHub に push
2. [Vercel](https://vercel.com) でリポジトリをインポート
3. Framework Preset: **Other**、Root Directory: リポジトリルート
4. Deploy → 完了

### Netlify

1. このリポジトリを GitHub に push
2. [Netlify](https://app.netlify.com) で「Import from Git」
3. Build command: （空欄）、Publish directory: `.`
4. Deploy site → 完了

どちらも `index.html` が起点の純粋な静的サイトのため、設定変更は不要です。

## 技術構成

| 項目 | 内容 |
|------|------|
| フロントエンド | 素の HTML / CSS / JavaScript（ビルドツールなし） |
| スコアリング | `scoring.js`（DOM 依存なし・Node.js でも利用可） |
| データ | `data/questions.json` / `data/specialties.json` |
| 外部依存 | なし |

### ファイル構成

```
medical-specialty-quiz/
├── index.html        # エントリーポイント
├── style.css         # スタイル
├── app.js            # UI・画面制御
├── scoring.js        # スコアリング純関数（DOM 非依存）
└── data/
    ├── questions.json   # 30 問の質問データ
    └── specialties.json # 15 診療科のプロファイルデータ
```

### スコアリングアルゴリズム

ユーザーの回答（1〜5）を次元スコア（0〜1）に変換し、各診療科の理想プロファイルベクトルとのユークリッド距離を計算します。

```
matchScore = 1 − √( Σ(userScore[d] − idealNorm[d])² / numDims )
```

`scoring.js` は CommonJS にも対応しており、LINE Bot などサーバーサイドでも再利用できます。

## 注意事項

- 本ツールは自己理解・進路検討の補助を目的とした参考情報です
- 医学的な適性診断や進路の確定を行うものではありません
- 実習・見学・指導医との対話を通じて総合的にご検討ください
