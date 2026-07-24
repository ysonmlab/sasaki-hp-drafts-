# tile.md

## 役割
列数を固定した均等グリッドレイアウト。  
常に3列、カレンダー、ギャラリーなど。display: grid 使用。

## 判定
- 複数アイテムを並べたい かつ 列数が固定 → **Tile**
- 数が不定で折り返したいだけなら → **Shelf**

## 構造図
```
PC（3列固定）
┌──────────────────────────────────────┐
│ [item] [item] [item]                 │
│ [item] [item] [item]                 │
│ [item] [item]                        │ ← 列数は常に3
└──────────────────────────────────────┘

SP（1〜2列）
┌──────────────────┐
│ [item] [item]    │
│ [item] [item]    │
└──────────────────┘
```

## HTML構造
```html
<ul class="tile">
  <li class="tile__item"></li>
  <li class="tile__item"></li>
  <li class="tile__item"></li>
</ul>
```

## CSS指針
```css
/* SP: 2列 */
.tile {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  list-style: none;
}

/* PC: 3列 */
@media (min-width: 768px) {
  .tile { grid-template-columns: repeat(3, 1fr); }
}
```

## 注意
- 列数が固定の時のみ使う（不定なら Shelf）
- `repeat(auto-fill, minmax(...))` で自動列数にもできるが、その挙動は Shelf に近い
- media query は SP → PC の順で列数を増やす
- 行の高さを揃えたい場合はアイテム側を `height: 100%`
