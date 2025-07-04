# 🌈 Rainbow Todo App

虹色のタスク管理アプリです。美しいレインボーグラデーションとアニメーションを使用したモダンなTodoアプリケーションです。

## 🚀 機能

- ✨ 美しいレインボーグラデーションデザイン
- 📝 タスクの追加・削除・完了管理
- 📊 タスク統計表示（総数・完了・未完了）
- 💾 ローカルストレージでデータ永続化
- 📱 レスポンシブデザイン
- 🎉 インタラクティブな通知システム

## 🌐 デモ

GitHub Pagesでライブデモを確認できます：
[https://ryota-murakami-system-exe-jp.github.io/ryota-murakami-0702/](https://ryota-murakami-system-exe-jp.github.io/ryota-murakami-0702/)

✅ **GitHub Pages設定完了** - GitHub Actionsによる自動デプロイが有効になりました！

## 🛠️ 技術スタック

- HTML5
- CSS3 (グラデーション、アニメーション)
- Vanilla JavaScript (ES6+)
- LocalStorage API

## 📦 デプロイ方法

このプロジェクトはGitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

### セットアップ手順

1. **リポジトリをGitHubにプッシュ**
   ```bash
   git add .
   git commit -m "Initial commit: Rainbow Todo App"
   git push origin main
   ```

2. **GitHub Pagesの設定**
   - GitHubリポジトリの「Settings」タブに移動
   - 左サイドバーの「Pages」をクリック
   - 「Source」で「GitHub Actions」を選択

3. **自動デプロイ**
   - `main`ブランチにプッシュすると自動的にデプロイされます
   - GitHub Actionsが`.github/workflows/deploy.yml`を実行します

### ローカル開発

```bash
# プロジェクトをクローン
git clone https://github.com/ryota-murakami-system-exe-jp/ryota-murakami-0702.git

# プロジェクトディレクトリに移動
cd ryota-murakami-0702

# rainbow-todo-appディレクトリでローカルサーバーを起動
cd rainbow-todo-app
python -m http.server 8000
# または
npx serve .
```

ブラウザで `http://localhost:8000` にアクセスしてアプリを確認できます。

## 📁 プロジェクト構造

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions設定
├── rainbow-todo-app/
│   ├── index.html             # メインHTMLファイル
│   ├── style.css              # スタイルシート
│   └── script.js              # JavaScript機能
└── README.md                  # このファイル
```

## 🎨 カスタマイズ

### 色の変更
`style.css`のグラデーション設定を変更することで、カラーテーマをカスタマイズできます：

```css
background: linear-gradient(135deg, 
    #ff6b6b 0%, 
    #ffa500 14%, 
    #ffff00 28%, 
    #32cd32 42%, 
    #00bfff 56%, 
    #4169e1 70%, 
    #8a2be2 84%, 
    #ff1493 100%);
```

### 機能の追加
`script.js`の`RainbowTodoApp`クラスを拡張して新しい機能を追加できます。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- 美しいグラデーションデザインにインスパイアされました
- モダンなWeb技術を活用したシンプルで効果的なUIを目指しました