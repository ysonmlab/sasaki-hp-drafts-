# NewProject（原本テンプレート）

新しいWebサイト案件を始めるための**原本テンプレート**。
このフォルダ自体は直接編集せず、**コピーして各案件用フォルダを作る**。

想定：**10ページ未満の小規模サイト**／**非エンジニアによるメンテナンス**／
**HTML + モダンCSS 中心・JSは最低限**／**最終納品はレンタルサーバーへFTP**。

---

## 含まれるもの（再利用キット）

```
docs/         … 使い方・ワークフロー・設計記法・CSS規約・落とし穴集・公開/共同作業ガイド
claude/       … CLAUDE.md + layout-system skill（SKILL.md + patterns）
assets/
  ├ css/      … reset.css / common.css（共通）/ index.css（ページ固有・スターター）
  ├ js/       … 共通JS（必要時のみ）
  └ img/      … 画像（フラット配置・小規模サイトのためページ別サブフォルダは作らない）
design/       … レイアウト設計書（page-{page-name}.md）置き場
drafts/       … デザインの見本（カンプ・デモHTML）／共同作業者のたたき台置き場
logs/         … CHANGELOG / ERRORLOG / PATTERNS（見出しのみ・空）
index.html    … トップページ（ルート直下・実体）
.nojekyll     … GitHub Pages（デモ共有用）
.gitignore
```

> HTMLは**ルート直下にフラット**に置く（`index.html` / `about.html` …）。
> CSS・画像は**相対パス**（全ページ共通で `assets/...`）。

---

## CSS構成（2層）

```
reset.css      … ブラウザ初期化（ほぼ触らない）
common.css     … サイト共通のすべて（トークン・基本タイポ・ヘッダー/フッター・使い回しパーツ）
{page}.css     … そのページ固有（.pg-{page} .sect-* スコープ）
```

詳細 → `docs/css-architecture.md`

---

## 新しい案件の始め方

詳しい手順は **`docs/how-to-use.md`** を参照。

1. このフォルダ（`NewProject`）を**まるごとコピー**し、案件名にリネーム（例 `clinicHP`）。
   - コピー時、`.git` は含めない（含まれていれば削除）。各案件は新しいリポジトリにする。
2. コピーしたフォルダを **VS Code で開く**。
3. Claude Code に「`新しいプロジェクトを始めます。docs/project-setup.md を読んで進めてください。`」と送信。
   - プロジェクト名・入口ページ名・素材の有無を聞かれるので答える。
   - 初期化（フォルダ作成・`index.html` 調整・ログ初期化）が自動で行われる。
4. 素材を配置（カンプ・デモHTML → `drafts/` ／ 本番画像 → `assets/img/`）。
5. 設計 → 実装（`docs/workflow-layout-design.md` → `docs/workflow-coding.md`）。
6. 納品は **FTPアップロード**。デモ共有は `docs/deploy-github-pages.md`、共同作業は `docs/for-collaborators.md`。

---

## メモ
- デザイントークン（`:root` の色・フォント）は `assets/css/common.css` の先頭で定義・調整する。
- 全ページ共通のヘッダー・フッター・使い回しパーツも `common.css` に集約する。
