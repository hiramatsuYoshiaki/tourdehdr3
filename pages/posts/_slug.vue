<template lang="pug">
//- v-container.blue-grey.darken-4(fluid)
v-container.grey.darken-4(fluid)
  //-   h3 param: {{ $route.params.slug }}
  section.ly_section_wrapper.mb-4.mt-8
    v-card.mx-auto(flat, max-width='600', dark) 
      v-img(
        :src='contents.image.url',
        width='100%',
        height='auto',
        :alt='contents.title'
      ) 
      v-card-title
        h3.text-h3 {{ contents.stages.title }}
      v-card-subtitle 
        h5.text-h5 {{ contents.stages.stageNo }}
          span.text-h5.ml-1 No.
          span.text-h5 {{ contents.postNo }}
          span.text-h6.ml-1 {{ contents.stages.year }}
      v-card-text.d-flex 
        nuxt-link(:to='`/locations/${contents.locations.id}`')
          span.mr-4 {{ contents.locations.locations }}
        span(v-for='tag in contents.tags', :key='tag.id')
          nuxt-link(:to='`/tags/${tag.id}`')
            span.mr-4 {{ tag.tags }}
      v-card-text
        p {{ contents.body }}
      v-card-text.text-right
        h5 {{ contents.users.name }}

    .mt-4(@click='$router.go(-1)') 
      h3.blue--text BACK
</template>
<script>
// import axios from 'axios'
export default {
  layout: 'fullscreenNav',
  async asyncData({ payload, store, params, error }) {
    // console.log('Payload------------')
    // console.log( payload )
    const currentPost =
      payload ||
      (await store.state.posts.find((post) => post.id === params.slug))
    // console.log('currentPost------------')
    // console.log(currentPost)
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
