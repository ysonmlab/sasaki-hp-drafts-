# shelf.md

## 役割
数が不定のアイテムを横並びにし、はみ出たら折り返すレイアウト。  
タグ、カード一覧など。flex-wrap 使用。

## 判定
- 複数アイテムを並べたい かつ 数は不定で折り返したい → **Shelf**
- 列数が固定なら → **Tile**

## 構造図
```
┌──────────────────────────────────────┐
│ [item] [item] [item] [item] [item]   │ ← 入りきったら
│ [item] [item] [item]                 │ ← 自動で折り返し
└──────────────────────────────────────┘
   ※ アイテム幅は固定 or min-width、隙間は gap
```

## HTML構造
```html
<ul class="shelf">
  <li class="shelf__item"><!-- card等 --></li>
  <li class="shelf__item"></li>
  <li class="shelf__item"></li>
</ul>
```

## CSS指針
```css
.shelf {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  list-style: none;
}
.shelf__item {
  flex: 1 1 240px;     /* 最低240px、余れば伸びる */
  /* 折り返し時に左揃えを保ちたいなら flex-grow を 0 にする */
}
```

## 注意
- 列数を固定したいケースは Tile（grid）を使う
- アイテム数が常に一定なら Tile の方が整列が安定する
- `gap` で間隔を取り、margin で隙間調整しない
- 最終行の余りアイテムの伸び方は `flex-grow` で制御
