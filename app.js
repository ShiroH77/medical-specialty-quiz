'use strict';

// ══════════════════════════════════════════════════════════════════
//  EMBEDDED DATA (fallback when fetch fails / opened via file://)
//  Source of truth: data/questions.json & data/specialties.json
// ══════════════════════════════════════════════════════════════════

var FALLBACK_QUESTIONS = [
  { id: 1,  dim:'hands_on',      dimLabel:'手技・手術',        dimLabelPublic:'実践力・手先タイプ',    text:'手術や処置で患者さんを直接治せる手応えに、強く惹かれる',                             textPublic:'何かを自分の手で作り上げた瞬間の達成感が、たまらなく好きだ' },
  { id: 2,  dim:'hands_on',      dimLabel:'手技・手術',        dimLabelPublic:'実践力・手先タイプ',    text:'細かな作業や精密な手の動作が得意で、むしろ没頭してしまう',                           textPublic:'細かい作業ほど集中できる。手先の器用さには自信がある' },
  { id: 3,  dim:'hands_on',      dimLabel:'手技・手術',        dimLabelPublic:'実践力・手先タイプ',    text:'新しい手技や医療デバイスは、自分から率先して習得したいと思う',                         textPublic:'新しい道具やアプリの使い方を、人より早く覚える方だ' },
  { id: 4,  dim:'long_term',     dimLabel:'長期的な関わり',    dimLabelPublic:'長くつながるタイプ',    text:'患者さんと長年にわたって継続的な関係を築くことに喜びを感じる',                         textPublic:'浅く広くより、少数でも深くつながる関係の方が好きだ' },
  { id: 5,  dim:'long_term',     dimLabel:'長期的な関わり',    dimLabelPublic:'長くつながるタイプ',    text:'慢性疾患の管理や生活習慣の改善指導に、意義を感じて取り組める',                         textPublic:'「その人をよく知った上で」アドバイスしたい、と思う' },
  { id: 6,  dim:'long_term',     dimLabel:'長期的な関わり',    dimLabelPublic:'長くつながるタイプ',    text:'患者さんのライフステージ全体に寄り添う医療を実現したい',                               textPublic:'長年支え合える、深いつながりに憧れる' },
  { id: 7,  dim:'acute',         dimLabel:'急性期・救急',      dimLabelPublic:'瞬発力・アドレナリン',  text:'急変対応の練習や緊急シミュレーションで、周囲が焦っていても自分は落ち着いて動ける方だ',   textPublic:'緊急事態でも、意外と頭が冷静になる方だ' },
  { id: 8,  dim:'acute',         dimLabel:'急性期・救急',      dimLabelPublic:'瞬発力・アドレナリン',  text:'深夜や休日の緊急呼び出しも、仕事の醍醐味として受け止められる',                         textPublic:'予定が突然変わっても、「なんとかなるか」と思える' },
  { id: 9,  dim:'acute',         dimLabel:'急性期・救急',      dimLabelPublic:'瞬発力・アドレナリン',  text:'OSCEや実技試験など評価される場面になると、むしろスイッチが入って集中できる',           textPublic:'大事な場面ほど、なぜかスイッチが入る感覚がある' },
  { id: 10, dim:'research',      dimLabel:'研究・学術思考',    dimLabelPublic:'知的好奇心・探求派',    text:'疾患の病態生理や最新の研究に、自然と強い好奇心が向く',                                 textPublic:'「仕組みってどうなってるんだろう」と、つい深掘りしてしまう' },
  { id: 11, dim:'research',      dimLabel:'研究・学術思考',    dimLabelPublic:'知的好奇心・探求派',    text:'データを分析し、論文や学会発表にまとめることに充実感を覚える',                           textPublic:'数字やデータの中に法則を見つけると、テンションが上がる' },
  { id: 12, dim:'research',      dimLabel:'研究・学術思考',    dimLabelPublic:'知的好奇心・探求派',    text:'エビデンスを批判的に評価し、診療に応用する思考プロセスが楽しい',                         textPublic:'新しい研究や発見のニュースに、自然と目がいく' },
  { id: 13, dim:'technical',     dimLabel:'医療機器・技術',    dimLabelPublic:'テクノロジー好き',      text:'超音波・カテーテル・内視鏡など、医療機器の操作技術を身につけたい',                       textPublic:'最新ガジェットや機能は、とりあえず試してみたくなる' },
  { id: 14, dim:'technical',     dimLabel:'医療機器・技術',    dimLabelPublic:'テクノロジー好き',      text:'画像や数値データを解析して診断に結びつけることが、自分に向いていると感じる',             textPublic:'グラフや数字を見ると、全体像がすっと頭に入ってくる' },
  { id: 15, dim:'technical',     dimLabel:'医療機器・技術',    dimLabelPublic:'テクノロジー好き',      text:'技術の進歩に合わせてスキルを更新し続けることを楽しめる',                               textPublic:'技術の進化についていくことに、ワクワク感を感じる' },
  { id: 16, dim:'communication', dimLabel:'コミュニケーション', dimLabelPublic:'共感・聴き上手',       text:'患者さんの話を傾聴し、感情や生活背景まで理解しようとする',                             textPublic:'話を聴くとき、言葉の裏にある気持ちまで感じ取ろうとしている' },
  { id: 17, dim:'communication', dimLabel:'コミュニケーション', dimLabelPublic:'共感・聴き上手',       text:'患者さんや家族の精神的なサポートに積極的に関わりたい',                                 textPublic:'落ち込んでいる人を見ると、そばにいてあげたいと感じる' },
  { id: 18, dim:'communication', dimLabel:'コミュニケーション', dimLabelPublic:'共感・聴き上手',       text:'多職種チームの中でうまくコミュニケーションを取ることが得意だ',                           textPublic:'チームで動く方が、一人より力が出ると感じる' },
  { id: 19, dim:'visual',        dimLabel:'視覚的診断',        dimLabelPublic:'観察眼・ビジュアル派',  text:'CTやMRIなどの画像を読むことに強い興味と適性を感じる',                                   textPublic:'写真や絵を見ると、細かな違いや変化にすぐ気づく方だ' },
  { id: 20, dim:'visual',        dimLabel:'視覚的診断',        dimLabelPublic:'観察眼・ビジュアル派',  text:'皮膚や眼など、目に見える所見から診断する作業が好きだ',                                   textPublic:'見た目や雰囲気から、直感的に「なんか変」と察知できる' },
  { id: 21, dim:'visual',        dimLabel:'視覚的診断',        dimLabelPublic:'観察眼・ビジュアル派',  text:'解剖学的な空間認識や立体的なイメージをつかむことが得意だ',                               textPublic:'地図や立体的なものを見ると、頭の中で空間がすっと広がる' },
  { id: 22, dim:'lifestyle',     dimLabel:'ライフスタイル',    dimLabelPublic:'オフ重視・メリハリ派',  text:'規則的な勤務時間と確実な休日の確保を、強く重視している',                               textPublic:'オフの時間は、しっかり自分や大切な人のために使いたい' },
  { id: 23, dim:'lifestyle',     dimLabel:'ライフスタイル',    dimLabelPublic:'オフ重視・メリハリ派',  text:'医師の仕事以外にも、大切にしたい趣味や家族との時間がある',                             textPublic:'仕事だけじゃない。趣味や大切な人との時間も同じくらい大事' },
  { id: 24, dim:'lifestyle',     dimLabel:'ライフスタイル',    dimLabelPublic:'オフ重視・メリハリ派',  text:'長時間労働が常態化している環境は、できれば避けたい',                                   textPublic:'仕事のオンオフをはっきりさせて、充実した毎日を送りたい' },
  { id: 25, dim:'variety',       dimLabel:'多様な経験',        dimLabelPublic:'変化・刺激好き',        text:'毎日異なる症例・患者さんと出会えることに、強い刺激を感じる',                           textPublic:'毎日同じことの繰り返しより、新しい出来事があった方が好きだ' },
  { id: 26, dim:'variety',       dimLabel:'多様な経験',        dimLabelPublic:'変化・刺激好き',        text:'幅広い疾患・年齢層を扱い、多様な経験を積むことを重視する',                             textPublic:'一つのことを深めるより、いろんな分野を幅広く知っていたい' },
  { id: 27, dim:'variety',       dimLabel:'多様な経験',        dimLabelPublic:'変化・刺激好き',        text:'実習中に担当患者が急に変わったり予定が変更されても、混乱せず対処できる方だ',           textPublic:'「想定外」の状況でも、意外と冷静に対処できる方だ' },
  { id: 28, dim:'precision',     dimLabel:'精密さ・正確性',    dimLabelPublic:'几帳面・完璧主義',      text:'細部まで確認し、ミスを徹底的に防ぐことへの意識が高い',                                 textPublic:'細かいことが気になる。「ちゃんと確認しないと」タイプだ' },
  { id: 29, dim:'precision',     dimLabel:'精密さ・正確性',    dimLabelPublic:'几帳面・完璧主義',      text:'標準化された手順やプロトコルを大切にして、確実に仕事を進める',                           textPublic:'計画通りに進めることで、力を最大限に発揮できる' },
  { id: 30, dim:'precision',     dimLabel:'精密さ・正確性',    dimLabelPublic:'几帳面・完璧主義',      text:'縫合や採血の練習で疲れてきても、確認を省かず最後まで丁寧にやり切れる',               textPublic:'「ここぞ」という場面でも、焦らず丁寧にやり切れる' }
];

var FALLBACK_SPECIALTIES = [
  {
    id:'internal', name:'内科', publicOnly:true,
    emoji:'🩺', color:'#3b82f6', shortType:'思考探求型',
    title:'知の迷宮を歩む深淵の思索者', archetype:'思索探求者',
    relatableTraits:['なんでも「なぜ？」から入る','話すと長くなりがちだが、中身は濃い','知れば知るほど面白くなる','長く付き合うほど信頼される'],
    oneLine:'知識と論理で複雑な謎を解く、頭脳明晰な探究者タイプ',
    friendComment:'友達からは「なんでも知ってる」「落ち着いていて頼れる」と思われているかも。',
    suitableEnv:'じっくり考えて問題を解決できる職場、学びが途切れない環境',
    typeName:'内科・思考派タイプ', catchphrase:'知識と論理で複雑な病態を解き明かす',
    personality:'考えること・分析することが得意で、複雑な問題も論理的に解決できるタイプ。じっくり人と向き合い、長期的な視点で物事を考えます。',
    publicDescription:'「なぜ？」を追いかける知的好奇心旺盛な探究者。データや情報を整理して本質を見抜く力があり、長くつながる人間関係を大切にします。',
    tagline:'知識と論理で複雑な病態を解き明かす',
    desc:'全身の慢性・急性疾患を幅広く扱う診療科。丁寧な問診からエビデンスに基づく治療方針を立て、患者さんの長期的な健康を支えます。',
    weights:{hands_on:2,long_term:4,acute:3,research:4,technical:2,communication:4,visual:2,lifestyle:2,variety:4,precision:3},
    strengths:['幅広い疾患を扱え、多様な知識・経験が積める','患者さんと長期的な信頼関係を構築できる','アカデミアとの親和性が高く研究にも取り組める'],
    cautions:['不規則な当直や緊急対応が多い科もある','手技を中心に活躍したい人には物足りない場合がある']
  },
  {
    id:'surgery', name:'外科', publicOnly:true,
    emoji:'🔪', color:'#ef4444', shortType:'行動突破型',
    title:'修羅場で輝く決断の使い手', archetype:'決断の実行者',
    relatableTraits:['考えるより先に体が動いている','やり切った後の達成感が最高','グダグダした話し合いが苦手','頼まれると断れない'],
    oneLine:'考えるより動く！手と技術で道を切り拓く実践家タイプ',
    friendComment:'友達からは「頼もしい！」「決断力がある」「一緒にいると安心」と思われているかも。',
    suitableEnv:'手を動かし続けられる現場、挑戦の連続する環境',
    typeName:'外科・行動派タイプ', catchphrase:'手と技術で命をつなぐ実践家',
    personality:'考えるより動く！プレッシャー下でこそ力を発揮し、見える形で人を助けることに深いやりがいを感じる行動派。体を動かすことが好きで、達成感を大切にします。',
    publicDescription:'「直接手を動かして人を助けたい」という強い使命感の持ち主。困難な状況でも冷静に対処できる頼れる存在。',
    tagline:'メスで命をつなぐ、技術と決断力の医師',
    desc:'手術によって疾患を直接治療する診療科。高度な手技とプレッシャー下での即断即決が求められ、達成感と責任感が共存します。',
    weights:{hands_on:5,long_term:2,acute:4,research:2,technical:3,communication:2,visual:3,lifestyle:1,variety:2,precision:4},
    strengths:['手術で患者さんの命を救える直接的な達成感がある','高度な手技を磨き続けられる','チームをリードするリーダーシップが発揮できる'],
    cautions:['拘束時間が長く、ワークライフバランスの確保が難しい','長時間手術への体力・集中力が求められる']
  },
  {
    id:'pediatrics', name:'小児科',
    emoji:'👶', color:'#f59e0b', shortType:'共感温かみ型',
    title:'笑顔をつなぐ温かな守護者', archetype:'温かな守護者',
    relatableTraits:['子どもや動物に自然となつかれる','場の空気を和ませるのが得意','誰かが困っていると放っておけない','長く付き合うほど好かれるタイプ'],
    oneLine:'誰にでも自然と寄り添える、温かい存在感のタイプ',
    friendComment:'友達からは「話しやすい！」「いると場が和む」「優しい」と思われているかも。',
    suitableEnv:'人の温かさを感じられる職場、長く関われる環境',
    typeName:'小児科・共感派タイプ', catchphrase:'子どもの笑顔と未来を守る温かい守護者',
    personality:'人懐っこく、相手の感情を自然に受け取れる共感力の持ち主。子どもや家族との関わりに喜びを感じ、人の成長を長い目で見守ることができます。',
    publicDescription:'温かみがあって、子どもや弱い立場の人に自然と寄り添えるタイプ。相手の感情を敏感に読み取り、場の空気を和ませる力があります。',
    tagline:'子どもの未来を守り、成長を見届ける医師',
    desc:'新生児から思春期までの子どもの疾患を総合的に診る診療科。子どもと家族への高いコミュニケーション能力と幅広い知識が求められます。',
    weights:{hands_on:2,long_term:4,acute:3,research:2,technical:1,communication:5,visual:1,lifestyle:2,variety:4,precision:2},
    strengths:['子どもの成長・回復を長期にわたって見届けられる','家族全体を包括的にサポートできる','地域医療・予防医療にも深く関われる'],
    cautions:['家族の不安対応など感情的な負荷がある','休日・夜間の急患対応が多い']
  },
  {
    id:'obgyn', name:'産婦人科',
    emoji:'🌸', color:'#ec4899', shortType:'情熱献身型',
    title:'命の瞬間に全力を捧げる熱血の伴走者', archetype:'熱血の伴走者',
    relatableTraits:['本気で取り組まないと気が済まない','大事な場面ほど燃える','人の節目に立ち会えることが誇り','体力には自信がある（たぶん）'],
    oneLine:'大切な瞬間に全力を尽くす、熱い情熱の持ち主タイプ',
    friendComment:'友達からは「本気で向き合ってくれる」「頼りになる」「熱い人」と思われているかも。',
    suitableEnv:'情熱を持って挑める現場、人生の転機に立ち会える環境',
    typeName:'産婦人科・情熱派タイプ', catchphrase:'命の誕生に立ち会う人生の伴走者',
    personality:'人生の特別な瞬間を共に過ごすことに深い意義を感じる情熱家。体力と気力があり、どんな状況でも全力で臨める。技術と共感力を兼ね備えています。',
    publicDescription:'情熱的で、人の大切な瞬間に関わることが生きがいのタイプ。行動力があり、困難な場面でも諦めずに全力を尽くす頼もしい存在です。',
    tagline:'命の誕生と女性の健康を守る',
    desc:'妊娠・出産管理と女性特有の疾患（がん・内分泌疾患など）の両方を扱います。手術手技から産科救急まで幅広いスキルが求められます。',
    weights:{hands_on:4,long_term:3,acute:4,research:2,technical:3,communication:4,visual:2,lifestyle:1,variety:3,precision:3},
    strengths:['出産という人生の喜びの瞬間に立ち会える','手術と内科的管理の両方を経験できる','女性の一生を通じた継続的ケアができる'],
    cautions:['夜間・休日の緊急分娩対応が多い','体力的・精神的な消耗が大きい場面がある']
  },
  {
    id:'psychiatry', name:'精神科',
    emoji:'💭', color:'#8b5cf6', shortType:'傾聴共感型',
    title:'心の奥を読み解く対話探偵', archetype:'心の探偵',
    relatableTraits:['「なんでも話してくれる」とよく言われる','人間観察が止まらない','一人の時間も大切にしたい','映画や音楽をついつい深読みしてしまう'],
    oneLine:'心の声に耳を澄ませる、深い共感力と内省力の持ち主',
    friendComment:'友達からは「聞いてくれる」「一緒にいると落ち着く」「感性が豊か」と思われているかも。',
    suitableEnv:'じっくり話せる環境、人の内面に深く関われる職場',
    typeName:'精神科・聴き上手タイプ', catchphrase:'心の声に耳を澄ます、共感の達人',
    personality:'人の内面の世界に深い興味を持ち、じっくり話を聴ける人。心理学や人間観察が好きで、哲学的・内省的な思考を楽しみます。',
    publicDescription:'「話を聴いてもらえると安心する」と周りに言われるタイプ。人の心の機微を自然に感じ取り、寄り添う力に長けています。',
    tagline:'心と向き合い、人生を支える医師',
    desc:'統合失調症・うつ病・依存症など精神疾患を診断・治療します。薬物療法と精神療法を組み合わせ、社会復帰と生活の質向上を目指します。',
    weights:{hands_on:1,long_term:5,acute:1,research:3,technical:1,communication:5,visual:1,lifestyle:4,variety:2,precision:2},
    strengths:['患者さんの人生に長期的・深く寄与できる','傾聴・共感スキルを最大限に活かせる','ワークライフバランスが比較的取りやすい科も多い'],
    cautions:['治療の効果が見えにくく、長期的な関わりに忍耐が必要','手技を中心に働きたい人には向かない']
  },
  {
    id:'emergency', name:'救急科',
    emoji:'⚡', color:'#f97316', shortType:'即断即決型',
    title:'修羅場で輝く現場指揮官', archetype:'現場指揮官',
    relatableTraits:['修羅場ほど冷静になれる','頼られるとスイッチが入る','平和すぎると逆に落ち着かない','「なんとかなる」が口癖'],
    oneLine:'トラブルに強い、瞬時の判断力で場を制するアドレナリンタイプ',
    friendComment:'友達からは「いざという時に一番頼れる」「肝が据わってる」「かっこいい」と思われているかも。',
    suitableEnv:'刺激とスピードのある現場、変化が多く飽きない環境',
    typeName:'救急科・アドレナリンタイプ', catchphrase:'最前線で命をつなぐ、瞬発力の持ち主',
    personality:'スリルと緊張感の中でこそ輝く生粋の行動派。マルチタスクが得意で、変化の多い環境を楽しめる。「退屈」が一番の敵で、常に刺激を求めています。',
    publicDescription:'いざという時に頼りになる、瞬発力抜群のタイプ。変化の多い環境で生き生きとし、困難な状況でも諦めず最善を尽くします。',
    tagline:'最前線で命をつなぐ、瞬時の判断力',
    desc:'あらゆる疾患・外傷の急性期に対応する診療科。全科の知識を横断的に活用し、速い判断と処置で命を救います。変化に富んだ毎日が魅力です。',
    weights:{hands_on:4,long_term:1,acute:5,research:1,technical:3,communication:3,visual:2,lifestyle:2,variety:5,precision:3},
    strengths:['毎日異なる症例で常に刺激的','直接的に命を救える使命感がある','全科の知識を横断的に活用できる'],
    cautions:['夜勤・長時間勤務が多く体力的な消耗が大きい','燃え尽き症候群のリスクがある']
  },
  {
    id:'dermatology', name:'皮膚科',
    emoji:'✨', color:'#06b6d4', shortType:'鋭観察型',
    title:'細部に宿る真実を見抜く観察の使者', archetype:'鋭敏な観察者',
    relatableTraits:['細かいことに気づきすぎて疲れることも','ビジュアルのセンスを褒められがち','仕事とプライベートのメリハリを大切にしたい','美しいものに心が動く'],
    oneLine:'細かいことに気づく、鋭い観察眼と審美眼の持ち主',
    friendComment:'友達からは「よく気づくね！」「センスがある」「細かい！（いい意味で）」と思われているかも。',
    suitableEnv:'観察力と専門技術を活かせる職場、オンオフをしっかり切り替えられる環境',
    typeName:'皮膚科・観察眼タイプ', catchphrase:'細かいことに気づく、鋭い観察者',
    personality:'細かいことに気づく観察力の持ち主。生活リズムを大切にしながら、専門的なスキルを磨き続けることに満足感を感じます。美意識も高め。',
    publicDescription:'「細かいことに気づくね」とよく言われるタイプ。ビジュアルセンスがあり、見た目の変化から本質を読み取る力があります。',
    tagline:'視診の達人、皮膚で語る診断力',
    desc:'皮膚・粘膜・爪・毛髪の疾患を診る診療科。視診中心の診断が特徴で、アレルギー・感染症・腫瘍・美容医療まで幅広く扱います。',
    weights:{hands_on:3,long_term:3,acute:1,research:3,technical:2,communication:3,visual:5,lifestyle:5,variety:2,precision:3},
    strengths:['視診による診断というユニークなスキルを磨ける','外来中心でワークライフバランスが取りやすい','美容医療など幅広い分野で活躍できる'],
    cautions:['慢性疾患が多く根治が難しいケースも多い','緊急対応が少ないため緊張感を求める人には物足りないかも']
  },
  {
    id:'ophthalmology', name:'眼科',
    emoji:'👁', color:'#0ea5e9', shortType:'精密職人型',
    title:'極限の精度を追い求める静かな職人', archetype:'静かな完璧主義者',
    relatableTraits:['「もう少しだけ」が延々と続く','雑な仕事を見ると気になって仕方ない','得意分野では誰にも負けたくない','安定した生活が幸福の土台'],
    oneLine:'一つのことを極める、繊細で完璧主義な職人気質のタイプ',
    friendComment:'友達からは「丁寧だね」「器用！」「仕事きっちりしてそう」と思われているかも。',
    suitableEnv:'精密な技術を存分に活かせる職場、安定したリズムで働ける環境',
    typeName:'眼科・職人タイプ', catchphrase:'精密さと技術を極める、真の職人気質',
    personality:'一つのことを徹底的に極めることが得意な職人気質。完璧主義で細部にこだわり、高精度の仕事に喜びを感じます。プライベートも大切にできる安定志向。',
    publicDescription:'「器用だね」「丁寧だね」と言われるタイプ。一つの専門を深掘りして極めることに喜びを感じ、細かい作業も苦になりません。',
    tagline:'精密な手技と視覚診断の融合',
    desc:'視覚器の疾患を専門に扱い、白内障手術から網膜疾患まで診ます。顕微鏡下の高精度手術と画像診断が特徴で、精密さへの高い要求があります。',
    weights:{hands_on:4,long_term:2,acute:1,research:2,technical:4,communication:2,visual:5,lifestyle:4,variety:1,precision:5},
    strengths:['顕微鏡手術という高度な技術を極められる','外来中心でライフスタイルが安定しやすい','OCTなど最新画像機器を使いこなす技術的魅力がある'],
    cautions:['専門領域が眼に限られるため他科との横断的経験は少ない','顕微鏡下手術に向く手先の器用さが求められる']
  },
  {
    id:'orthopedics', name:'整形外科',
    emoji:'🦴', color:'#22c55e', shortType:'アクティブ体育会型',
    title:'動く喜びを取り戻す体育会系の守護者', archetype:'活力の守護者',
    relatableTraits:['じっとしているのが苦手','スポーツの話題には目を輝かせる','チームが盛り上がると自然とリーダーになる','体力には自信あり（異論は認めない）'],
    oneLine:'体が資本！動くことに喜びを感じる、体育会系行動派タイプ',
    friendComment:'友達からは「元気！」「スポーツできそう」「体力お化けだ」と思われているかも。',
    suitableEnv:'体を動かすことに関われる現場、チームで活気ある環境',
    typeName:'整形外科・アクティブタイプ', catchphrase:'動くことへの喜びを取り戻す、体育会系医師',
    personality:'スポーツや身体を動かすことが好きで、人が元気に活動できることに価値を感じます。体力があり、ハードな仕事もこなせる。チームワークを大切にする。',
    publicDescription:'スポーツが好きで、体を動かすことに喜びを感じるタイプ。人が元気に動けるよう助けることに使命感を持ち、体力・行動力に自信があります。',
    tagline:'運動器を取り戻し、生活の質を高める',
    desc:'骨・関節・筋肉・神経など運動器疾患を扱う診療科。骨折から脊椎手術・スポーツ整形まで幅広く、術後リハビリとの連携が特徴です。',
    weights:{hands_on:5,long_term:2,acute:3,research:2,technical:4,communication:2,visual:3,lifestyle:2,variety:2,precision:4},
    strengths:['手術で生活の質を回復させる達成感がある','スポーツ整形・脊椎など多彩なサブスペシャリティがある','理学療法士などとのチーム連携が充実'],
    cautions:['体力的な負担が大きく長時間の手術がある','当直や外傷救急への対応も求められる']
  },
  {
    id:'radiology', name:'放射線科',
    emoji:'📡', color:'#6366f1', shortType:'論理分析型',
    title:'データの海から真実を引き上げる論理の探偵', archetype:'論理の探偵',
    relatableTraits:['データを見ると分析したくなる癖がある','一人で集中できる時間が何より大切','論理的に話す人と会話が弾む','効率化のアイデアが次々と出てくる'],
    oneLine:'データから真実を見つけ出す、頭脳明晰な論理の探偵タイプ',
    friendComment:'友達からは「分析好きだね」「頭の回転速い」「独自の視点が鋭い」と思われているかも。',
    suitableEnv:'集中して分析できる環境、最新技術に常に触れ続けられる職場',
    typeName:'放射線科・分析タイプ', catchphrase:'画像の謎を解く、論理の探偵',
    personality:'データと画像から真実を見つけ出す分析力の持ち主。集中力が高く、一人で深く考えることが得意な知的タイプ。落ち着いた環境で力を発揮します。',
    publicDescription:'「細かく観察するのが得意」「一人で集中できる」タイプ。データから答えを導き出すことが好きで、プライベートの時間もしっかり確保したい合理的な性格。',
    tagline:'画像で診断し、IVRで治療する探偵医師',
    desc:'X線・CT・MRI・核医学などの画像診断とIVR（血管内治療）を専門とします。読影という独特の仕事と最先端技術の活用が特徴です。',
    weights:{hands_on:2,long_term:1,acute:2,research:4,technical:5,communication:1,visual:5,lifestyle:5,variety:2,precision:5},
    strengths:['最新の医療技術・機器を常に活用できる','全科の画像を読むため幅広い疾患知識が身につく','当直負担が比較的少なくライフワークバランスが取りやすい'],
    cautions:['患者さんと直接対話する機会が少ない','AI診断の台頭により役割が変化しつつある']
  },
  {
    id:'anesthesiology', name:'麻酔科',
    emoji:'💉', color:'#64748b', shortType:'縁の下支援型',
    title:'縁の下で命を守る技術の番人', archetype:'影の守護者',
    relatableTraits:['目立たないところで頑張るのが好き','緊急時も表情に出さない','「いてくれると安心」とよく言われる','技術を磨くことに終わりはないと思っている'],
    oneLine:'影でチームを支える、確かな技術と揺るぎない冷静さのタイプ',
    friendComment:'友達からは「安定してる」「縁の下の力持ち」「信頼できる」と思われているかも。',
    suitableEnv:'技術を確実に活かせる現場、チームの安心感を担える環境',
    typeName:'麻酔科・縁の下タイプ', catchphrase:'見えないところで命を守る、技術の職人',
    personality:'目立つことより、確実に仕事をこなすことに誇りを持つ。技術的な精密さと冷静さを兼ね備えた、頼れるサポーター。緊急事態も落ち着いて対処できる。',
    publicDescription:'縁の下の力持ち的な存在感があり、「あなたがいてくれると安心」と言われるタイプ。細かい技術を磨くことが好きで、緊急時でも冷静でいられる安定感があります。',
    tagline:'命の安全を守る、手術室の司令塔',
    desc:'手術中の患者管理（麻酔・鎮痛・モニタリング）と集中治療を担います。高度な技術と生理学知識を組み合わせ患者さんを全身管理します。',
    weights:{hands_on:3,long_term:1,acute:5,research:2,technical:4,communication:2,visual:2,lifestyle:3,variety:2,precision:5},
    strengths:['気管挿管・神経ブロックなど習熟が明確な技術を習得できる','集中治療・ペインクリニックへの展開も可能','チームの縁の下の力持ちとしての充実感がある'],
    cautions:['患者さんとの直接的な関わりが限られる','緊急事態への即応が常に求められる緊張感がある']
  },
  {
    id:'ent', name:'耳鼻咽喉科',
    emoji:'👂', color:'#84cc16', shortType:'精密職人型',
    title:'感覚の世界を守る精密な職人', archetype:'精密なスペシャリスト',
    relatableTraits:['細かい作業が好きで集中できる','仕事もプライベートも充実させたい','見えにくい場所を細かく見るのが得意','職人気質で一つのことを極めたい'],
    oneLine:'精密さと生活の両立を追求する、職人気質のスペシャリストタイプ',
    friendComment:'友達からは「器用だね」「細かい作業が得意そう」「メリハリある生き方してる」と思われているかも。',
    suitableEnv:'高度な手技を磨けて、生活の質も守れる職場',
    typeName:'耳鼻咽喉科・職人タイプ', catchphrase:'感覚器の精密スペシャリスト',
    personality:'顕微鏡・内視鏡を駆使する精密な手技に喜びを感じ、専門を深めながら生活も充実させたい職人気質の持ち主。',
    publicDescription:'細かい作業を丁寧に極める職人タイプ。専門的なスキルを磨きながら、オンオフのメリハリも大切にできる人です。',
    tagline:'感覚器を守り、精密な手技で人々のQOLを守る',
    desc:'耳・鼻・咽頭・喉頭・頸部の疾患を扱います。顕微鏡・内視鏡を使った精密な処置が特徴で、頭頸部がんや聴覚・嚥下など高度な専門領域を担当します。',
    weights:{hands_on:4,long_term:2,acute:1,research:2,technical:4,communication:2,visual:4,lifestyle:5,variety:2,precision:5},
    strengths:['内視鏡・顕微鏡を使う精密な手技を習得できる','外来中心で比較的ワークライフバランスを保ちやすい','小児から高齢者まで幅広い年齢層を診る'],
    cautions:['専門領域が限定されるため全身疾患への対応は限られる','繊細な解剖部位のため高い技術が必要']
  },
  {
    id:'neurosurgery', name:'脳神経外科',
    emoji:'🧠', color:'#7c3aed', shortType:'究極挑戦型',
    title:'最高難度の壁に挑む不屈の挑戦者', archetype:'不屈の挑戦者',
    relatableTraits:['難しいほど闘志が湧いてくる','簡単に諦める人の気持ちがわからない','「絶対やり遂げる」が信念','睡眠より目標を優先してしまうことがある'],
    oneLine:'最難関に挑む、超集中力と不屈の意志を持つ究極の挑戦者タイプ',
    friendComment:'友達からは「根性すごい」「絶対諦めない」「尊敬する、ついていけない」と思われているかも。',
    suitableEnv:'最高難度の課題に挑める環境、妥協を許さない真剣な現場',
    typeName:'脳神経外科・究極集中タイプ', catchphrase:'人類最難の仕事に挑む、超集中力の持ち主',
    personality:'高い目標に向かって妥協しない、究極の集中力を持つ。困難であればあるほど燃える真のチャレンジャー。プレッシャーが大きいほど輝きます。',
    publicDescription:'「これと決めたら絶対やり遂げる」強い意志の持ち主。難しいことへの挑戦が好きで、周囲が諦める場面でも諦めない粘り強さがあります。',
    tagline:'脳と命に挑む、最高難度の外科',
    desc:'脳・脊髄・末梢神経の外科治療を担います。脳腫瘍・脳卒中・外傷など生命に直結する疾患に対し、高度な手技と判断力で立ち向かいます。',
    weights:{hands_on:5,long_term:2,acute:4,research:3,technical:3,communication:2,visual:3,lifestyle:1,variety:2,precision:5},
    strengths:['脳・神経という最も複雑な臓器への手術という高い専門性','生命に直結する救急手術でのダイナミックな経験','研究・最先端技術との連携が活発'],
    cautions:['勤務時間が非常に長くワークライフバランスは困難','一つの手術が生死・後遺症に直結するプレッシャーがある']
  },
  {
    id:'urology', name:'泌尿器科',
    emoji:'🚀', color:'#0891b2', shortType:'革新探求型',
    title:'最先端の波に乗るイノベーター', archetype:'革新のイノベーター',
    relatableTraits:['新しいものを試さないと気が済まない','「もっと良い方法がある」と常に考えている','技術のアップデートが楽しみで仕方ない','バランスも大事にできる現実主義者'],
    oneLine:'新しい技術に目がない、常に進化を求めるイノベータータイプ',
    friendComment:'友達からは「新しいもの好き」「向上心がある」「先進的」と思われているかも。',
    suitableEnv:'最新技術を活かせる職場、QOL改善に直接関われる環境',
    typeName:'泌尿器科・革新タイプ', catchphrase:'最新技術でQOLを変える革新者',
    personality:'新しい技術や方法論に常にアンテナを張り、取り入れることが好き。患者さんの生活の質を改善することに達成感を感じます。バランス感覚も良い。',
    publicDescription:'新しいものを積極的に取り入れるイノベーター気質。技術の進化に敏感で、「より良い方法はないか」と常に考えています。',
    tagline:'内視鏡とロボット手術で泌尿器を治す',
    desc:'腎臓・膀胱・前立腺・尿道などの疾患を扱います。ロボット支援手術など先進的な手技と、がん治療から排尿障害まで幅広い疾患が特徴です。',
    weights:{hands_on:4,long_term:3,acute:2,research:2,technical:4,communication:2,visual:2,lifestyle:3,variety:2,precision:4},
    strengths:['ロボット支援手術など最新技術を駆使できる','がん治療・機能温存・QOL改善を統合的に担える','比較的ワークライフバランスが取りやすい'],
    cautions:['デリケートな部位の疾患のため患者さんへの配慮が必要','腫瘍科としての知識も同時に求められる']
  },
  {
    id:'researcher', name:'研究医・基礎研究',
    emoji:'🔬', color:'#059669', shortType:'知識探求型',
    title:'真実を追い求める孤高の探究者', archetype:'孤高の探究者',
    relatableTraits:['「なぜ？」の答えが出るまで眠れない','データと向き合う時間が一番好き','論文を読むのが苦にならない','細かいことを見落とさない'],
    oneLine:'謎を解き明かすことに人生を捧げる、知的探究者タイプ',
    friendComment:'友達からは「難しそうなことをいつも考えてる」「専門バカ（尊敬の意）」と思われているかも。',
    suitableEnv:'研究に没頭できる環境、知的自由度の高い職場',
    typeName:'研究医・探究者タイプ', catchphrase:'謎を解き、医学を前進させる知の探究者',
    personality:'データと理論を武器に未解決の謎に挑む研究者気質の持ち主。一つのテーマを徹底的に深掘りし、医学の発展につながることに最大の意義を感じます。',
    publicDescription:'好奇心が止まらない探究者タイプ。一つのことを徹底的に調べ尽くさないと気が済まない性格で、データや論文を読み解くことに喜びを感じます。',
    tagline:'ベンチから臨床へ、医学の最前線を切り拓く',
    desc:'基礎研究・臨床研究・トランスレーショナルリサーチなど、医学の知識を生み出す側に立ちます。大学院・研究機関・製薬企業研究部門などが主なフィールドです。',
    weights:{hands_on:1,long_term:2,acute:1,research:5,technical:4,communication:2,visual:3,lifestyle:2,variety:2,precision:5},
    strengths:['医学の発展に直接貢献できる','世界初の発見や治療法開発に携われる可能性がある','大学・研究機関・企業など多様なキャリアパスがある'],
    cautions:['成果が出るまで時間がかかりやすく忍耐が必要','資金・ポストの競争が激しい','臨床スキルが低下しやすい']
  },
  {
    id:'government', name:'医系技官・公衆衛生',
    emoji:'🏛️', color:'#4f46e5', shortType:'社会設計型',
    title:'医療制度を動かす社会変革のアーキテクト', archetype:'社会のアーキテクト',
    relatableTraits:['「制度を変えたい」という気持ちがある','個人より社会全体のことを考えがち','幅広い分野に興味が持てる','人との折衝や調整が苦にならない'],
    oneLine:'医療制度・政策で社会を変えたい、ビッグピクチャー思考のタイプ',
    friendComment:'友達からは「スケールでかいな」「先見性がある」「調整上手」と思われているかも。',
    suitableEnv:'大きな裁量で政策や制度に関われる職場、多様なステークホルダーと協力できる環境',
    typeName:'医系技官・社会設計タイプ', catchphrase:'医療制度で社会を変える、社会のアーキテクト',
    personality:'個人の患者ではなく社会全体の健康を考えるビッグピクチャー思考の持ち主。制度・政策・法律という枠組みを通じて、より多くの人に貢献したいという志があります。',
    publicDescription:'「社会を変えたい」という志を持つ大きな視野の持ち主。幅広い分野に興味を持ち、人々を巻き込んで課題を解決するコーディネーター的な能力があります。',
    tagline:'医師の知識で、医療制度・社会を動かす',
    desc:'厚生労働省・都道府県・国際機関などで医療行政・政策立案・公衆衛生に携わります。個別患者ではなく集団・社会を対象に医師の知識を活かします。',
    weights:{hands_on:1,long_term:3,acute:1,research:4,technical:2,communication:5,visual:1,lifestyle:4,variety:4,precision:4},
    strengths:['医師の知識を政策・制度に活かして社会に大きなインパクトを与えられる','厚生労働省・WHO・PMDAなど多様なキャリアパスがある','ワークライフバランスが比較的取りやすい'],
    cautions:['臨床から離れると医師としてのスキルが低下しやすい','政策の成果が見えるまでに時間がかかる','専門性より汎用性が求められる場面が多い']
  },
  {
    id:'neurology', name:'神経内科',
    emoji:'💡', color:'#d97706', shortType:'謎解き探偵型',
    title:'神経の謎を解く知的探偵', archetype:'知的な探偵',
    relatableTraits:['謎解きや推理が大好き','「なぜ？」が止まらない','学べば学ぶほど面白くなる','人と長く深くつながることを大切にしている'],
    oneLine:'複雑なパズルほど燃える、論理と観察力で謎を解く探偵タイプ',
    friendComment:'友達からは「頭の中どうなってるの？」「謎解きうまそう」「独自の視点が鋭い」と思われているかも。',
    suitableEnv:'謎を解くような思考を活かせる職場、研究と臨床が両立できる環境',
    typeName:'神経内科・謎解きタイプ', catchphrase:'神経の謎を解く、論理の医師',
    personality:'複雑なパズルを解くような知的探求が大好き。細かい観察と論理的思考で謎を解き明かすことに喜びを感じます。研究者気質で、学ぶことが生きがい。',
    publicDescription:'「謎解き」や「推理」が好きなタイプ。細かい観察から本質を見抜く力があり、難しい問題ほど燃えます。人と長くつながる関係を大切にする知的な人です。',
    tagline:'神経の謎を解く、論理の医師',
    desc:'脳・脊髄・末梢神経・筋肉の内科的疾患（ALS・パーキンソン病・多発性硬化症など）を診ます。精緻な神経学的診察と論理的思考力が求められます。',
    weights:{hands_on:1,long_term:4,acute:3,research:5,technical:2,communication:4,visual:2,lifestyle:3,variety:2,precision:3},
    strengths:['緻密な神経学的診察という独自スキルを極められる','難病患者さんへの長期的な関わりで深い信頼関係を築ける','研究と臨床が密接に連携し学術的関心を活かせる'],
    cautions:['根治困難な疾患が多く長期的な精神的負荷がある','手技を中心にしたい人には向かない']
  },

  // ─── 医学生モード専用（studentOnly）診療科 ───────────────────────
  {
    id:'cardiology', name:'循環器内科', studentOnly:true,
    emoji:'❤️', color:'#dc2626', shortType:'緊急・技術型',
    title:'心臓の戦場に立つ、緊急と技術の守護者',
    tagline:'急性心筋梗塞からカテーテル治療まで、テクノロジーと緊急対応の最前線',
    desc:'心筋梗塞・不整脈・心不全・弁膜症など心臓・血管疾患を内科的に管理し、カテーテル治療（PCI・アブレーション）も行う診療科。救急から集中治療・カテーテル室まで守備範囲が広く、高い技術習得が求められます。',
    studentDescription:'循環器内科は、心筋梗塞・不整脈・心不全・弁膜症など心臓・血管疾患を内科的に管理し、カテーテル治療（PCI・カテーテルアブレーション）も行う診療科。大学病院では救急からカテーテル室・集中治療まで守備範囲が広く、高い技術習得が求められます。',
    idealProfile:'急性心筋梗塞や不整脈などの緊急対応に強い関心があり、カテーテルなど高度な技術を習得したい人。画像・数値の読解が得意で、プレッシャー下でも冷静に動けるタイプ。',
    whyFitExamples:['急性心筋梗塞のカテーテル治療で命を救う瞬間に達成感を感じたい','心電図・心エコー・冠動脈CTなど多様な検査技術を習得したい','内科の中でもアクティブに手技をやりたい'],
    compatibleSpecialties:['救急科','心臓血管外科'],
    relatableTraits:['緊急時にスイッチが入るタイプ','ECGを見ると心が躍る','機械・数値・画像を読むのが好き','瞬時の判断を迫られる場面が好き'],
    weights:{hands_on:4,long_term:3,acute:5,research:4,technical:5,communication:2,visual:4,lifestyle:2,variety:2,precision:4},
    strengths:['急性心筋梗塞のカテーテル治療（PCI）で命を救える','心エコー・電気生理学など高度な技術習得ができる','内科の中で最も急性期対応が多くやりがいが大きい'],
    cautions:['オンコール・夜間緊急対応が多くワークライフバランスは厳しい','技術習得のために長期的なトレーニングが必要']
  },
  {
    id:'gi_medicine', name:'消化器内科', studentOnly:true,
    emoji:'🔭', color:'#ca8a04', shortType:'内視鏡職人型',
    title:'消化管を制する、内視鏡の職人',
    tagline:'内視鏡で診断から治療まで、消化器疾患の守護者',
    desc:'食道・胃・腸・肝臓・胆道・膵臓の疾患を扱います。上部・下部内視鏡検査から治療（ポリペクトミー・ESD・ERCP）など内科の中でも手技色が強い専門分野です。がん・IBD・肝炎・脂肪肝など患者層も幅広いです。',
    studentDescription:'消化器内科は、食道・胃・腸・肝臓・胆道・膵臓の疾患を扱います。上部・下部内視鏡検査や治療（ポリペクトミー、ESD、ERCP）など、内科の中でも手技色が強い専門分野です。がん・炎症性腸疾患・肝炎・脂肪肝など患者層も幅広いです。',
    idealProfile:'内視鏡という「手を動かす内科」に惹かれ、肝臓・膵臓・IBDなど多彩な疾患に興味がある人。画像を読むのが好きで、処置の精密さに達成感を感じるタイプ。',
    whyFitExamples:['内視鏡操作で直接病変を確認・治療することに魅力を感じる','肝臓・膵臓などの複雑な疾患の病態を理解したい','外科のようにがっつり手技をやりながらも内科的思考を活かしたい'],
    compatibleSpecialties:['消化器外科','放射線科'],
    relatableTraits:['「内科なのに手を動かしたい」と思う','細い管を操る繊細さに魅力を感じる','肝臓・膵臓の複雑な疾患に知的興奮を感じる','内視鏡を見て「これ自分でやりたい」と思った'],
    weights:{hands_on:4,long_term:3,acute:3,research:3,technical:4,communication:3,visual:4,lifestyle:3,variety:3,precision:4},
    strengths:['内視鏡という明確な技術目標があり習熟度が可視化される','肝臓・胆道・膵臓・消化管と幅広い臓器を扱える','消化器がん治療から慢性疾患管理まで多様な経験が積める'],
    cautions:['内視鏡技術習得に数年かかる','急性期（消化管出血・急性膵炎）のオンコール対応がある']
  },
  {
    id:'pulmonology', name:'呼吸器内科', studentOnly:true,
    emoji:'🫁', color:'#0ea5e9', shortType:'論理・慢性期型',
    title:'呼吸の謎を解く、画像と論理の内科医',
    tagline:'肺がん・COPD・間質性肺疾患をエビデンスと画像で診る内科医',
    desc:'肺がん・COPD・喘息・間質性肺疾患・肺炎・睡眠時無呼吸など呼吸器疾患全般を担当します。胸部CTの読影・気管支鏡・肺機能検査など画像・技術の比重が高く、感染症・腫瘍・免疫と幅広い内科知識が求められます。',
    studentDescription:'呼吸器内科は、肺がん・COPD・喘息・間質性肺疾患・肺炎・睡眠時無呼吸など呼吸器疾患全般を担当します。胸部CTの読影・気管支鏡・肺機能検査など画像・技術の比重が高く、感染症・腫瘍・免疫と幅広い内科知識が求められます。',
    idealProfile:'肺がん・COPD・間質性肺疾患など複雑な慢性疾患の管理に興味があり、胸部CT・気管支鏡・肺機能検査など多彩な検査技術を習得したい人。',
    whyFitExamples:['胸部CTを読んで診断を組み立てるプロセスが面白い','COPDや間質性肺疾患など慢性疾患の長期管理に携わりたい','気管支鏡など手技もありつつ、内科的思考も活かしたい'],
    compatibleSpecialties:['呼吸器外科','放射線科'],
    relatableTraits:['胸部X線やCTを見ると集中できる','「なぜ息が苦しいのか」を系統的に考えるのが好き','慢性疾患を長く支えることに意義を感じる','エビデンスに基づいた治療方針を立てることが好き'],
    weights:{hands_on:3,long_term:4,acute:3,research:4,technical:3,communication:3,visual:4,lifestyle:3,variety:3,precision:3},
    strengths:['胸部CT読影という独自スキルを深く磨ける','がん・感染症・免疫疾患と幅広い内科知識が身につく','気管支鏡・胸腔穿刺など手技もある程度経験できる'],
    cautions:['肺がん・間質性肺疾患など根治困難な疾患が多い','急性呼吸不全・重症肺炎の夜間対応が発生する']
  },
  {
    id:'nephrology', name:'腎臓内科', studentOnly:true,
    emoji:'🫘', color:'#7c3aed', shortType:'長期・精密型',
    title:'電解質の番人、患者と歩む精密な内科医',
    tagline:'慢性腎臓病・透析患者と生涯向き合う、精密な内科専門医',
    desc:'慢性腎臓病・糸球体腎炎・ネフローゼ症候群・急性腎障害・透析療法などを担当します。腎生検の判読・電解質管理・透析処方など精密な医学知識が求められ、患者との長期的な関わりが大きな特徴です。',
    studentDescription:'腎臓内科は慢性腎臓病・糸球体腎炎・ネフローゼ症候群・急性腎障害・透析療法などを担当します。腎生検の判読・電解質管理・透析処方など精密な医学知識が求められ、患者との長期的な関わりが大きな特徴です。',
    idealProfile:'慢性腎臓病・透析患者との長期的な関係を大切にし、電解質バランスや腎疾患の複雑な病態生理を深く理解したい人。精密な数値管理に達成感を感じるタイプ。',
    whyFitExamples:['透析患者と長年向き合い、生活の質を支えることに意義を感じる','電解質・酸塩基平衡などの複雑な病態生理を理解したい','腎生検の組織所見から診断を組み立てる知的プロセスが楽しい'],
    compatibleSpecialties:['糖尿病・内分泌内科','循環器内科'],
    relatableTraits:['数字やデータを見て本質を追うのが好き','長く付き合う患者関係に誇りを感じたい','複雑な病態を体系的に整理することが得意','電解質の異常を見ると「なぜ？」と追いかけてしまう'],
    weights:{hands_on:2,long_term:5,acute:2,research:4,technical:3,communication:4,visual:2,lifestyle:3,variety:2,precision:4},
    strengths:['透析患者との深く長い関係構築ができる','電解質・酸塩基など内科の基盤知識を極める','腎生検や透析管理など独自の専門スキルが身につく'],
    cautions:['透析患者のQOLが限られる場面もあり精神的な重さがある','専門領域が腎・電解質に集中するため汎用性は限られる']
  },
  {
    id:'endocrinology', name:'糖尿病・内分泌内科', studentOnly:true,
    emoji:'⚖️', color:'#f59e0b', shortType:'長期・教育型',
    title:'生活を変え、ホルモンを整える教育型内科医',
    tagline:'患者教育と長期管理で生活習慣ごと支える内科専門医',
    desc:'糖尿病・甲状腺疾患・副腎疾患・下垂体疾患・骨粗鬆症などを扱います。患者教育・生活習慣指導の比重が高く、内科の中でも「患者との対話」が診療の核心となる科です。',
    studentDescription:'糖尿病・内分泌内科は、糖尿病・甲状腺疾患・副腎疾患・下垂体疾患・骨粗鬆症などを扱います。患者教育・生活習慣指導の比重が高く、内科の中でも「患者との対話」が診療の核心となる科です。',
    idealProfile:'患者の生活習慣に深く関わり、長期的に糖尿病・甲状腺・副腎などの疾患を管理したい人。コミュニケーションと患者教育に強みがあり、ホルモンの複雑な調節機序に知的興味を持てる人。',
    whyFitExamples:['糖尿病患者の生活習慣改善を長期的に支援したい','ホルモンの複雑な調節機序（負のフィードバック）を理解することが面白い','多職種チーム（栄養士・薬剤師）と連携した医療に携わりたい'],
    compatibleSpecialties:['腎臓内科','循環器内科','小児科'],
    relatableTraits:['生活習慣の改善アドバイスが好き','患者の長期的な変化を見届けたい','「仕組みってどうなってるの？」とホルモン調節を追いかけてしまう','外来でゆっくり患者と話すことに喜びを感じる'],
    weights:{hands_on:2,long_term:5,acute:2,research:3,technical:2,communication:5,visual:2,lifestyle:4,variety:3,precision:3},
    strengths:['外来中心でワークライフバランスが比較的保ちやすい','患者の生活を変えるインパクトを長期的に実感できる','ホルモン疾患の複雑な病態生理を深く理解できる'],
    cautions:['糖尿病管理は患者の生活習慣に依存するため成果が見えにくい場合がある','急性期の手技志向には物足りない場合がある']
  },
  {
    id:'hematology', name:'血液内科', studentOnly:true,
    emoji:'🩸', color:'#b91c1c', shortType:'研究・最前線型',
    title:'血液の最前線を守る、研究と臨床の融合者',
    tagline:'白血病・リンパ腫など血液がんの最先端治療に挑む内科医',
    desc:'白血病・悪性リンパ腫・多発性骨髄腫・骨髄異形成症候群・血友病など血液疾患全般を担当します。骨髄移植・CAR-T細胞療法など最先端治療が多く、基礎研究との連携が非常に密接な科です。',
    studentDescription:'血液内科は、白血病・悪性リンパ腫・多発性骨髄腫・骨髄異形成症候群・血友病など血液疾患全般を担当します。骨髄移植・CAR-T細胞療法など最先端治療が多く、基礎研究との連携が非常に密接な科です。',
    idealProfile:'白血病・リンパ腫などの血液がんに強い関心があり、CAR-T細胞療法・移植など最先端治療の現場に携わりたい人。研究志向が高く、複雑な免疫・凝固の病態を追うのが好きなタイプ。',
    whyFitExamples:['骨髄移植・CAR-T療法など最先端がん治療の最前線に立ちたい','血液疾患の複雑な病態（凝固・免疫・造血）を深く理解したい','臨床研究・基礎研究と密接に連携した診療に興味がある'],
    compatibleSpecialties:['研究医・基礎研究','膠原病・リウマチ内科'],
    relatableTraits:['血球を見ると原因を追いかけてしまう','最先端医療の話題に自然とアンテナが立つ','基礎研究と臨床の橋渡しに興奮を感じる','患者に正直に向き合い精一杯一緒に戦いたい'],
    weights:{hands_on:2,long_term:3,acute:3,research:5,technical:3,communication:4,visual:3,lifestyle:2,variety:2,precision:4},
    strengths:['造血幹細胞移植・CAR-T療法など世界最先端の治療を担当できる','臨床試験・基礎研究との連携が密で研究志向を活かせる','治癒が見込める疾患も多く治療の達成感がある'],
    cautions:['病状が急変しやすく精神的・体力的な負担が大きい','骨髄移植患者の長期管理は感染管理など高い集中力が求められる']
  },
  {
    id:'rheumatology', name:'膠原病・リウマチ内科', studentOnly:true,
    emoji:'🔮', color:'#8b5cf6', shortType:'長期・免疫探求型',
    title:'免疫の謎を解く、自己免疫疾患の専門医',
    tagline:'RAやSLEなど自己免疫疾患の複雑な謎に挑み、患者と長く向き合う',
    desc:'関節リウマチ・全身性エリテマトーデス（SLE）・多発性筋炎・血管炎などの自己免疫疾患を担当します。生物学的製剤・JAK阻害薬など新薬の進歩が著しく、免疫学の知識が直接診療に活きる科です。',
    studentDescription:'膠原病・リウマチ内科は、関節リウマチ・全身性エリテマトーデス（SLE）・多発性筋炎・血管炎などの自己免疫疾患を担当します。生物学的製剤・JAK阻害薬など新薬の進歩が著しく、免疫学の知識が直接診療に活きる科です。',
    idealProfile:'SLUやRAなどの自己免疫疾患の複雑な病態に知的興味があり、患者と長期的な関係を築きたい人。免疫学・生物学的製剤に強い関心があり、コミュニケーション力の高い人が向いている。',
    whyFitExamples:['SLEの多彩な臓器症状（関節・腎・皮膚・脳）を系統的に理解したい','RAの生物学的製剤の選択・効果評価など最新の治療戦略を学びたい','慢性疾患の患者と長くつながり生活の質を支えたい'],
    compatibleSpecialties:['血液内科','腎臓内科','皮膚科'],
    relatableTraits:['免疫の話になると止まらなくなる','患者の「全身」を丸ごと診たい','長く続く関係に誇りを感じる','生物学的製剤の仕組みに興奮する'],
    weights:{hands_on:2,long_term:5,acute:2,research:4,technical:2,communication:4,visual:3,lifestyle:4,variety:2,precision:3},
    strengths:['免疫学の最先端知識を直接臨床に活かせる','外来中心でワークライフバランスが保ちやすい','患者と長期的な信頼関係を構築できる'],
    cautions:['疾患活動性の評価が難しく治療効果が見えにくい面がある','専門特化した科のため汎用性は限られる']
  },
  {
    id:'gi_surgery', name:'消化器外科', studentOnly:true,
    emoji:'⚔️', color:'#ef4444', shortType:'手技・高難度型',
    title:'消化器がんに挑む、高難度手術の外科医',
    tagline:'胃・腸・肝臓・膵臓など消化器がんを手術で治す外科医',
    desc:'胃がん・大腸がん・肝細胞がん・膵がん・食道がんなど消化器がんの手術を中心に担当します。腹腔鏡・ロボット支援手術の比率が高まり、技術革新が著しい分野です。周術期管理や化学療法との連携も重要です。',
    studentDescription:'消化器外科は、胃がん・大腸がん・肝細胞がん・膵がん・食道がんなど消化器がんの手術を中心に担当します。腹腔鏡・ロボット支援手術の比率が高まり、技術革新が著しい分野です。周術期管理や化学療法との連携も重要です。',
    idealProfile:'手術で患者を治したい強い意志を持ち、腹腔鏡・ロボット手術など最新技術を習得したい人。消化器外科は手術難度・チームワーク・体力の全てが問われる。',
    whyFitExamples:['膵頭十二指腸切除など高難度手術を習得したい','消化器がんの外科的根治治療で患者に直接貢献したい','腹腔鏡・ロボット手術など最新の技術を習得したい'],
    compatibleSpecialties:['消化器内科','呼吸器外科'],
    relatableTraits:['長時間の手術も苦にならない体力と集中力がある','腹腔鏡の細かい操作に達成感を感じる','チームリーダーとして手術室をまとめたい','がんに外科的に挑む使命感がある'],
    weights:{hands_on:5,long_term:2,acute:3,research:3,technical:4,communication:2,visual:3,lifestyle:1,variety:3,precision:4},
    strengths:['腹腔鏡・ロボットなど先進外科技術を習得できる','消化器がん治療のチームの中核を担える','多様な臓器（胃・腸・肝・膵）を扱い幅広い外科経験が積める'],
    cautions:['拘束時間が長くワークライフバランスは厳しい','消化器がんの予後が厳しく精神的負担もある']
  },
  {
    id:'cardiac_surgery', name:'心臓血管外科', studentOnly:true,
    emoji:'💓', color:'#be123c', shortType:'最高難度型',
    title:'人体最難の戦場に立つ、心臓外科の頂点',
    tagline:'CABG・弁置換・大動脈手術など、命の中心に触れる最高峰の外科',
    desc:'冠動脈バイパス手術・弁形成/置換術・大動脈手術・先天性心疾患手術を担当します。人工心肺を使った心臓手術はリスクが高く技術的難度も極めて高いですが、患者に与えるインパクトは最大です。',
    studentDescription:'心臓血管外科は、冠動脈バイパス手術・弁形成/置換術・大動脈手術・先天性心疾患手術を担当します。人工心肺を使った心臓手術はリスクが高く技術的難度も極めて高いですが、患者に与えるインパクトは最大です。',
    idealProfile:'手術による達成感を最大限に求め、体力・精神力・技術力の全てを極限まで高めたい人。心臓血管外科はこれを実現できる最高峰の外科の一つだが、生活の犠牲も最大級。',
    whyFitExamples:['心臓に直接触れて命を救う、最高峰の外科を目指している','大動脈解離など超緊急手術で活躍したい','技術と体力と精神力を最大限に使いたい'],
    compatibleSpecialties:['循環器内科','麻酔科'],
    relatableTraits:['「心臓を触る」という響きに特別な使命感を感じる','限界に挑戦することに喜びを感じる','体力・精神力には絶対的な自信がある','修羅場ほど集中できる'],
    weights:{hands_on:5,long_term:2,acute:4,research:3,technical:5,communication:2,visual:4,lifestyle:1,variety:1,precision:5},
    strengths:['心臓手術という最高峰の外科技術を習得できる','命に直接関わる使命感と達成感が際立つ','人工心肺・補助循環など最先端技術を駆使できる'],
    cautions:['勤務時間・拘束時間が外科系で最も長い分野の一つ','一つのミスが生死に直結するプレッシャーが常にある']
  },
  {
    id:'thoracic_surgery', name:'呼吸器外科', studentOnly:true,
    emoji:'🫁', color:'#0369a1', shortType:'手技・精密型',
    title:'胸腔鏡で肺を守る、低侵襲外科の職人',
    tagline:'肺がん・縦隔腫瘍を胸腔鏡（VATS）で切除する精密外科医',
    desc:'肺がん・気胸・縦隔腫瘍・胸膜疾患などを担当します。VATS（胸腔鏡手術）・ロボット支援手術が標準化しており、低侵襲外科技術の習得がキャリアの中心です。呼吸器内科・放射線科との連携が密です。',
    studentDescription:'呼吸器外科は、肺がん・気胸・縦隔腫瘍・胸膜疾患などを担当します。VATS（胸腔鏡手術）・ロボット支援手術が標準化しており、低侵襲外科技術の習得がキャリアの中心です。呼吸器内科・放射線科との連携が密です。',
    idealProfile:'肺がんや気胸・縦隔腫瘍の外科的治療に興味があり、胸腔鏡（VATS）・ロボット手術など低侵襲外科を習得したい人。精密さへのこだわりと呼吸器疾患への関心を兼ね備えているタイプ。',
    whyFitExamples:['胸腔鏡による低侵襲肺切除手術を習得したい','肺がん手術という直接的な治療介入で患者に貢献したい','低侵襲外科で技術を磨きながら呼吸器疾患全般を理解したい'],
    compatibleSpecialties:['呼吸器内科','放射線科'],
    relatableTraits:['精密な作業ほど集中できる','胸部CTを見て「ここを切りたい」と思う','低侵襲手術の精密さに職人魂を感じる','肺がんと外科的に闘いたい'],
    weights:{hands_on:4,long_term:2,acute:3,research:3,technical:4,communication:2,visual:3,lifestyle:2,variety:2,precision:4},
    strengths:['VATS・ロボット手術など低侵襲外科技術の最先端を学べる','肺がん外科という明確な専門目標を持てる','消化器外科より術後管理が比較的シンプル'],
    cautions:['専門領域が胸部に限定されるため他科との横断的経験は少ない','手術件数が消化器外科より少ない施設もある']
  },
  {
    id:'plastics', name:'形成外科', studentOnly:true,
    emoji:'✂️', color:'#db2777', shortType:'美と再建の職人型',
    title:'形を整え、人生を変える精密再建の外科医',
    tagline:'先天異常・熱傷・がん術後の再建からマイクロサージャリーまで',
    desc:'先天性奇形・熱傷・外傷・がん切除後の再建・顔面骨骨折・美容外科を担当します。マイクロサージャリー（顕微鏡下手術）・皮弁術など高度な技術が必要で、患者の外見と機能の両方を回復させることが目標です。',
    studentDescription:'形成外科は、先天性奇形・熱傷・外傷・がん切除後の再建・顔面骨骨折・美容外科を担当します。マイクロサージャリー（顕微鏡下手術）・皮弁術など高度な技術が必要で、患者の外見と機能の両方を回復させることが目標です。',
    idealProfile:'手術による外見的・機能的な回復に強い関心があり、美的センスと高い精密性を持つ人。熱傷・先天異常・がん切除後の再建から美容まで、幅広い手術技術を習得したい外科系志望者。',
    whyFitExamples:['手術で患者の外見と機能を回復させ、人生を変えたい','乳房再建・顔面再建など繊細なマイクロサージャリーを習得したい','審美的センスと外科技術の両方を活かしたい'],
    compatibleSpecialties:['皮膚科','耳鼻咽喉科'],
    relatableTraits:['「美しい」手術跡に芸術的な達成感を感じる','顕微鏡下の精密作業に集中できる','ミリ単位のデザインにこだわる完璧主義','がん術後の患者の表情が変わる瞬間に喜びを感じる'],
    weights:{hands_on:5,long_term:2,acute:2,research:2,technical:3,communication:3,visual:5,lifestyle:4,variety:3,precision:5},
    strengths:['マイクロサージャリーなど超高度の精密技術を習得できる','再建・外傷・先天異常・美容と幅広い患者層を扱える','美容医療の需要増で将来のキャリアオプションが広い'],
    cautions:['審美的な評価は主観的で患者満足度の管理が難しい','美容外科では患者の要求水準が高くトラブルリスクもある']
  }
];

// ══════════════════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════════════════

var QUESTIONS        = FALLBACK_QUESTIONS;
var SPECIALTIES      = FALLBACK_SPECIALTIES;
var mode             = 'student'; // 'student' | 'public'
var currentIndex     = 0;
var answers          = {};        // { qid: 1-5 }
var currentShareText = '';        // for copy button
var currentRanked    = [];        // full ranked list for all-specialties view
var _answerTimer     = null;      // debounce: cancel pending navigation on back/home

// ══════════════════════════════════════════════════════════════════
//  DATA LOADING  (fetch → fallback)
// ══════════════════════════════════════════════════════════════════

function loadData(callback) {
  Promise.all([
    fetch('data/questions.json').then(function(r) { if (!r.ok) throw new Error(); return r.json(); }),
    fetch('data/specialties.json').then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
  ]).then(function(results) {
    QUESTIONS   = results[0];
    SPECIALTIES = results[1];
    callback();
  }).catch(function() {
    callback();
  });
}

// ══════════════════════════════════════════════════════════════════
//  SCREEN HELPERS
// ══════════════════════════════════════════════════════════════════

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  var el = document.getElementById('screen-' + id);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════════════════════════════
//  MODE SELECTION
// ══════════════════════════════════════════════════════════════════

function selectMode(m) {
  mode = m;
  document.querySelectorAll('.scale-btn').forEach(function(b) {
    b.classList.remove('selected', 'flash');
    b.disabled = false;
  });
  startQuiz();
}
function goTop()        { showScreen('welcome'); }

// ══════════════════════════════════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════════════════════════════════

// Progress phase messages — one per 3-question dimension block
var PHASE_MSGS_PUBLIC = [
  '🔍 実践力を診断中…',
  '🔍 つながり方を分析中…',
  '🔍 瞬発力をスキャン中…',
  '🔍 知的好奇心を測定中…',
  '🔍 テクノロジー適性を解析中…',
  '🔍 共感力を診断中…',
  '🔍 観察眼をスキャン中…',
  '🔍 ライフスタイルを分析中…',
  '🔍 変化への適応力を解析中…',
  '✨ あと少しで結果です！'
];

var PHASE_MSGS_STUDENT = [
  '🔬 手技・手術適性を解析中…',
  '🔬 長期関与への志向を測定中…',
  '🔬 急性期対応力を診断中…',
  '🔬 研究・学術適性をスキャン中…',
  '🔬 医療技術適性を解析中…',
  '🔬 コミュニケーション力を測定中…',
  '🔬 視覚的診断力を診断中…',
  '🔬 ライフスタイル志向を分析中…',
  '🔬 多様性への志向を解析中…',
  '✨ あなたの診療科適性を収束中… あと少し！'
];

function startQuiz() {
  currentIndex = 0;
  answers = {};
  showScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  var q        = QUESTIONS[currentIndex];
  var total    = QUESTIONS.length;
  var isPublic = (mode === 'public');

  // Progress bar & counter
  var pct = Math.round((currentIndex / total) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('q-counter').textContent = (currentIndex + 1) + ' / ' + total;

  // Phase message (one per 3-question block)
  var phaseEl = document.getElementById('q-phase-msg');
  if (phaseEl) {
    var msgs   = isPublic ? PHASE_MSGS_PUBLIC : PHASE_MSGS_STUDENT;
    var msgIdx = Math.min(Math.floor(currentIndex / 3), msgs.length - 1);
    phaseEl.textContent = msgs[msgIdx];
  }

  // Dim label — hidden in production; set window.DEBUG_QUIZ = true in console to reveal
  var dimLabelEl = document.getElementById('q-dim-label');
  if (dimLabelEl) {
    dimLabelEl.textContent = window.DEBUG_QUIZ
      ? (isPublic && q.dimLabelPublic ? q.dimLabelPublic : q.dimLabel)
      : '';
    dimLabelEl.setAttribute('data-dim', q.dim); // always available for DevTools inspection
  }

  // Question text
  document.getElementById('q-text').textContent =
    isPublic && q.textPublic ? q.textPublic : q.text;

  // Back button visibility
  var prevBtn = document.getElementById('btn-prev');
  if (currentIndex === 0) prevBtn.classList.add('invisible');
  else                    prevBtn.classList.remove('invisible');

  // Scale buttons — highlight stored answer
  var storedAnswer = answers[q.id];
  document.querySelectorAll('.scale-btn').forEach(function(btn) {
    btn.disabled = false;
    btn.classList.remove('flash', 'selected');
    if (storedAnswer === parseInt(btn.getAttribute('data-val'), 10)) {
      btn.classList.add('selected');
    }
  });

  // Hint text
  var hintEl = document.getElementById('scale-hint-prev');
  hintEl.textContent = storedAnswer != null
    ? '前回の回答：' + storedAnswer + '　変更する場合は別の数字を選んでください'
    : '';
}

function answer(value) {
  var q = QUESTIONS[currentIndex];
  answers[q.id] = value;

  var btns = document.querySelectorAll('.scale-btn');
  btns.forEach(function(b) { b.disabled = true; });
  btns.forEach(function(b) {
    if (parseInt(b.getAttribute('data-val'), 10) === parseInt(value, 10)) {
      b.classList.add('flash');
    }
  });

  if (_answerTimer) clearTimeout(_answerTimer);
  _answerTimer = setTimeout(function() {
    _answerTimer = null;
    if (currentIndex < QUESTIONS.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      document.getElementById('progress-fill').style.width = '100%';
      renderResults();
      showScreen('results');
    }
  }, 200);
}

function prevQuestion() {
  if (_answerTimer) { clearTimeout(_answerTimer); _answerTimer = null; }
  if (currentIndex > 0) { currentIndex--; renderQuestion(); }
}

function goHomeFromQuiz() {
  var hasAnswers = Object.keys(answers).length > 0;
  if (hasAnswers) {
    if (!confirm('回答途中です。ホームに戻ると現在の回答は破棄されます。よろしいですか？')) return;
  }
  if (_answerTimer) { clearTimeout(_answerTimer); _answerTimer = null; }
  answers = {};
  currentIndex = 0;
  goTop();
}

// ══════════════════════════════════════════════════════════════════
//  SCORING  — delegates to scoring.js (pure functions, DOM-free)
// ══════════════════════════════════════════════════════════════════

/**
 * Run the full scoring pipeline and return ranked specialty matches.
 * Pure computation; no DOM access.
 * @returns {Array} [{ sp, pct, dimScore, dist }] sorted best-first
 */
function getSpecialtiesForMode(m) {
  return SPECIALTIES.filter(function(sp) {
    if (m === 'student') return !sp.publicOnly;
    if (m === 'public')  return !sp.studentOnly;
    return true;
  });
}

function calcScores() {
  var normAnswers = Scoring.normalizeAnswers(answers, QUESTIONS);
  var dimScores   = Scoring.calculateDimensionScores(normAnswers, QUESTIONS);
  return Scoring.calculateSpecialtyMatches(dimScores, getSpecialtiesForMode(mode));
}

// ══════════════════════════════════════════════════════════════════
//  DIMENSION LABELS
// ══════════════════════════════════════════════════════════════════

var DIMS = ['hands_on','long_term','acute','research','technical','communication','visual','lifestyle','variety','precision'];

var DIM_LABEL_MAP = {
  hands_on:'手技・手術への適性', long_term:'長期的な患者との関わり',
  acute:'急性期・緊急対応力', research:'研究・学術的思考',
  technical:'医療技術・機器への関心', communication:'患者コミュニケーション力',
  visual:'視覚的診断センス', lifestyle:'ライフワークバランス重視',
  variety:'多様な経験への志向', precision:'精密さ・正確性'
};
var DIM_LABEL_MAP_PUBLIC = {
  hands_on:'実践力・手先の器用さ', long_term:'長くつながる関係への重視',
  acute:'瞬発力・アドレナリン感覚', research:'知的好奇心の高さ',
  technical:'テクノロジーへの親しみ', communication:'共感・聴き上手な性格',
  visual:'鋭い観察眼', lifestyle:'プライベート重視の姿勢',
  variety:'変化・多様性への適応力', precision:'几帳面・完璧主義傾向'
};

function matchReasons(sp, dimScore) {
  var labelMap = (mode === 'public') ? DIM_LABEL_MAP_PUBLIC : DIM_LABEL_MAP;
  var ranked = Object.keys(sp.weights).map(function(d) {
    return { d: d, combined: (dimScore[d] || 0.5) * sp.weights[d], userScore: dimScore[d] || 0 };
  });
  ranked.sort(function(a, b) { return b.combined - a.combined; });
  return ranked.slice(0, 3)
    .filter(function(x) { return x.userScore >= 0.45; })
    .map(function(x) { return labelMap[x.d] || x.d; });
}

// ── Student-mode: sentence-style match reasons ────────────────────

var STUDENT_REASON_SENTENCES = {
  hands_on:      '手技や処置で直接治せる達成感を強く求めている',
  long_term:     '患者と長年向き合うことに深いやりがいを感じる',
  acute:         '緊急・急変場面でも冷静に判断・行動できる',
  research:      '疾患の病態や最新エビデンスへの探究心が強い',
  technical:     '医療機器・技術の習得と活用を積極的に楽しめる',
  communication: '患者・家族との丁寧な対話を診療の核に置きたい',
  visual:        '画像・視覚所見から診断を組み立てるセンスがある',
  lifestyle:     '長く続けられる働き方でキャリアを安定させたい',
  variety:       '多様な疾患・年齢層を横断的に経験したい志向がある',
  precision:     '細部まで徹底確認する高い正確性へのこだわりがある'
};

/**
 * Return up to 3 sentence-style reasons WHY a specialty matches the user,
 * for use in student-mode result cards.
 * Selects dimensions where BOTH the user scored high AND the specialty values them.
 */
function buildStudentWhyReasons(sp, dimScore) {
  var candidates = Object.keys(sp.weights).map(function (d) {
    var userScore = dimScore[d] != null ? dimScore[d] : 0.5;
    var spNorm    = (sp.weights[d] - 1) / 4; // weight 1→0, 5→1
    return { d: d, alignment: userScore * spNorm, userScore: userScore, spWeight: sp.weights[d] };
  });
  candidates.sort(function (a, b) { return b.alignment - a.alignment; });
  return candidates
    .filter(function (c) { return c.userScore >= 0.5 && c.spWeight >= 3; })
    .slice(0, 3)
    .map(function (c) { return STUDENT_REASON_SENTENCES[c.d] || c.d; });
}

/**
 * Build "なぜこの科？" HTML block for student hero card (always visible).
 */
function buildWhySectionHtml(sp, dimScore) {
  var reasons = buildStudentWhyReasons(sp, dimScore);
  if (!reasons.length) return '';
  var items = reasons.map(function (r) {
    return '<li class="why-item">' + esc(r) + '</li>';
  }).join('');
  return (
    '<div class="hero-why">' +
      '<div class="hero-why-title">💡 なぜ' + esc(sp.name) + 'が合うの？</div>' +
      '<ul class="why-list">' + items + '</ul>' +
    '</div>'
  );
}

// ── Student-mode: top-3 dimension trends ─────────────────────────

var TOP_TREND_LABELS = {
  hands_on:      '手技・手術への適性',
  long_term:     '継続的な患者関与',
  acute:         '急性期・緊急対応力',
  research:      '研究・学術的思考',
  technical:     '医療技術への親和性',
  communication: 'コミュニケーション力',
  visual:        '視覚的診断センス',
  lifestyle:     'ワークライフ重視',
  variety:       '多様な経験志向',
  precision:     '精密さ・正確性'
};

/**
 * Build "あなたの強い傾向 トップ3" bar-chart HTML block.
 * Rendered above the hero card in student mode.
 */
function buildTopTrendsHtml(dimScores) {
  var sorted = Object.keys(dimScores).map(function (d) {
    return { dim: d, score: dimScores[d] };
  }).sort(function (a, b) { return b.score - a.score; }).slice(0, 3);

  var items = sorted.map(function (item) {
    var pct   = Math.round(item.score * 100);
    var label = TOP_TREND_LABELS[item.dim] || item.dim;
    return (
      '<li class="trend-item">' +
        '<span class="trend-label">' + esc(label) + '</span>' +
        '<div class="trend-bar-wrap">' +
          '<div class="trend-bar" data-pct="' + pct + '" style="width:0"></div>' +
        '</div>' +
        '<span class="trend-pct">' + pct + '%</span>' +
      '</li>'
    );
  }).join('');

  return (
    '<div class="top-trends">' +
      '<div class="top-trends-title">📊 あなたの強い傾向 トップ3</div>' +
      '<ul class="trend-list">' + items + '</ul>' +
    '</div>'
  );
}

// ══════════════════════════════════════════════════════════════════
//  RESULTS RENDERING
// ══════════════════════════════════════════════════════════════════

function renderResults() {
  var ranked   = calcScores();
  var top5     = ranked.slice(0, 5);
  var best     = top5[0];
  var isPublic = (mode === 'public');

  // ── Result-quality notices (variance + tie) ─────────────────────
  var summary = isPublic
    ? Scoring.buildResultSummaryForPublic(ranked, answers)
    : Scoring.buildResultSummaryForStudent(ranked, answers);
  var noticesEl = document.getElementById('results-notices');
  if (noticesEl) noticesEl.innerHTML = buildNoticesHtml(summary);

  // ── Banner ──────────────────────────────────────────────────────
  var bannerEl    = document.getElementById('results-banner');
  var displayName = isPublic && best.sp.typeName ? best.sp.typeName : best.sp.name;
  var catchLine   = isPublic && best.sp.catchphrase ? best.sp.catchphrase : best.sp.tagline;
  var bannerStyle = isPublic && best.sp.color
    ? ' style="background: linear-gradient(135deg, ' + best.sp.color + ', ' + best.sp.color + 'bb)"'
    : '';

  bannerEl.innerHTML =
    '<div class="results-banner mode-' + mode + '"' + bannerStyle + '>' +
      (isPublic && best.sp.emoji ? '<div class="banner-emoji-wrap">' + best.sp.emoji + '</div>' : '') +
      '<div class="banner-label">診断結果</div>' +
      '<div class="banner-type">あなたは<span>' + esc(displayName) + '</span>！</div>' +
      '<div class="banner-catch">' + esc(catchLine) + '</div>' +
    '</div>';

  // ── 3秒サマリー（詳細セクションを閉じた状態にリセット） ────────
  var detailEl = document.getElementById('results-detail');
  if (detailEl) detailEl.classList.remove('open');
  var summaryEl = document.getElementById('results-summary');
  if (summaryEl) summaryEl.innerHTML = buildSummaryCard(best, isPublic);

  // ── Hero Card (Rank 1) ──────────────────────────────────────────
  document.getElementById('results-hero').innerHTML = buildHeroCard(top5[0], 1, isPublic);

  // ── Compact Cards (Rank 2-5) ────────────────────────────────────
  var html = '<div class="compact-cards">';
  top5.slice(1).forEach(function(item, i) { html += buildCompactCard(item, i + 2, isPublic); });
  html += '</div>';
  document.getElementById('results-compact').innerHTML = html;

  // ── Share Section ───────────────────────────────────────────────
  currentShareText = buildShareText(top5, isPublic);
  var shareEl = document.getElementById('results-share');
  if (shareEl) shareEl.innerHTML = buildShareSection(currentShareText, isPublic);

  // ── All Specialties Section ─────────────────────────────────────
  currentRanked = ranked;
  var allEl = document.getElementById('results-all');
  if (allEl) allEl.innerHTML = buildAllSpecialtiesSection(ranked, isPublic);

  // ── Compare Section ─────────────────────────────────────────────
  var compareEl = document.getElementById('results-compare');
  if (compareEl) compareEl.innerHTML = buildCompareSection(isPublic);

  // ── Disclaimer ──────────────────────────────────────────────────
  var disclaimerEl = document.getElementById('results-disclaimer');
  if (disclaimerEl) {
    disclaimerEl.innerHTML = isPublic
      ? '<strong>注意：</strong>本結果は自己理解のための参考情報です。医学的な診断ではありません。'
      : '<strong>注意：</strong>本結果は自己理解・進路検討のための参考情報です。医学的な適性診断や進路の確定を行うものではありません。実習・見学・指導医との対話を通じてご検討ください。';
  }

  // ── Animate score bars + trend bars ────────────────────────────
  requestAnimationFrame(function() {
    setTimeout(function() {
      document.querySelectorAll('.score-bar-fill, .trend-bar, .summary-trend-bar').forEach(function(el) {
        el.style.width = el.getAttribute('data-pct') + '%';
      });
    }, 80);
  });
}

// ── Result-quality notices ────────────────────────────────────────

/**
 * Build HTML for low-variance and near-tie notice boxes.
 * Both can appear simultaneously.
 * @param {{ isLowVariance, isTied, lowVarianceMsg, tiedMsg }} summary
 * @returns {string} HTML string (empty when no notices apply)
 */
function buildNoticesHtml(summary) {
  var html = '';
  if (summary.isLowVariance) {
    html += '<div class="result-notice result-notice-warn">⚠️ ' + esc(summary.lowVarianceMsg) + '</div>';
  }
  if (summary.isTied) {
    html += '<div class="result-notice result-notice-info">💡 ' + esc(summary.tiedMsg) + '</div>';
  }
  return html;
}

// ── Share text & section ──────────────────────────────────────────

function buildShareText(top5, isPublic) {
  var best = top5[0];
  var sp   = best.sp;
  var url  = location.origin + location.pathname;

  if (isPublic) {
    return '私は「' + sp.typeName + '」でした！\n' +
           sp.oneLine + '\n\n' +
           (sp.friendComment || '') + '\n\n' +
           'あなたも診断してみて👇\n' + url;
  }

  var lines = ['私の診療科・医師キャリア適性診断 結果'];
  top5.forEach(function(item, i) {
    lines.push((i + 1) + '位：' + item.sp.name);
  });
  lines.push('');
  lines.push('あなたも診断してみて👇');
  lines.push(url);
  return lines.join('\n');
}

function buildShareSection(text, isPublic) {
  return (
    '<div class="share-box">' +
      '<div class="share-box-label">' + (isPublic ? '📣 友達にシェアしよう' : '📣 シェアする') + '</div>' +
      '<div class="share-text">' + esc(text).replace(/\n/g, '<br>') + '</div>' +
      '<button class="btn-copy" id="btn-copy" onclick="copyShareText()">結果をコピー 📋</button>' +
    '</div>'
  );
}

// ── All Specialties Section ───────────────────────────────────────

function buildAllSpecialtiesSection(ranked, isPublic) {
  var rows = ranked.map(function(item, i) {
    var sp          = item.sp;
    var uid         = 'allsp-' + sp.id;
    var displayName = isPublic && sp.typeName ? sp.typeName : sp.name;
    var shortDesc   = isPublic
      ? (sp.catchphrase || sp.oneLine || sp.tagline || '')
      : (sp.tagline || sp.desc || '');
    var fullDesc    = isPublic && sp.publicDescription
      ? sp.publicDescription
      : (sp.studentDescription || sp.desc || '');
    var strengthTags = sp.strengths
      ? sp.strengths.map(function(s) { return '<span class="tag tag-strength">' + esc(s) + '</span>'; }).join('')
      : '';
    var cautionTags = sp.cautions
      ? sp.cautions.map(function(c) { return '<span class="tag tag-caution">' + esc(c) + '</span>'; }).join('')
      : '';

    return (
      '<div class="allsp-row">' +
        '<div class="allsp-header" onclick="toggleAllSp(\'' + uid + '\')">' +
          '<span class="allsp-rank">' + (i + 1) + '</span>' +
          (isPublic && sp.emoji ? '<span class="allsp-emoji">' + sp.emoji + '</span>' : '') +
          '<div class="allsp-name-group">' +
            '<span class="allsp-name">' + esc(displayName) + '</span>' +
            '<span class="allsp-short-desc">' + esc(shortDesc) + '</span>' +
          '</div>' +
          '<span class="allsp-pct">' + item.pct + '%</span>' +
          '<span class="allsp-arrow" id="allsp-arrow-' + uid + '">›</span>' +
        '</div>' +
        '<div class="allsp-detail" id="allsp-detail-' + uid + '">' +
          '<p class="allsp-full-desc">' + esc(fullDesc) + '</p>' +
          (strengthTags
            ? '<div class="detail-section"><div class="detail-section-title title-strength">' +
              (isPublic ? 'このタイプが輝く場面' : 'この診療科の魅力') +
              '</div><div class="tag-list">' + strengthTags + '</div></div>'
            : '') +
          (cautionTags
            ? '<div class="detail-section" style="margin-bottom:0"><div class="detail-section-title title-caution">' +
              (isPublic ? 'こんな点に注意' : '注意しておきたい点') +
              '</div><div class="tag-list">' + cautionTags + '</div></div>'
            : '') +
        '</div>' +
      '</div>'
    );
  }).join('');

  return (
    '<div class="allsp-section">' +
      '<button class="btn-allsp" id="btn-allsp" onclick="toggleAllSpecialties()">' +
        '他の診療科・キャリアも見る ▼' +
      '</button>' +
      '<div class="allsp-list" id="allsp-list">' +
        rows +
      '</div>' +
    '</div>'
  );
}

function toggleAllSpecialties() {
  var list = document.getElementById('allsp-list');
  var btn  = document.getElementById('btn-allsp');
  if (!list || !btn) return;
  var opening = !list.classList.contains('open');
  list.classList.toggle('open', opening);
  btn.textContent = opening ? '他の診療科・キャリアを閉じる ▲' : '他の診療科・キャリアも見る ▼';
  if (opening) setTimeout(function() { list.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
}

function toggleAllSp(uid) {
  var detail = document.getElementById('allsp-detail-' + uid);
  var arrow  = document.getElementById('allsp-arrow-' + uid);
  if (!detail) return;
  var opening = !detail.classList.contains('open');
  detail.classList.toggle('open', opening);
  if (arrow) arrow.textContent = opening ? '∨' : '›';
}

// ══════════════════════════════════════════════════════════════════
//  COMPARE SECTION  (志望診療科との差分表示)
// ══════════════════════════════════════════════════════════════════

function buildCompareSection(isPublic) {
  var sps = getSpecialtiesForMode(mode);
  var options = sps.map(function(sp) {
    var label = isPublic && sp.typeName ? sp.typeName : sp.name;
    return '<option value="' + esc(sp.id) + '">' + esc(label) + '</option>';
  }).join('');

  return (
    '<div class="compare-section">' +
      '<button class="btn-compare-toggle" id="btn-compare-toggle" onclick="toggleCompareSection()">' +
        '志望診療科と比較する ▼' +
      '</button>' +
      '<div class="compare-body" id="compare-body">' +
        '<p class="compare-intro">気になる診療科を選ぶと、あなたの傾向との違いを確認できます。</p>' +
        '<select class="compare-select" id="compare-select" onchange="compareWithSpecialty(this.value)">' +
          '<option value="">診療科を選んでください…</option>' +
          options +
        '</select>' +
        '<div id="compare-result"></div>' +
      '</div>' +
    '</div>'
  );
}

function toggleCompareSection() {
  var body = document.getElementById('compare-body');
  var btn  = document.getElementById('btn-compare-toggle');
  if (!body || !btn) return;
  var opening = !body.classList.contains('open');
  body.classList.toggle('open', opening);
  btn.textContent = opening ? '志望診療科と比較する ▲' : '志望診療科と比較する ▼';
  if (opening) setTimeout(function() { body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
}

function compareWithSpecialty(spId) {
  var el = document.getElementById('compare-result');
  if (!el) return;
  if (!spId || !currentRanked.length) { el.innerHTML = ''; return; }
  var sp = getSpecialtiesForMode(mode).find(function(s) { return s.id === spId; });
  if (!sp) { el.innerHTML = ''; return; }
  el.innerHTML = buildCompareChart(currentRanked[0].dimScore, sp);
  // Animate bars after render
  requestAnimationFrame(function() {
    setTimeout(function() {
      el.querySelectorAll('.compare-bar-fill[data-w]').forEach(function(b) {
        b.style.width = b.getAttribute('data-w') + '%';
      });
    }, 60);
  });
}

function buildCompareChart(userDims, sp) {
  var isPublic  = (mode === 'public');
  var labelMap  = isPublic ? DIM_LABEL_MAP_PUBLIC : DIM_LABEL_MAP;
  var spName    = isPublic && sp.typeName ? sp.typeName : sp.name;

  var rows  = '';
  var diffs = [];

  DIMS.forEach(function(d) {
    var userScore  = userDims[d] != null ? userDims[d] : 0.5;
    var idealScore = ((sp.weights[d] || 3) - 1) / 4;
    var diff       = userScore - idealScore;
    var label      = labelMap[d] || d;
    var userPct    = Math.round(userScore  * 100);
    var idealPct   = Math.round(idealScore * 100);

    diffs.push({ d: d, label: label, diff: diff, userScore: userScore, idealScore: idealScore });

    var statusClass, statusText;
    if (diff < -0.25)     { statusClass = 'diff-gap';      statusText = '低め'; }
    else if (diff > 0.2)  { statusClass = 'diff-strength'; statusText = '強み'; }
    else                  { statusClass = 'diff-close';    statusText = '近い'; }

    rows += (
      '<div class="compare-dim-row">' +
        '<div class="compare-dim-label">' + esc(label) + '</div>' +
        '<div class="compare-bar-row">' +
          '<span class="compare-bar-who">あなた</span>' +
          '<div class="compare-bar-track">' +
            '<div class="compare-bar-fill compare-bar-user" data-w="' + userPct + '" style="width:0"></div>' +
          '</div>' +
          '<span class="compare-bar-pct">' + userPct + '%</span>' +
        '</div>' +
        '<div class="compare-bar-row">' +
          '<span class="compare-bar-who">' + esc(spName) + '</span>' +
          '<div class="compare-bar-track">' +
            '<div class="compare-bar-fill compare-bar-ideal" data-w="' + idealPct + '" style="width:0"></div>' +
          '</div>' +
          '<span class="compare-bar-pct">' + idealPct + '%</span>' +
        '</div>' +
        '<span class="compare-status-badge ' + statusClass + '">' + statusText + '</span>' +
      '</div>'
    );
  });

  // Summary sentences — top 3 gaps + top 2 strengths
  var gaps = diffs.filter(function(x) { return x.diff < -0.25; })
                  .sort(function(a, b) { return a.diff - b.diff; })
                  .slice(0, 3);
  var strengths = diffs.filter(function(x) { return x.diff > 0.2; })
                       .sort(function(a, b) { return b.diff - a.diff; })
                       .slice(0, 2);

  var sumItems = '';
  gaps.forEach(function(x) {
    sumItems +=
      '<li class="compare-sum-item compare-sum-gap">' +
        '「' + esc(x.label) + '」を意識するとさらに相性が上がりそうです' +
      '</li>';
  });
  strengths.forEach(function(x) {
    sumItems +=
      '<li class="compare-sum-item compare-sum-strength">' +
        '「' + esc(x.label) + '」はあなたの強みです。この傾向を活かせます' +
      '</li>';
  });
  if (!sumItems) {
    sumItems =
      '<li class="compare-sum-item compare-sum-close">' +
        'あなたの傾向は' + esc(spName) + 'にとても近いです！' +
      '</li>';
  }

  return (
    '<div class="compare-chart">' +
      '<div class="compare-legend">' +
        '<span class="compare-leg compare-leg-user">■ あなた</span>' +
        '<span class="compare-leg compare-leg-ideal">■ ' + esc(spName) + '</span>' +
      '</div>' +
      rows +
      '<div class="compare-summary">' +
        '<div class="compare-sum-title">傾向の違い</div>' +
        '<ul class="compare-sum-list">' + sumItems + '</ul>' +
      '</div>' +
    '</div>'
  );
}

function copyShareText() {
  var btn = document.getElementById('btn-copy');
  function onSuccess() {
    btn.textContent = 'コピーしました ✓';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = '結果をコピー 📋'; btn.classList.remove('copied'); }, 2500);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(currentShareText).then(onSuccess).catch(fallback);
  } else { fallback(); }
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = currentShareText;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;width:1px;height:1px';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); onSuccess(); } catch(e) {}
    document.body.removeChild(ta);
  }
}

// ── Hero Card ─────────────────────────────────────────────────────

function buildTraitsHtml(sp, isPublic) {
  if (!sp.relatableTraits || !sp.relatableTraits.length) return '';
  var label = isPublic ? '🎯 ' + sp.shortType + 'あるある' : '🎯 ' + sp.name + 'タイプあるある';
  var items = sp.relatableTraits.map(function(t) {
    return '<li class="trait-item">✓ ' + esc(t) + '</li>';
  }).join('');
  return '<div class="hero-traits"><div class="traits-label">' + label + '</div><ul class="traits-list">' + items + '</ul></div>';
}

function buildHeroCard(item, rank, isPublic) {
  var sp       = item.sp;
  var pct      = item.pct;
  var dimScore = item.dimScore;
  var reasons  = matchReasons(sp, dimScore);
  var uid      = sp.id;

  var reasonsTags  = reasons.map(function(r) { return '<span class="tag tag-match">' + esc(r) + '</span>'; }).join('');
  var strengthTags = sp.strengths.map(function(s) { return '<span class="tag tag-strength">' + esc(s) + '</span>'; }).join('');
  var cautionTags  = sp.cautions.map(function(c) { return '<span class="tag tag-caution">' + esc(c) + '</span>'; }).join('');

  if (isPublic) {
    var color = sp.color || '#3b82f6';
    var pubDetailInner =
      '<div class="detail-section">' +
        '<div class="detail-section-title" style="color:' + color + '">🧠 あなたの性格</div>' +
        '<div class="pers-detail-text">' + esc(sp.personality || '') + '</div>' +
      '</div>' +
      '<div class="detail-section">' +
        '<div class="detail-section-title" style="color:' + color + '">🏢 向いている環境</div>' +
        '<div class="pers-detail-text">' + esc(sp.suitableEnv || '') + '</div>' +
      '</div>' +
      (reasons.length > 0
        ? '<div class="detail-section"><div class="detail-section-title title-match">このタイプに合う特徴</div><div class="tag-list">' + reasonsTags + '</div></div>'
        : '') +
      '<div class="detail-section"><div class="detail-section-title title-strength">このタイプが輝く場面</div><div class="tag-list">' + strengthTags + '</div></div>' +
      '<div class="detail-section"><div class="detail-section-title title-caution">こんな点に注意</div><div class="tag-list">' + cautionTags + '</div></div>';

    return (
      '<div class="hero-card hero-card-pub">' +
        '<div class="hero-top-pub" style="background: linear-gradient(150deg, ' + color + ', ' + color + 'bb)">' +
          '<div class="pub-emoji-ring">' + esc(sp.emoji || '🏥') + '</div>' +
          '<div class="pub-short-type-badge">' + esc(sp.shortType || '') + '</div>' +
          '<div class="pub-type-name">あなたは「' + esc(sp.typeName) + '」！</div>' +
          (sp.title ? '<div class="pub-title">「' + esc(sp.title) + '」</div>' : '') +
          '<div class="pub-one-line">' + esc(sp.oneLine || sp.catchphrase || '') + '</div>' +
          '<div class="pub-score-row">' +
            '<span class="pub-score-label">マッチ度</span>' +
            '<div class="pub-score-track">' +
              '<div class="score-bar-fill pub-bar-fill" data-pct="' + pct + '" style="width:0"></div>' +
            '</div>' +
            '<span class="pub-score-pct">' + pct + '%</span>' +
          '</div>' +
        '</div>' +
        buildTraitsHtml(sp, true) +
        '<div class="hero-friend-comment">' +
          '<div class="friend-comment-icon">💬</div>' +
          '<p class="friend-comment-text">' + esc(sp.friendComment || '') + '</p>' +
        '</div>' +
        '<div class="hero-body">' +
          '<button class="detail-toggle-btn" onclick="toggleDetail(\'' + uid + '\')" id="toggle-' + uid + '">' +
            '詳しく見る<span class="toggle-arrow" id="arrow-' + uid + '">▼</span>' +
          '</button>' +
          '<div class="detail-body" id="detail-' + uid + '">' + pubDetailInner + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // ── Student mode hero card ────────────────────────────────────
  // Collapsible includes personality description + strengths + cautions.
  // "なぜこの科？" and あるある stay always-visible for immediate 納得感.
  var studentDetailInner =
    '<div class="detail-section">' +
      '<div class="detail-section-title">📋 この診療科の特徴</div>' +
      '<p class="pers-detail-text">' + esc(sp.studentDescription || sp.personality || sp.desc) + '</p>' +
    '</div>' +
    '<div class="detail-section"><div class="detail-section-title title-strength">この診療科の魅力</div><div class="tag-list">' + strengthTags + '</div></div>' +
    '<div class="detail-section"><div class="detail-section-title title-caution">注意しておきたい点</div><div class="tag-list">' + cautionTags + '</div></div>';

  return (
    '<div class="hero-card">' +
      '<div class="hero-header">' +
        '<span class="hero-rank">1位</span>' +
        '<span class="hero-name">' + esc(sp.name) + '</span>' +
        '<span class="hero-score">' + pct + '%</span>' +
      '</div>' +
      (sp.title ? '<div class="hero-stitle">「' + esc(sp.title) + '」</div>' : '') +
      '<div class="hero-bar-wrap">' +
        '<div class="score-bar-track">' +
          '<div class="score-bar-fill" data-pct="' + pct + '" style="width:0"></div>' +
        '</div>' +
      '</div>' +
      '<div class="hero-body">' +
        buildWhySectionHtml(sp, dimScore) +
        buildTraitsHtml(sp, false) +
        '<button class="detail-toggle-btn" onclick="toggleDetail(\'' + uid + '\')" id="toggle-' + uid + '">' +
          '詳細を見る<span class="toggle-arrow" id="arrow-' + uid + '">▼</span>' +
        '</button>' +
        '<div class="detail-body" id="detail-' + uid + '">' + studentDetailInner + '</div>' +
      '</div>' +
    '</div>'
  );
}

// ── Compact Card ──────────────────────────────────────────────────

function buildCompactCard(item, rank, isPublic) {
  var sp       = item.sp;
  var pct      = item.pct;
  var dimScore = item.dimScore;
  var uid      = sp.id;

  var displayName  = isPublic && sp.typeName ? sp.typeName : sp.name;
  var descText     = isPublic && sp.publicDescription
    ? sp.publicDescription
    : (sp.studentDescription || sp.desc);
  var strengthTags = sp.strengths.map(function(s) { return '<span class="tag tag-strength">' + esc(s) + '</span>'; }).join('');
  var cautionTags  = sp.cautions.map(function(c) { return '<span class="tag tag-caution">' + esc(c) + '</span>'; }).join('');

  // Reasons: tag-style for public, sentence-style for student
  var reasonsBlock = '';
  if (isPublic) {
    var pubReasons = matchReasons(sp, dimScore);
    if (pubReasons.length) {
      var pubTags = pubReasons.map(function(r) { return '<span class="tag tag-match">' + esc(r) + '</span>'; }).join('');
      reasonsBlock = '<div class="detail-section"><div class="detail-section-title title-match">あなたに合う理由</div><div class="tag-list">' + pubTags + '</div></div>';
    }
  } else {
    var stuReasons = buildStudentWhyReasons(sp, dimScore);
    if (stuReasons.length) {
      var stuItems = stuReasons.map(function(r) { return '<li class="why-item">' + esc(r) + '</li>'; }).join('');
      reasonsBlock = '<div class="detail-section"><div class="detail-section-title title-match">この科が合う理由</div><ul class="why-list">' + stuItems + '</ul></div>';
    }
  }

  return (
    '<div class="compact-card">' +
      '<div class="compact-header">' +
        '<span class="compact-rank">' + rank + '位</span>' +
        (isPublic && sp.emoji ? '<span class="compact-emoji">' + sp.emoji + '</span>' : '') +
        '<div class="compact-name-group">' +
          '<span class="compact-name">' + esc(displayName) + '</span>' +
          (isPublic && sp.archetype ? '<span class="compact-archetype">' + esc(sp.archetype) + '</span>' : '') +
        '</div>' +
        '<span class="compact-score">' + pct + '%</span>' +
      '</div>' +
      '<div class="compact-bar-wrap">' +
        '<div class="score-bar-track">' +
          '<div class="score-bar-fill" data-pct="' + pct + '" style="width:0"></div>' +
        '</div>' +
      '</div>' +
      '<div class="compact-toggle-wrap">' +
        '<button class="compact-toggle-btn" onclick="toggleCompact(\'' + uid + '\')" id="ctoggle-' + uid + '">' +
          '詳細を見る<span class="toggle-arrow" id="carrow-' + uid + '">▼</span>' +
        '</button>' +
        '<div class="compact-detail-body" id="cdetail-' + uid + '">' +
          '<p class="compact-desc">' + esc(descText) + '</p>' +
          reasonsBlock +
          (isPublic
            ? '<div class="detail-section"><div class="detail-section-title title-strength">このタイプが輝く場面</div><div class="tag-list">' + strengthTags + '</div></div>'
            : '<div class="detail-section"><div class="detail-section-title title-strength">この診療科の魅力</div><div class="tag-list">' + strengthTags + '</div></div>') +
          (isPublic
            ? '<div class="detail-section" style="margin-bottom:0"><div class="detail-section-title title-caution">こんな点に注意</div><div class="tag-list">' + cautionTags + '</div></div>'
            : '<div class="detail-section" style="margin-bottom:0"><div class="detail-section-title title-caution">注意しておきたい点</div><div class="tag-list">' + cautionTags + '</div></div>') +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

// ── 3秒サマリーカード ─────────────────────────────────────────────

/**
 * Build the compact "3-second summary" card shown at the top of results.
 * Contains: type name + score, catchphrase, top why-sentence, top-3 trends,
 * and the "もっと詳しく見る" toggle button.
 */
function buildSummaryCard(best, isPublic) {
  var sp       = best.sp;
  var dimScore = best.dimScore;
  var pct      = best.pct;

  var displayName = isPublic && sp.typeName ? sp.typeName : sp.name;
  var catchLine   = isPublic && sp.catchphrase ? sp.catchphrase : sp.tagline;

  // 1-sentence why
  var whySentence = '';
  if (!isPublic) {
    var stuR = buildStudentWhyReasons(sp, dimScore);
    whySentence = stuR.length ? stuR[0] : '';
  } else {
    var pubR = matchReasons(sp, dimScore);
    whySentence = pubR.length ? pubR[0] : (sp.oneLine || '');
  }

  // Top-3 dimension trends
  var sorted = Object.keys(dimScore).map(function(d) {
    return { dim: d, score: dimScore[d] };
  }).sort(function(a, b) { return b.score - a.score; }).slice(0, 3);

  var trendItems = sorted.map(function(item) {
    var pctVal = Math.round(item.score * 100);
    var label  = isPublic
      ? (DIM_LABEL_MAP_PUBLIC[item.dim] || item.dim)
      : (TOP_TREND_LABELS[item.dim]     || item.dim);
    return (
      '<li class="summary-trend-item">' +
        '<span class="summary-trend-label">' + esc(label) + '</span>' +
        '<div class="summary-trend-bar-wrap">' +
          '<div class="summary-trend-bar" data-pct="' + pctVal + '" style="width:0"></div>' +
        '</div>' +
        '<span class="summary-trend-pct">' + pctVal + '%</span>' +
      '</li>'
    );
  }).join('');

  var accentColor = (isPublic && sp.color) ? sp.color : '#3b82f6';

  return (
    '<div class="results-summary-card" style="border-left: 4px solid ' + accentColor + '">' +
      '<div class="summary-header">' +
        '<span class="summary-specialty-name">' + esc(displayName) + '</span>' +
        '<span class="summary-score-badge" style="background:' + accentColor + '">' + pct + '%</span>' +
      '</div>' +
      '<p class="summary-catchphrase">' + esc(catchLine) + '</p>' +
      (whySentence
        ? '<div class="summary-why">' +
            '<span class="summary-why-label">▶</span>' +
            '<span class="summary-why-text">' + esc(whySentence) + '</span>' +
          '</div>'
        : '') +
      '<div class="summary-trends">' +
        '<div class="summary-trends-label">あなたの強い傾向 TOP3</div>' +
        '<ul class="summary-trend-list">' + trendItems + '</ul>' +
      '</div>' +
      '<button class="btn-show-detail" onclick="toggleResultsDetail()" id="btn-show-detail">' +
        'もっと詳しく見る ▼' +
      '</button>' +
    '</div>'
  );
}

function toggleResultsDetail() {
  var detail = document.getElementById('results-detail');
  var btn    = document.getElementById('btn-show-detail');
  var open   = detail.classList.toggle('open');
  btn.textContent = open ? '閉じる ▲' : 'もっと詳しく見る ▼';
  if (open) {
    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ══════════════════════════════════════════════════════════════════
//  TOGGLE
// ══════════════════════════════════════════════════════════════════

function toggleDetail(uid) {
  var body  = document.getElementById('detail-' + uid);
  var arrow = document.getElementById('arrow-' + uid);
  var btn   = document.getElementById('toggle-' + uid);
  var open  = body.classList.toggle('open');
  arrow.textContent = open ? '▲' : '▼';
  btn.childNodes[0].textContent = open ? '閉じる　' : (mode === 'public' ? '詳しく見る　' : '詳細を見る　');
}

function toggleCompact(uid) {
  var body  = document.getElementById('cdetail-' + uid);
  var arrow = document.getElementById('carrow-' + uid);
  var btn   = document.getElementById('ctoggle-' + uid);
  var open  = body.classList.toggle('open');
  arrow.textContent = open ? '▲' : '▼';
  btn.childNodes[0].textContent = open ? '閉じる　' : '詳細を見る　';
}

// ══════════════════════════════════════════════════════════════════
//  UTILS
// ══════════════════════════════════════════════════════════════════

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ══════════════════════════════════════════════════════════════════
//  GLOBAL EXPORTS
// ══════════════════════════════════════════════════════════════════

window.selectMode          = selectMode;
window.startQuiz           = startQuiz;
window.answer              = answer;
window.prevQuestion        = prevQuestion;
window.goTop               = goTop;
window.goHomeFromQuiz      = goHomeFromQuiz;
window.toggleDetail        = toggleDetail;
window.toggleCompact       = toggleCompact;
window.copyShareText       = copyShareText;
window.toggleResultsDetail  = toggleResultsDetail;
window.toggleAllSpecialties  = toggleAllSpecialties;
window.toggleAllSp           = toggleAllSp;
window.toggleCompareSection  = toggleCompareSection;
window.compareWithSpecialty  = compareWithSpecialty;

// ══════════════════════════════════════════════════════════════════
//  DEBUG UTILS  (call from browser console)
// ══════════════════════════════════════════════════════════════════

/**
 * Verify scoring results for 5 canonical answer patterns.
 * Usage: open DevTools → runScoringTests()
 *
 * Question order (by dimension, 3 questions each):
 *   indices 0-2:   hands_on
 *   indices 3-5:   long_term
 *   indices 6-8:   acute
 *   indices 9-11:  research
 *   indices 12-14: technical
 *   indices 15-17: communication
 *   indices 18-20: visual
 *   indices 21-23: lifestyle
 *   indices 24-26: variety
 *   indices 27-29: precision
 */
function runScoringTests() {
  function makeAnswers(vals) {
    var ans = {};
    FALLBACK_QUESTIONS.forEach(function(q, i) { ans[q.id] = vals[i] || 3; });
    return ans;
  }
  function fill(base, overrides) {
    var v = Array(30).fill(base);
    Object.keys(overrides).forEach(function(range) {
      var parts = range.split('-').map(Number);
      var start = parts[0], end = parts[1] != null ? parts[1] : parts[0];
      for (var i = start; i <= end; i++) v[i] = overrides[range];
    });
    return v;
  }

  var scenarios = [
    { name: 'all-3（平均的）',          vals: Array(30).fill(3) },
    { name: '研究志向（research↑ hands/acute↓）', vals: fill(3, {'9-11':5, '0-2':1, '6-8':1, '27-29':5}) },
    { name: '公衆衛生/制度志向（comm↑ variety↑ hands/acute/visual↓）', vals: fill(3, {'15-17':5, '24-26':5, '21-23':4, '9-11':4, '0-2':1, '6-8':1, '18-20':1}) },
    { name: '手技志向（hands↑ precision↑ research↓）', vals: fill(3, {'0-2':5, '27-29':5, '9-11':1}) },
    { name: '急性期志向（acute↑ variety↑ longterm/lifestyle↓）', vals: fill(3, {'6-8':5, '24-26':5, '0-2':4, '3-5':1, '21-23':1}) }
  ];

  console.group('%c[診療科マッチング] スコアリング検証', 'color:#3b82f6;font-weight:bold');
  scenarios.forEach(function(s) {
    var ans      = makeAnswers(s.vals);
    var norm     = Scoring.normalizeAnswers(ans, FALLBACK_QUESTIONS);
    var dims     = Scoring.calculateDimensionScores(norm, FALLBACK_QUESTIONS);
    var ranked   = Scoring.calculateSpecialtyMatches(dims, getSpecialtiesForMode('student'));
    console.group(s.name);
    ranked.slice(0, 5).forEach(function(r, i) {
      console.log((i + 1) + '位: ' + r.sp.name + '（' + r.pct + '%）');
    });
    console.groupEnd();
  });
  console.groupEnd();
}
window.runScoringTests = runScoringTests;

// ══════════════════════════════════════════════════════════════════
//  BOOT
// ══════════════════════════════════════════════════════════════════

loadData(function() { showScreen('welcome'); });
