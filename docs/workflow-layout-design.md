# workflow-layout-design.md

Task: `{page-name}` ページのレイアウト設計書作成 を開始します。

---

## Task 1: Explore（探索・理解）

以下のドキュメントを読んで、内容を理解してください。

- `claude/CLAUDE.md`
- `docs/layout-design-spec.md`
- `claude/skills/layout-system/SKILL.md`
- `docs/css-architecture.md`（CSS 2層構成・共通/ページ固有の切り分け）
- `assets/css/common.css`（既存の共通トークン・共通パーツを把握する）
- デザインの参照元（いずれか／複数）：
  - 既存HPのソース一式（`drafts/existing/` にある場合）→ HTML/CSS/img を読み、構成・配色・
    フォント・余白・コンテンツを把握する（ローカルなので正確に読める。リニューアルの理想的入力）
  - 既存HPのURL（指定された場合）→ WebFetch で内容・構成・テキストを読み取る
  - `drafts/` 内のデモHTML・カンプ画像・PDF（ある場合）
  - ユーザーからのテキスト指示
- `assets/img/` 内の本番画像

> URL参照について：構成・テキスト・ページ構造の把握には有効だが、正確な見た目
> （余白・色・フォント・レイアウト崩れ）までは取りきれない。細部は不明点として
> ユーザーに確認する。ログイン必須ページ・動的生成部分は取得できないことがある。
>
> 既存ソース（`drafts/existing/`）は **参照専用**。直接編集せず、構造はキット規約に沿って
> ゼロから再設計する（古い書き方を引きずらない）。既存の配色・フォントは `common.css` の
> `:root` トークンに反映する。流用画像は `assets/img/` にコピーして使う。

重要：

- この段階では設計書を書かない
- 不明点があれば設計前に質問する
- 既存ルールを優先する
- デザインカンプからレイアウト構造を整理する

完了後、Task 2 に進む。

---

## Task 2: Plan（計画）

設計前に以下を整理してください。

- セクション構成
- section 名
- 使用レイアウト
- SP / PC の差異
- 使用画像
- common.css の共通パーツで賄える部分 / ページ固有で書く部分の切り分け

以下の形式で計画をまとめる。

    section:
    sect-{section-name}

    layout:
    - fluid
    - shelf

    SP:
    - 縦積み

    PC:
    - 2カラム grid

    images:
    - hero-main_pht1.jpg
    - hero-main_logo1.svg

まとめた計画をユーザーに提示し、確認を取る。確認する観点：

- セクションの分け方・順番
- 各セクションのレイアウト選択（bleed / fluid / shelf / tile など）
- SP / PC の差異
- 画像の使い方
- セクション名（命名）

「この計画で設計書を作成してよいですか？変更があればお知らせください。」と確認する。
ユーザーの承認が取れてから Task 3 に進む。

---

## Task 3: Layout Design（設計）

以下のファイルを作成または更新する。

- `design/page-{page-name}.md`

---

## 共通ルール

- `CLAUDE.md` のルールを遵守する
- `SKILL.md` のレイアウト判断に従う
- `layout-design-spec.md` の記法に従う

---

## 設計ルール

- デザインカンプを忠実に構造化する
- SP / PC で構造差異がある場合はブロックを分ける
- wrapper は役割に応じて選択する
- section / heading hierarchy を守る
- 不要な wrapper を増やさない
- 画像ファイル名は命名規則に従う
- JS を使わずCSS・HTML標準機能で実現できる構造を優先する（`<details>/<summary>` 等）。`CLAUDE.md` の設計思想に従う。

---

## 出力対象

- section
- department
- wrapper
- lane
- zone
- item
- HTML要素
- 使用画像
- alt 情報

完了後、Task 4 に進む。

---

## Task 4: Record（記録）

以下を記録する。

- 設計内容 → `logs/CHANGELOG.md`
- 設計時の問題点 → `logs/ERRORLOG.md`
- 再利用可能なレイアウトや知見 → `logs/PATTERNS.md`
- 修正理由や今後の注意点 → `logs/PATTERNS.md`

ユーザーから修正指摘を受けた場合：

- 同じミスを防ぐルールを `logs/PATTERNS.md` に記録する
- 必要なら `CLAUDE.md` 更新を提案する

最後に：

`Task: {page-name} ページのレイアウト設計書作成 → 完了`

と報告し、続けて次の案内をする：

> コーディングは新しいセッションで開始してください。
> （設計フェーズで読み込んだ情報が多いため、セッションを分けると安定します）
> 新しいセッションで `docs/workflow-coding.md` を渡してください。