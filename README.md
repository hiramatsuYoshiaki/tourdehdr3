# micro-cms-test

```
$ npx create-nuxt-app micro-cms-test
```

create-nuxt-app v3.2.0
✨ Generating Nuxt.js project in micro-cms-test
? Project name: micro-cms-test
? Programming language: JavaScript
? Package manager: Npm
? UI framework: Vuetify.js
? Nuxt.js modules: Axios
? Linting tools: ESLint, Prettier
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Server (Node.js hosting)
? Development tools: jsconfig.json (Recommended for VS Code if you're not using typescript)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## 1.pug インストール

https://qiita.com/amishiro/items/38fe1b102d7e91a93ada

```
// pug
$ npm i pug pug-loader pug-plain-loader

```

## 2.css プロパティ

1. nuxt.config 　 setting

```
export default {
  css: [
    // プロジェクト内の SCSS ファイル
    '@/assets/sass/styles.scss'
  ]
}
```

2. component style setting

```
    <style scoped lang="scss">
    </style>
```

## 3.SASS 変数を vue ファイルで使う

1. nuxt.config setting

```
vuetify: {
    customVariables: ['~/assets/sass/variables.scss'],
  },
```

###　 micrCMS の使い方　
https://microcms.io/blog/getting-started/

1. microCMS のアカウントを作成してログインして下さい。
2. サービス →API→ コンテンツと順に作成
3. API の作成　
   3-1 api 情報を入力
   3-2 api の型を選択
   3-3- api スキーマ-を定義
4. コンテンツ管理画面の画面右上の「追加」ボタンを押し入力して、その後「公開」ボタンを押します。
5. API 経由でデータを取得
   5-1 コンテンツ画面の右上にある「API プレビュー」をクリックする。
   5-2 画面内の「取得」ボタンを押し、JSON レスポンスがし、されることを確認する。

6. api-key を確認
   6-1 API リファレンスタブを押して、X-API-KEY を表示して確認する。

7. ブラウザでデータを表示

```
template lang="pug">
  div
    div
      h1 micro CMS Blog Test
    div
      h3 Blog Content
      ul
        li(v-for="content in contents" :key="content.id")
           h1 {{ content.title}}
           h5 {{ content.body}}
           h3 {{ content.link}}
           img(:src="content.image.url" width="300" height="200" alt="画像" )
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      contents: [],
    }
  },
  async asyncData() {
    const { data } = await axios.get(
      'https://h-works.microcms.io/api/v1/blog',
      {
        headers: { 'X-API-KEY': 'your-api-key' },
      }
    )
    return {
      contents: data.contents,
    }
  },
}
</script>
```

### Nuxt.js と microCMS で採用ページを作成してみよう！

https://microcms.io/blog/create-nuxt-microcms-recruit/

1. Nuxt.js プロジェクトのセットアップ

```
$ npx create-nuxt-app micro-cms-test
```

2. .env ファイルを作成する
   ルートディレクトリ直下、nuxt.config.js と同じ階層に.env ファイルを作成する。
   各 API は、microCMS の Web サイトのヘッダーメニュー「ＡＰＩリファレンス」>>「表示」より参照する。
   `.env`

```
 API_KEY='********-****-****-****-********fc14'
```

3. Git の管理下から除外する
   `.gitignore`

```
# dotenv environment variables file
.env
```

4. 環境変数を扱う dotenv をインストールする

```
  $ npm install --save @nuxtjs/dotenv

```

5. dotenv のセットアップ
   @nuxtjs/dotenv をモジュールに追加する。
   dotenv モジュールを使って
   .env ファイルを読み込むコード`require('dotenv').config()`を
   export default 前に記入する。
   `nuxt.config.js`

```
  require('dotenv').config() // 追記
  export default {
  modules: [
    '@nuxtjs/dotenv'　// 追記
  ],
}
```

5. .env ファイルの環境変数を Nuxt に登録する
   `nuxt.config.js`

```
  env: {
    API_KEY: process.env.API_KEY,
  },
```

### Nuxt.js】middleware を活用しブログ記事取得のパフォーマンスを改善する

参考：独学プログラム 　
https://blog.cloud-acct.com/posts/blog-nuxtjs-middleware

1. Vuex を使う  
   store/index.js を作り action 経由で非同期で、microCMS のＡＰＩを取得し、state へ保存します。
   `store/index.js`

```
import axios from 'axios'
// state
export const state = () => ({
  posts: [],
})
// mutation
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
}
// actions
export const actions = {
  async getPosts({ commit }) {
    await axios
      .get('https://h-works.microcms.io/api/v1/blog', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        commit('setPosts', res.data.contents)
      })
      .catch((err) => {
        console.log(`Error! HTTP Status: ` + err)
      })
  },
}
```

2.middleware からＡＰＩを取得します。
`middleware/getMicrocms.js`

```
export default async ({ store }) => {
  if (!store.state.posts.length) await store.dispatch('getPosts')
}
```

基本的に、middleware は全てのページを表示する前に実行されます。
そこで、記事が存在しないときだけリクエストを投げるように、if (!store.state.posts.length)という条件分岐をしています。

3. nuxt.config.js に middleware を登録する
   `nuxt.config.js`

```
export default {
  router: {
    middleware: [
      'getMicrocms'
    ]
  },
}
```

4. store でポストデーターを読み込む。
   `store/index.js`

```
import axios from 'axios'
// state
export const state = () => ({
  posts: [],
})
// mutation
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
}
// actions
export const actions = {
  async getPosts({ commit }) {
    await axios
      .get('https://h-works.microcms.io/api/v1/blog', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        commit('setPosts', res.data.contents)
        // console.log(res.data.contents)
      })
      .catch((err) => {
        console.log(`Error! HTTP Status: ` + err)
      })
  },
}
```

5. index.vue から呼び出してみる
   `pages/index.vue`

```
<template lang="pug">
  div
    div
      h1 micro CMS Blog Test
    div
      h3 Blog list
      ul
        li(v-for="post in posts" :key="post.id")
            nuxt-link( :to="`/posts/${post.id}`")
              h1 {{ post.title}}
            div
              h3 {{ post.body}}
              h3 {{ post.link}}
              h3 {{ post.users.name}}
              h3 {{ post.locations.locations}}
              h3 {{ post.stages.stage}}
              h3 {{ post.stages.title}}
              div(v-for="tag in post.tags" :key="tag.id")
                span.mr-4 {{tag.tags}}
              img(:src="post.image.url" width="300" height="200" alt="画像" )
      div.mt-8 {{posts}}
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      contents: [],
    }
  },
  computed: {
    ...mapState(['posts']),
  },
}
</script>
```

6. 単一記事の取得方法を Vuex の posts から取得するように変更します
   `pages/posts/_slug.vue`

```
<template lang="pug">
div
    h1 posts/_slug.vue
    h3 param: {{ $route.params.slug }}
    div.mt-4
        h3
            span {{ contents.stages.stage}}
            span  {{ contents.stages.title}}
        div
            span.mr-2 場所：
            span {{ contents.locations.locations}}
        div
            span.mr-2 Tags:
            span(v-for="tag in contents.tags" :key="tag.id")
                span.d-inline-block.mr-2 {{tag.tags}}
        h1 {{contents.title}}
        h3 {{ contents.body}}
        h3 {{ contents.link}}
        img(:src="contents.image.url" width="300" height="200" alt="画像" )
        h3 {{ contents.users.name}}
    div.mt-4
        h5 {{contents}}
    div.mt-4
        nuxt-link(to="/")
            h3 Home
</template>
<script>
// import axios from 'axios'
export default {
  async asyncData({ payload, store, params, error }) {
    const currentPost =
      payload ||
      (await store.state.posts.find((post) => post.id === params.slug))
    if (currentPost) {
      return { contents: currentPost }
    } else {
      return error({ statusCode: 400 })
    }
  },
  //   async asyncData({ error, route, params }) {
  //     try {
  //       const { data } = await axios.get(
  //         `https://h-works.microcms.io/api/v1/blog/${route.params.slug}`,
  //         {
  //           headers: { 'X-API-KEY': process.env.API_KEY },
  //         }
  //       )
  //       return {
  //         contents: data,
  //       }
  //     } catch (err) {
  //       error({
  //         statusCode: err.response.status,
  //         message: err.response.data.message,
  //       })
  //     }
  //   },
  data() {
    return {
      contents: [],
    }
  },
}
```

6. Nuxt.js × Contentful】カテゴリー記事一覧ページを作成する
   https://blog.cloud-acct.com/posts/blog-related-posts

ポストからカテゴリーをすべて取得する。
`pages/index.vue`

```
// mutation
export const mutations = {

  setLink(state, payload) {
    state.stages = []
    state.tags = []

    payload.map((post) => {
      const entory = post
      // stage store
      if (entory.stages) {
        const dataStages = state.stages.find((stg) => {
          return stg.id === entory.stages.id
        })
        if (!dataStages) {
          // state.stages.push(post.stages)
          state.stages.push(entory.stages)
        }
      }
      // locations
      if (entory.locations) {
        const dataLocations = state.locations.find((loc) => {
          return loc.id === entory.locations.id
        })
        if (!dataLocations) {
          state.locations.push(entory.locations)
        }
      }
      // tag store
      if (entory.tags) {
        entory.tags.map((tagsTag) => {
          const dataTags = state.tags.find((tag) => {
            return tag.id === tagsTag.id
          })
          if (!dataTags) {
            state.tags.push(tagsTag)
          }
        })
      }
    })
    state.stages.sort((a, b) => a.sort - b.sort)
    state.tags.sort((a, b) => a.sort - b.sort)
    state.locations.sort((a, b) => a.sort - b.sort)

  },
```

カテゴリーを表示する
`stages/index.vue `

```
<template lang="pug">
div
    div.mt-4
        h1 stage index.vue
    div.mt-4
        div(v-for="stage in stages" :key="stage.id")
            nuxt-link(:to="`/stages/${stage.id}`")
                h3
                    span.mr-2 {{stage.stageNo}}
                    span.mr-2 {{stage.title}}
                    span.mr-2 {{stage.id}}
            div(v-for="post in posts" :key="post.id")
                div.ml-4(v-if="stage.id === post.stages.id")
                    nuxt-link(:to="`/posts/${post.id}`")
                        h5
                            span.mr-2 {{post.title}}
                            span.mr-2 paost:{{post.id}}
                            span.mr-2 stage:{{post.stages.id}}
    div.mt-4
        h3 {{stages}}
    div.mt-4
        h3 {{posts}}
    div.mt-4
        nuxt-link(to="/")
            h3 Home
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['posts', 'stages']),
  },
}
</script>

```

### Nuxt.js の generate プロパティに動的なルーティングを追加する

https://blog.cloud-acct.com/posts/blog-nuxtjs-generate-routes

# GitHub

## GitHub リポジトリの作成

1. GitHub ログイン後のトップページから、Repositories の New ボタンをクリックします。
2. Create a new repository の画面に遷移するので、リポジトリ名、ライセンス等を入力。Initialize this repository with a README はチェックせず画面下のほうにある Create repository ボタンをクリックします。

## プロジェクトを GitHub に Push する

1. git add -A
2. git commit -m "first commit"
3. git remote add origin https://github.com/hiramatsuYoshiaki/プロジェクト名
4. git push -u origin master

## 現在のブランチから派生ブランチを作成して GitHub へ Push する。

1. git branch new-branch
2. git checkout new-branch
3. git branch
   - new-branch
     master
4. git add -A
5. git commit -m 'new branch commit'
6. git push --set-upstream origin new-branch
   (もしくは、　 git push -u origin new-branch)

## GitHub リポジトリを clone してローカルプロジェクト作る

1. リモートリポジトリを clone する。

```
    git clone https://github.com/hiramatsuYoshiaki/nuxt-univ-create-gae-hosting.git
```

2. インストールする

```
    npm install
```

3. サーバーを立ち上げて確認

```
   npm run dev
```

4. ローカルサーバーへアクセス

```
   http://localhost:3000/で確認する。
```

## ローカルプロジェクトを GitHub へ push する。

```
1. 現在のブランチを確認する。
   git branch
   * master
```

2. master から新しい branch を作る

```
　　git branch new-branch
```

3. 新しい branch に移動し開発を行う。

```
   git checkout new-branch
```

4. clone したリポジトリから別のリモートリポジトリの URL を変更する場合

```
    git remote -v
    origin  https://github.com/hiramatsuYoshiaki/vue-cli3-unit.git (fetch)
    origin  https://github.com/hiramatsuYoshiaki/vue-cli3-unit.git (push)
    git remote rm originで現在のリモートリポジトリを削除する
    git remote add originで新しいリモートリポジトリを追加する
    git remote add origin https://github.com/hiramatsuYoshiaki/vue-cli3-unit-alprime.git
```

5. コミットして GitHub に push する

```
   git add　-A
   git commit -m "コメント"
   git push -u origin new-branch
```

# ファイルをホスティングする

https://microcms.io/blog/microcms-nuxt-jamstack-blog/

ブログの機能としてはまだまだですが、一旦ホスティングまでやってしまいましょう。
ホスティング先として今回は Netlify を利用します。
Netlify を利用するためには GitHub 連携が必要なので、今までの作業内容を GitHub に push しましょう。
まず、GitHub でリポジトリを作成します。
PUSH します。
Netlify にログインします。（未登録の方は Signup お願いします）
new site from git ボタンからサイトを新規作成します。
ビルドコマンド、デプロイ先は下記のように設定します。

```
Basic build settings

Build Command: nuxt generete
Publish directory: dist
```

以上で Netlify と GitHub が連携してビルドが開始されます。
ビルドが完了したら、Netlify にホスティングされます。

# microCMS と Netlify を連携する

https://microcms.io/blog/microcms-nuxt-jamstack-blog/

次は、microCMS のコンテンツを変更したら Netlify のビルドが走るようにします。
API 設定 > Webhook から Netlify を選択します。
追加ボタンを押す

Netlify の Webhook を用意します。
Netlify 側の Settings > Build & deploy > Build hooks から設定可能です。
`Build hooks`

```
Build hooks

build hooks name: micro CMS
branch to build: master
```

save ボタンを押す
`Build hooks`

```
Build hooks

micro CMS: https//api.netlify.com/build_hooks/abcdefg123456789
```

作成するとエンドポイントが割り当てられます。

これを microCMS 側の Webhook 設定に入力し保存します。
`api設定`

```
Webhook
Netlify

NetlifyのBuild hooks設定で取得できるURLを入力してください。コンテンツの更新をトリガーとしてPOSTリクエストを送信します。
https//api.netlify.com/build_hooks/abcdefg123456789
通知をするタイミングを設定してください。
*コンテンツの公開時
 コンテンツの下書き保存時
*コンテンツの削除時
 APIの設定変更時
 APIの削除時
```

以上で連携完了になります。
microCMS 側でコンテンツを作成して、Netlify に反映されるか試してみましょう。
反映されれば Jamstack 構成の完成です！
