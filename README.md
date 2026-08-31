
# stormworks data hubについて
stormworksのすべての情報を網羅するサイトを作っていきます

リンク:https://ingenmame02.github.io/stormworks-data-hub/

ぼちぼちやっていきます

！！寄稿大歓迎です！！

# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### 多言語(日本語/英語)での開発について

Docusaurusの開発サーバー(`docusaurus start`)は**1つの言語だけ**を起動します(指定がなければ既定の`ja`)。そのため、ローカルの言語切り替えメニューで`English`を選んでもURLが`/en/`に変わるだけで**英語訳は表示されません**(日本語のまま)。英語ページも併せて表示されるのは本番環境(`docusaurus build`が全言語を生成する)だけです。

英語版を開発/確認するには、起動時に言語を指定してください。

```bash
# 日本語版だけを開発
npm run start:ja

# 英語版だけを開発
npm run start:en
```

本番と同じ「全ての言語が表示される」状態をローカルで確認したい場合は、ビルドして静的サーバーで配信してください。

```bash
npm run build
npm run serve
```


## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
