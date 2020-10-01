<template lang="pug">
//- v-container.red.lighten-5 
v-container.grey.lighten-5 
  section.sl-wraper
    //- h1 section1 Carousel
    v-carousel(
      cycle,
      width='100%',
      height='600',
      hide-delimiter-background,
      hide-delimiters,
      show-arrows,
      show-arrows-on-hover
    )
      v-carousel-item(
        v-for='(post, i) in posts',
        :key='i',
        :src='post.image.url',
        reverse-transition='fade-transition',
        transition='fade-transition'
      )
    .mt-8 
  section.sl-wraper
    h1.text-h3.my-2 Time Line
    v-timeline(dense, align-top)
      v-timeline-item(v-for='(post, i) in posts', :key='i', small)
        template(v-slot:icon)
          //- span(
          //-   :class='`headline font-weight-bold `',
          //-   v-text='post.stages.stageNo'
          //- )
          //- span(:class='`headline font-weight-bold white`') {{ i + 1 }}
        .py-1
          h1(:class='`headline font-weight-light mb-4 `') {{ post.stages.stageNo }}
          h2(:class='`headline font-weight-light mb-4 `') {{ post.title }}
          .im-wrape 
            img(:src='post.image.url', width='100%', height='auto', alt='画像')
          .bodyArea.py-4.d-flex.justify-center 
            .bodyInner 
              p.postBody {{ post.body }}
              nuxt-link(:to='`/posts/${post.id}`')
                .text-right
                  span この投稿をみる
                  v-icon mdi-arrow-right
          //- h3 {{ post.link }}
          //- h3 {{ post.users.name }}
          //- h3 {{ post.locations.locations }}
          //- h3 {{ post.stages.stage }}
          //- h3 {{ post.stages.title }}
          //- div(v-for='tag in post.tags', :key='tag.id')
          //-   span.mr-4 {{ tag.tags }}
    v-divider
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
// * {
//   border: 1px solid lightgrey;
// }

.sl-wraper {
  // border: 1px solid red;
  width: 100%;
  overflow: hidden;
}
.im-wrape {
  margin-right: 30px;
  @media (min-width: 600px) {
    margin-right: 0;
  }
}
.postBody {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bodyArea {
  width: 100%;
  overflow: hidden;
}
.bodyInner {
  margin-right: auto;
  margin-left: 0;
  @media (min-width: 600px) {
    min-width: 400px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
