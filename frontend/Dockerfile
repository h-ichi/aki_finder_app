# ベースイメージ
FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /app

# package.json と package-lock.json を先にコピーして依存関係をインストール
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリのソースをコピー
COPY . .

# Vite の開発サーバを起動
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
