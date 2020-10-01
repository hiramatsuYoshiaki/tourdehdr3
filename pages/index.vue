<template lang="pug">
//- v-container.red.lighten-5 
v-container.grey.lighten-5 
  section.SC1 
    h1 section1

  //- v-carousel(
  //-   cycle,
  //-   width='100%',
  //-   height='600',
  //-   hide-delimiter-background,
  //-   hide-delimiters,
  //-   show-arrows,
  //-   show-arrows-on-hover
  //- )
  //-   v-carousel-item(
  //-     v-for='(post, i) in posts',
  //-     :key='i',
  //-     :src='post.image.url',
  //-     reverse-transition='fade-transition',
  //-     transition='fade-transition'
  //-   )
  //- .mt-8 
  //-   h1 Post Time Line

  //- v-timeline(dense)
  //- v-timeline
  //-   v-timeline-item(v-for='(post, i) in posts', :key='i', small)
  //-     template(v-slot:opposite)
  //-       span(
  //-         :class='`headline font-weight-bold `',
  //-         v-text='post.stages.stageNo'
  //-       )
  //-     .py-4
  //-       h1(:class='`headline font-weight-light mb-4 `') {{ post.stages.stageNo }}
  //-       h2(:class='`headline font-weight-light mb-4 `') {{ post.title }}
  //-       div {{ post.body }}
  //-       h3 {{ post.link }}
  //-       h3 {{ post.users.name }}
  //-       h3 {{ post.locations.locations }}
  //-       h3 {{ post.stages.stage }}
  //-       h3 {{ post.stages.title }}
  //-       div(v-for='tag in post.tags', :key='tag.id')
  //-         span.mr-4 {{ tag.tags }}
  //-       img(:src='post.image.url', width='300', height='200', alt='画像') 
  //-       div 
  //-         nuxt-link(:to='`/posts/${post.id}`')
  //-           h3 この投稿をみる
  //- v-divider
</template>
<script>
// import axios from 'axios'
import { mapState } from 'vuex'
export default {
  layout: 'fullscreenNav',
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
<style lang="scss" scoped>
.cs_wrapper {
  background-color: grey;
  border: 1px solid black;
}
.SC1 {
  width: 100vw;
  height: 200px;
  background-color: darkcyan;
}
</style>
