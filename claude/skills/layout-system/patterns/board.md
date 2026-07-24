# board.md

## 役割
要素を重ねて配置するレイアウト（position: relative / absolute）。  
画像の上にテキストやボタンを乗せる、バッジを角に置くなど。

## 判定
- 画像の上に文字やボタンを重ねたい → **Board**
- 画面端まで広げて重ねたい → **Bleed + Board（複合）**

## 構造図
```
┌────────────────────────────┐ ← board（position: relative）
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │   背面レイヤー（画像など）
│ ▓▓┌────────────────┐▓▓▓▓▓ │
│ ▓▓│ overlay         │▓▓▓▓▓ │   前面レイヤー（absolute）
│ ▓▓│ < h2 > < btn >  │▓▓▓▓▓ │
│ ▓▓└────────────────┘▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└────────────────────────────┘
```

## HTML構造
```html
<div class="board">
  <div class="board__layer board__layer--back">
    <picture>
      <img src="..." alt="..." loading="lazy">
    </picture>
  </div>
  <div class="board__layer board__layer--front">
    <!-- 重ねるコンテンツ -->
  </div>
</div>
```

## CSS指針
```css
.board { position: relative; }
.board__layer--front {
  position: absolute;
  inset: 0;                 /* 全面に重ねる場合 */
  display: flex;
  align-items: center;      /* 配置は用途に応じて */
  justify-content: center;
}
```

## 注意
- 親に必ず `position: relative` を付ける
- 重なり順が崩れる場合のみ `z-index` を使う（多用しない）
- 背面が画像なら可読性のためオーバーレイ（半透明の暗幕）を検討
- SP では重ね配置をやめて縦積み（rack）に切り替える場合がある → ブロックを分ける
