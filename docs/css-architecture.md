# css-architecture.md

CSS ファイルの構成と読み込み順のルール。
外部フレームワーク不使用（Vanilla CSS）。

このキットは **10ページ未満の小規模サイト**・**非エンジニアによるメンテナンス**を想定し、
CSS は **reset / common / ページ固有 の2層構成**にする（探す場所を最小にする）。

---

## ファイル構成

```
assets/css/
  ├ reset.css       … ブラウザ初期化（Josh Comeau's reset ベース・同梱／ほぼ触らない）
  ├ common.css      … サイト共通のすべて
  ├ index.css       … トップページ固有（sect-* のみ）
  ├ about.css       … about ページ固有
  └ …               … ページごとに 1 ファイル

ルート直下/
  ├ index.html      … 各HTMLはルート直下にフラットに置く
  ├ about.html
  └ …
```

> CSS・画像はすべて **相対パス**で参照する（最終納品はレンタルサーバーへのFTP配置のため）。
> 全HTMLがルート直下にあるので、参照は全ページ共通で `assets/css/...` / `assets/img/...`。

---

## common.css の役割（共通のすべてを集約）

サイト全体で共通のものは、すべて common.css に置く。1箇所を直せば全ページに反映される。

- **デザイントークン**：`:root` の配色・フォント変数（案件ごとに設定）
- **基本タイポグラフィ**：`body` のフォント・行間、見出し・リンクの基本スタイル
- **全ページ共通パーツ**：ヘッダー・フッター・グローバルナビなど毎ページ登場する要素
- **使い回す共通パーツ**：ボタン・カードなど複数ページで再利用する部品

> common.css 内はコメントで区切って整理する（例：`/* === tokens === */` `/* === header === */`）。
> ページ単体でしか使わない装飾は common.css に書かず、ページ固有CSSに書く。

---

## 読み込み順（重要）

`<head>` で必ず以下の順に読み込む。後勝ちの詳細度・上書き順を保つため。

```html
<head>
  <link rel="stylesheet" href="assets/css/reset.css">
  <link rel="stylesheet" href="assets/css/common.css">
  <link rel="stylesheet" href="assets/css/{page-name}.css">
</head>
```

順番の意味：

1. **reset** … 全ブラウザのデフォルトを揃える（最初）
2. **common** … サイト共通の土台・共通パーツ
3. **page固有** … `sect-*` スコープで最終調整（最後・最優先）

> パスは**相対指定**にする。全HTMLがルート直下にあるため、どのページからも `assets/...` で統一できる。
> 相対パスならローカルで `file://` で直接開いても、サーバーにFTP配置しても同じく解決する。

---

## スコープと責務

| レイヤー | 責務 | 主に触る人 |
|---|---|---|
| reset | ブラウザ初期化 | 原則固定（差し替え時のみ） |
| common | サイト共通の土台・共通パーツ | 案件初期に設定／共通変更時 |
| page固有（`sect-`） | そのページ/セクション限定 | 各ページ実装・修正時 |
| 状態（`is-`） | JSで付与する状態 | 実装時 |

---

## 絶対ルール（CLAUDE.md 準拠）

- ページ固有CSSは `.pg-{page} .sect-{name}` スコープ内に閉じる
- common.css の共通パーツと詳細度で競合させない
- media query は **SP → PC** の順
- flex / grid ベース、float は原則禁止
- 画像は `loading="lazy"` ＋ `alt` 必須

---

## reset.css について

- CDN リンクではなく、プロジェクト内に同梱（ベンダリング）する
- ベースは Josh Comeau's Modern CSS Reset
- 差し替える場合もこのパス・読み込み順を維持する
