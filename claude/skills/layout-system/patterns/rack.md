# rack.md

## 役割
要素を垂直方向に積み上げる単純な縦積みレイアウト。  
flex-direction: column 使用。

## 判定
- 単純に縦に積むだけ → **Rack**

## 構造図
```
┌──────────────────┐
│ ┌──────────────┐ │
│ │  < block 1 > │ │
│ └──────────────┘ │
│       ↕ gap      │
│ ┌──────────────┐ │
│ │  < block 2 > │ │
│ └──────────────┘ │
│       ↕ gap      │
│ ┌──────────────┐ │
│ │  < block 3 > │ │
│ └──────────────┘ │
└──────────────────┘
```

## HTML構造
```html
<div class="rack">
  <div class="rack__item"></div>
  <div class="rack__item"></div>
  <div class="rack__item"></div>
</div>
```

## CSS指針
```css
.rack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
```

## 注意
- 縦の間隔は `gap` で取り、各要素の margin で稼がない
- 中央寄せが必要なら `align-items: center`
- SP で fluid / board を縦積みに切り替える際の受け皿としても使う
- 単純すぎて wrapper 不要なケースもある → 不要な div を増やさない
