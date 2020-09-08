<template lang="pug">
  div 
    div 
      h1 micro CMS Blog Test
    div 
      nuxt-link(to="/stages")
        h1 stages index
    div 
      nuxt-link(to="/tags")
        h1 tags index
    div 
      nuxt-link(to="/locations")
        h1 locations index
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
// import axios from 'axios'
import { mapState } from 'vuex'
export default {
  // async asyncData({ error, env }) {
  //   try {
  //     const { data } = await axios.get(
  //       'https://h-works.microcms.io/api/v1/blog',
  //       {
  //         headers: { 'X-API-KEY': process.env.API_KEY },
  //       }
  //     )
  //     return {
  //       contents: data.contents,
  //     }
  //   } catch (err) {
  //     error({
  //       statusCode: err.response.status,
  //       message: err.response.data.message,
  //     })
  //     console.log('error: ' + err)
  //   }
  // },
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
