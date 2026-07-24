# layout-design-spec.md

デザインカンプ（PDF / JPG / PNG）から  
`page-{page-name}.md` を生成するための記法・ルール集。

Claude Code はこのドキュメントに従って、  
レイアウト設計書を出力する。

---

## 出力ファイル

`design/page-{page-name}.md`

---

## 記法

| 記号 | 意味 |
|---|---|
| `┃` | section / department |
| `⟦⟧` | コンテナ・zone・lane |
| `{}` | wrapper |
| `[]` | item |
| `<>` | HTML要素 |
| `()` | 補足情報 |
| `---` | 区切り |
| `,` | 縦並び |
| `/` | 横並び |

---

## section

- `┃ section :` → コンテンツセクション
- `┃ department :` → 補助ブロック

例：

    ┃ section : hero
    ┃ department : prelude

---

## wrapper

- `{ fluid : }` → 画像＋テキスト
- `{ shelf : }` → 横並びカード
- `{ tile : }` → 均等グリッド
- `{ board : }` → 重ね配置
- `{ rack : }` → 縦積み
- `{ chest : }` → 汎用コンテナ

使用判断は：

`claude/skills/layout-system/SKILL.md`

を参照する。

---

## HTML要素

    < h2 : title >
    < p : text >
    < img : assets/img/top-hero_pht1.jpg (alt="hero image") >

---

## 命名規則

section:

`sect-{section-name}`

画像:

`{section-name}_{image-type}{number}.{ext}`

---

## 画像種別

| 種別 | 用途 |
|---|---|
| `pht` | 写真 |
| `bg` | 背景 |
| `pic` | 図版 |
| `ttl` | タイトル |
| `txt` | テキスト画像 |
| `logo` | ロゴ |
| `icon` | アイコン |

---

## レイアウト記述ルール

- 使用レイアウトは `SKILL.md` を参照する
- SP / PC でレイアウトや表示順が異なる場合はブロックを分ける

---

## 画像ルール

- 画像は lazy load を前提として記述する
- 画像は `<picture>` を優先使用する

---