# layout-system / SKILL.md

## レイアウト判定フロー
1. **画面端まで広げたい？**
   ├─ Yes → **Bleed**
   │   └─ 画像の上に文字やボタンを重ねたい？
   │       ├─ Yes → **Bleed + Board (複合使用)**
   │       └─ No → **Bleed**
   └─ No (コンテンツ幅内に収める)

2. **画像とテキストを横並びにしたい？**
   ├─ Yes → **Fluid** (2カラム・互い違い配置など)
   └─ No

3. **複数アイテムを並べたい？**
   ├─ Yes ─ **列数が固定？** (例: 常に3段、カレンダー等) → **Tile** (Grid使用)
   │   └─ **数は不定で折り返したい？** (例: タグ、カード) → **Shelf** (Flex-wrap使用)
   └─ No

4. **その他**
   ├─ 単純な縦積み → **Rack**
   └─ 特殊・未定義 → **Chest** (汎用コンテナ)

## パターン定義 (patterns/)
各ファイルには必ず「構造図（ASCIIアート）」を含めること。Claude Codeは図解を読み取り、HTML構造を一致させる。

- **bleed.md**: 画面幅100%（Hero/背景色セクション）
- **board.md**: 重ね配置（position: absolute/relative）
- **fluid.md**: 2カラム（画像/テキスト） ※flex推奨
- **shelf.md**: 柔軟な横並び（flex-wrap: wrap）
- **tile.md**: 均等グリッド（display: grid）
- **rack.md**: 垂直方向の積み上げ（flex-direction: column）
- **chest.md**: 自由度の高い汎用BOX