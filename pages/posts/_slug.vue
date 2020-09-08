<template lang="pug">
div 
    h1 posts/_slug.vue 
    h3 param: {{ $route.params.slug }}
    div.mt-4
        h3 
            span {{ contents.stages.stageNo}}
            span  {{ contents.stages.title}} 
        div 
            span.mr-2 場所：
            span {{ contents.locations.locations}}
        div 
            span.mr-2 Tags:
            span(v-for="tag in contents.tags" :key="tag.id")
                span.d-inline-block.mr-2 {{tag.tags}}
        h1 {{contents.title}}
        h3 {{ contents.body }}
        h3 {{ contents.link}}
        img(:src="contents.image.url" width="300" height="200" alt="画像" )
        h3 {{ contents.users.name}} 
    div.mt-4 
        h5 {{contents}}
    div.mt-4(@click="$router.go(-1)") 
        h3.blue--text Back
    //- div.mt-4 
    //-     nuxt-link(to="/")
    //-         h3 Home
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
</script>
