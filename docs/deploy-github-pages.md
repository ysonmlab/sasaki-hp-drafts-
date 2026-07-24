# deploy-github-pages.md

> ⚠️ **位置づけ：これは「デモ共有・確認用」の補助手段です。**
> このキットの **最終納品はレンタルサーバーへのFTPアップロード**を想定しています。
> GitHub Pages は、制作途中のデザインを関係者と共有・確認したいときに便利な無料の手段として使います。
> （相対パス構成なので、ここで動けばFTP配置先でもそのまま動きます。）

静的サイトを **GitHub Pages** で無料公開し、URLを渡すだけで
（GitHubアカウントを持たない人でも）ブラウザ閲覧できる状態にする手順。

`{user}` = GitHubユーザー名、`{repo}` = リポジトリ名。
（トップは常にルート直下の `index.html`。GitHub Pages が自動で表示するため入口指定は不要。）

---

## 0. 前提

- ビルド不要の静的サイト（HTML/CSS/JS）であること。
- CSSや画像は**相対パス**で参照していること（`docs/css-architecture.md` 準拠）。
  → 階層がそのまま保たれるため、Pages 上でもパスが解決する。

---

## 1. Git ローカル準備

```bash
git init -b main
```

`.gitignore` を用意（作業一時物を除外）：

```
.DS_Store
Thumbs.db
desktop.ini
.vscode/*
!.vscode/extensions.json
.claude/plans/
.claude/server.ps1
*.log
node_modules/
dist/
tmp/
```

コミット用の名前・メールを設定（このリポジトリ限定なら `--local`）：

```bash
git config --local user.name  "{your-name}"
git config --local user.email "{your-email}"
```

最初のコミット：

```bash
git add -A
git commit -m "Initial commit"
```

> VS Code の「ソース管理」タブからも、メッセージ入力＋コミットボタンで同じことができる。

---

## 2. GitHub リポジトリ作成 & 接続

1. ブラウザで https://github.com/new を開く。
2. **Repository name** に `{repo}` を入力。Private / Public を選択。
3. **README / .gitignore / license は追加しない**（空のまま。中身があると初回 push で衝突する）。
4. 「Create repository」。

ローカルと接続して push：

```bash
git remote add origin https://github.com/{user}/{repo}.git
git push -u origin main
```

> 初回 push 時、Windows の認証マネージャがブラウザの GitHub ログインを表示する。
> ログイン＆許可すれば以降は認証不要（個人アクセストークンの手動作成は不要）。

---

## 3. 入口ファイルの確認（キット同梱）

新構成では **`index.html` がトップページの実体**そのもの（ルート直下）なので、
リダイレクト用の中継ページは不要。GitHub Pages はルートの `index.html` を自動で表示する。

確認するファイル（いずれもキットに同梱済み）：

- ルート直下の `index.html`（トップページ）
- `.nojekyll`（空ファイル）… GitHub Pages の Jekyll 処理を無効化し、ファイルをそのまま配信させる安全策

特別な追加作業は不要。Section 1 の Initial commit に含まれていれば push 済みになっている。

---

## 4. GitHub Web UI で公開設定

### A. Public 化（無料の Pages を使う場合に必要）
- リポジトリ → **Settings** → 最下部 **Danger Zone** →
  **Change repository visibility** → **Public**。

### B. Pages 有効化
- Settings → 左メニュー **Pages**
- **Build and deployment**
  - Source：**Deploy from a branch**
  - Branch：**main** ／ フォルダ：**/(root)** → **Save**
- 1〜2分で公開URLが表示される：

```
https://{user}.github.io/{repo}/
```

---

## 5. 共有と確認

- 上記URLを共有すれば、**閲覧者はGitHubアカウント不要**で見られる。
- **シークレット/プライベートウィンドウ**（未ログイン状態）でURLを開き、
  - トップページ（`index.html`）が表示されるか
  - CSS（配色・フォント）・画像・SPのハンバーガーが正しく表示されるか
  を確認する。

---

## 6. 更新の反映

公開後にサイトを直したら、**commit → push するだけ**で Pages に自動反映される
（数十秒〜数分でURLに反映）。

---

## 7. 注意点

- **Public化＝リポジトリ内のコードも全公開**になる。機微情報（鍵・個人情報）は置かない。
- デモのサンプルデータ（氏名・所属など）は実在情報の扱いに注意。
- 公開を止めたい場合：Settings → Pages で無効化、または Settings で Private に戻す
  （無料プランでは Private 化で Pages は停止）。
