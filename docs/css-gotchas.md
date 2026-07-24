# css-gotchas.md

実装でつまずきやすい横断的な落とし穴と対処。  
プロジェクトをまたいで使える知見を集約する。  
（案件固有の事例は各 `logs/PATTERNS.md` に残す。ここはその一般化版。）

---

## 1. `position:fixed` の基準が祖先に乗っ取られる

`transform` / `filter` / `backdrop-filter` / `will-change` / `contain` を持つ要素は、
その子孫の `position:fixed` の**包含ブロック**になる（ビューポート基準でなくなる）。

- 症状：全画面に広げたい fixed 要素が、祖先の矩形分しか伸びない／位置がずれる。
- 例：frosted-glass ナビ（`backdrop-filter`）の中に置いたドロワーが、バー高さ分しか表示されない。
- 対処：
  - 高さは `bottom:0` ではなく **`height:100dvh`（fallback `100vh`）** で明示する。
  - もしくは fixed 要素を、その祖先の**外（DOM上の兄弟）** に出す（例：scrim は nav の外に置く）。

---

## 2. `overflow(-x):hidden` の下では `sticky` が効かないことがある

祖先（`body` / ラッパー）に `overflow-x:hidden` 等があると、`position:sticky` が
一部端末（特にモバイル）で機能せず、スクロール時に要素が流れて消える。

- 対処：常時表示したいグローバルナビ等は **`position:fixed`** にする。
  - fixed 化でフロー上の高さが消えるため、必要なら後続コンテンツに上余白を補う。

---

## 3. `background-attachment:fixed` はモバイルで不安定

パララックス風の固定背景は iOS 等でカクつく／効かない。

- 対処：**SP は `scroll`、PC で `fixed`** に切り替える（media query で分岐）。

---

## 4. フルワイド（bleed）は `100vw` を使わない

`width:100vw` は**スクロールバーの幅を含む**ため、横スクロールが出てはみ出す。

- 対処：親を画面幅にして子は **`width:100%`** で広げる。

---

## 5. その他の共通ルール（再掲）

- media query は **SP → PC** の順で記述する。
- JS で付与する状態は **`is-`** プレフィックス（`is-open` / `is-scrolled` など）。
- 装飾目的の要素・アイコンには **`aria-hidden="true"`**、画像には `alt` 必須。
- 開閉トグル等は `button` 要素＋`aria-expanded` / `aria-controls` / `aria-label` を付ける。
