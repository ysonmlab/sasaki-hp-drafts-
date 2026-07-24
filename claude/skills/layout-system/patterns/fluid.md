# fluid.md

## 役割
画像とテキストを横並びにする2カラムレイアウト。  
互い違い（左右反転）配置にも対応。flex 推奨。

## 判定
- 画像とテキストを横並びにしたい → **Fluid**

## 構造図
```
PC（横並び）
┌──────────────────────────────────────┐
│ ┌──────────────┐  ┌──────────────┐ │
│ │              │  │ < h2 >        │ │
│ │   < img >    │  │ < p >         │ │
│ │              │  │ < btn >       │ │
│ └──────────────┘  └──────────────┘ │
└──────────────────────────────────────┘

SP（縦積み）
┌──────────────────┐
│ ┌──────────────┐ │
│ │   < img >    │ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │ < h2 > < p > │ │
│ └──────────────┘ │
└──────────────────┘
```

## HTML構造
```html
<div class="fluid">
  <div class="fluid__media">
    <picture><img src="..." alt="..." loading="lazy"></picture>
  </div>
  <div class="fluid__body">
    <h2>...</h2>
    <p>...</p>
  </div>
</div>
```

## CSS指針
```css
/* SP: 縦積み */
.fluid { display: flex; flex-direction: column; gap: 24px; }

/* PC: 横並び */
@media (min-width: 768px) {
  .fluid { flex-direction: row; align-items: center; }
  .fluid__media,
  .fluid__body { flex: 1; }
}

/* 互い違い（偶数行を反転） */
@media (min-width: 768px) {
  .fluid--reverse { flex-direction: row-reverse; }
}
```

## 注意
- media query は **SP（縦積み）→ PC（横並び）** の順
- 反転は `flex-direction: row-reverse` または modifier クラスで制御
- カラム比を変える場合は `flex: 2` / `flex: 1` 等で調整
