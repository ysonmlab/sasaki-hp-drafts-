# project-setup.md

# 新しいセッション開始

Task: 新規プロジェクトの初期化 を開始します。

---

## Task 1: Explore（確認）

以下のドキュメントを読んで、ルールを理解してください。

- `claude/CLAUDE.md`

重要：
- この段階ではファイルを作らない
- 理解できたら Task 2 に進む

---

## Task 2: Interview（ヒアリング）

ユーザーに以下を順番に質問してください。すべて揃ったら Task 3 に進む。

### 質問リスト

1. **プロジェクト名**（日本語OK）
   - 例：クリニックHP、カフェ公式サイト
   - 用途：ドキュメント内の表記

2. **入口ページ名**（英語）
   - 例：`index`（トップは `index` 固定推奨）
   - 用途：HTMLファイル名（`{page-name}.html`）・`pg-{page-name}` クラス・`assets/img/`

3. **デザインの参照元**（複数選択可）
   - a. 既存HPのURL（リニューアル・既存サイトの整理）
   - b. 既存HPのソース一式（HTML/CSS/img フォルダ）がある（リニューアル）
   - c. デモHTML・カンプ画像・PDF（ファイルとして用意できる場合）
   - d. テキスト指示のみ（口頭・箇条書き）

   > a のURLはチャットで伝える（Claude Code が WebFetch で内容を読み取る）。
   >   ただし正確な見た目までは取りきれないため、レイアウト細部は会話で補足する。
   >   ログイン必須ページ・動的生成部分は取得できないことがある。
   > b の既存ソースは **`drafts/existing/`** にフォルダごと丸ごと置く（参照用・編集しない）。
   >   ローカルHTML/CSSは正確に読めるため、リニューアルの入力として理想的。
   > c のファイルは **`drafts/`**（デザインの見本＝入力）に置く。
   > 本番でサイトに載せる画像（写真・ロゴ等）は **`assets/img/`**（出力）に置く。
   >   既存画像を流用する場合は、命名規則に沿って `assets/img/` にコピーする。

4. **参照元の場所・内容**
   - a：対象URLを確認する
   - b/c：「配置済み」か「これから配置」かを確認する

---

## Task 3: Plan（提案・確認）

ヒアリング内容をもとに初期設定をまとめる。

以下の形式でユーザーに提示し、確認を取る：

```
プロジェクト名：{project-name}
入口ページ名：{page-name}
ページクラス：pg-{page-name}
セクション命名例：sect-hero
画像命名例：hero_bg1.jpg
```

「この設定で初期化を進めてよいですか？変更があればお知らせください。」と確認してから Task 4 へ。

---

## Task 4: Initialize（初期化）

ユーザーの確認が取れたら、以下を実行する。

### フォルダ・ファイルを用意する

```
assets/css/{page-name}.css       … このページ固有CSS（空ファイルを作成）
```

> 画像は `assets/img/`（フラット）に置く。同梱済みのため新規フォルダ作成は不要。
> HTML はルート直下に置く（次項で作成）。CSS の共通分（`assets/css/common.css`）と
> `reset.css` はキットに同梱済みなので新規作成不要。

### 入口HTML（`{page-name}.html`）を用意する

- トップが `index` の場合：ルート直下の `index.html`（キット同梱のテンプレート）をそのまま使う。
  - `<title>` をプロジェクト名にし、プレースホルダ（`{project-name}`）を実値に置き換える。
- `index` 以外の名前にした場合：`index.html` をコピーして `{page-name}.html` を作り、
  `<body>` のクラスを `pg-{page-name}` に変更・`index.css` の読み込みを `{page-name}.css` に変更する。
- `<head>` のCSS読み込み順は reset → common → ページ固有（相対パス・`docs/css-architecture.md`）。

### `common.css` のデザイントークンを確認する

- `assets/css/common.css` の `:root`（配色・フォント）を案件に合わせて調整するようユーザーに促す
  （この時点では仮値のままでも可）。

### `logs/` を初期化する

以下3ファイルの先頭に `# {project-name}` の見出しを追記する：

- `logs/CHANGELOG.md`
- `logs/ERRORLOG.md`
- `logs/PATTERNS.md`

---

## Task 5: Handoff（引き渡し）

完了後、以下を報告する：

```
Task: 新規プロジェクトの初期化 → 完了

プロジェクト名：{project-name}
入口ページ：{page-name}.html（ルート直下）
```

次に、素材の配置状況をユーザーに確認する：

- 参照元がURL（a）の場合：対象URLを確認し、そのまま `docs/workflow-layout-design.md` を読んで設計フェーズへ進む。
- 既存ソース一式（b）の場合：
  「既存HPのフォルダを `drafts/existing/` に丸ごとコピーしてください。配置が完了したら教えてください。」
  → 「配置しました」の返答を受けたら、そのまま `docs/workflow-layout-design.md` を読んで設計フェーズへ進む。
- ファイル（c）の場合：
  「デモHTML・カンプは `drafts/` に、本番で使う画像は `assets/img/` に
  配置してください。配置が完了したら教えてください。」
  → 「配置しました」の返答を受けたら、そのまま `docs/workflow-layout-design.md` を読んで設計フェーズへ進む。
- テキスト指示のみ（d）の場合：そのまま `docs/workflow-layout-design.md` を読んで設計フェーズへ進む。
