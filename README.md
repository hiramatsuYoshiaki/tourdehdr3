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

4. index.vue から呼び出してみる
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

5. 単一記事の取得方法を Vuex の posts から取得するように変更します
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

6.
7.
8.
9.
10.
