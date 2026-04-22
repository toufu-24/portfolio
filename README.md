# So Fujino Portfolio

ポートフォリオサイトです。Next.js ベースの個人サイトになっています。

## 概要

- App Router ベースのシングルページ構成
- Canvas と `framer-motion` を使ったアニメーション演出
- `public/projects/*.md` をモーダルで表示する制作物一覧
- GitHub API を使った統計、主要リポジトリ、言語比率の表示
- 日本語中心のプロフィールサイト向けデザイン

## 技術スタック

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- `react-markdown` + `rehype-raw`
- Octokit

## セットアップ

### 前提

- Node.js 22.14.0
- npm

### 開発サーバー

```bash
npm ci
npm run dev
```

ブラウザで `http://localhost:3000` を開くと確認できます。

### 利用できるコマンド

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 環境変数

GitHub 情報の取得にはトークン設定を推奨します。

```bash
GITHUB_TOKEN=your_token
# または
GH_TOKEN=your_token
```

`lib/github.ts` では上記のどちらかを参照します。未設定でもページ自体は表示されますが、GitHub の統計や contribution 数は空になることがあります。

## コンテンツ更新

### 制作物を追加する

1. サムネイル画像や SVG、詳細 Markdown を `public/projects/` に追加する
2. `components/ProjectsList.tsx` の `projects` 配列にカード情報を追加する
3. `detailPath` に追加した Markdown ファイル名を指定する

Markdown は `react-markdown` で描画しており、`rehypeRaw` を有効にしているので簡単な HTML も使えます。既存の `public/projects/*.md` を雛形として使うのが早いです。

### 他のセクションを更新する

- `app/page.tsx`: トップページの構成
- `components/Hero.tsx`: ファーストビューと外部リンク
- `lib/publications.ts`: 出版物
- `components/Timeline.tsx`: 経歴・活動履歴
- `components/Contact.tsx`: 連絡先
- `lib/github.ts`: GitHub ユーザー名と集計ロジック

## ディレクトリ概要

```text
app/                  App Router のエントリと全体レイアウト
components/           各セクションと UI コンポーネント
lib/                  GitHub 取得処理やデータ定義
public/               画像などの静的アセット
public/projects/      制作物の Markdown とサムネイル
```

## 備考

- GitHub セクションはサーバー側で都度取得する実装です
- 制作物詳細は Markdown を fetch してモーダルに表示しています
- README は実装に合わせて更新しているので、運用を変えたらここも追従させてください
