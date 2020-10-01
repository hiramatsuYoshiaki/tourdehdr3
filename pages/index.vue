<template lang="pug">
//- v-container.grey.lighten-5(fluid) 
v-container.grey.lighten-5
  //- section.sl-wraper
  //-   v-carousel(
  //-     cycle,
  //-     width='100%',
  //-     height='600',
  //-     hide-delimiter-background,
  //-     hide-delimiters,
  //-     show-arrows,
  //-     show-arrows-on-hover
  //-   )
  //-     v-carousel-item(
  //-       v-for='(post, i) in posts',
  //-       :key='i',
  //-       :src='post.image.url',
  //-       reverse-transition='fade-transition',
  //-       transition='fade-transition'
  //-     )
  //-   .mt-8 
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
          nuxt-link(:to='`/posts/${post.id}`')
            h2(:class='`headline font-weight-light mb-4 `') {{ post.title }}
          v-card(flat, max-width='600')
            nuxt-link(:to='`/posts/${post.id}`')
              v-img(
                :src='post.image.url',
                ,
                width='100%',
                height='auto',
                :alt='post.title'
              )
            //- v-card-title
            //-   span {{ post.locations.locations }}
            //- v-card-subtitle 
            //-   span {{ post.stages.stageNo }}
            v-card-text.d-flex 
              nuxt-link(:to='`/locations/${post.locations.locations}`')
                span.mr-4 {{ post.locations.locations }}
              span(v-for='tag in post.tags', :key='tag.id')
                nuxt-link(:to='`/tags/${tag.tags}`')
                  span.mr-4 {{ tag.tags }}
            v-card-actions
              v-btn(color='orange lighten-2', text) Detail
              v-spacer
              v-btn(icon, @click='show = !show')
                v-icon {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
            v-expand-transition
              .grey.lighten-4(v-show='show')
                v-divider
                v-card-title
                  span {{ post.title }}
                v-card-subtitle 
                  span {{ post.stages.stageNo }}
                v-card-text
                  span {{ post.body }}
                v-card-text.text-right
                  span {{ post.users.name }}
                v-card-actions.grey.lighten-2
                  v-btn(color='orange lighten-2', text) 
                    h2 TOURdeHDR+
                  v-spacer
                    v-btn(icon, :href='post.link', target='_black')
                      v-icon mdi-chevron-right
      </div>
    </v-expand-transition>
      //- .im-wrape 
      //-   img(:src='post.image.url', width='100%', height='auto', alt='画像')
      //- .bodyArea.py-4.d-flex.justify-center 
      //-   .bodyInner 
      //-     p.postBody {{ post.body }}
      //-     nuxt-link(:to='`/posts/${post.id}`')
      //-       .text-right
      //-         span この投稿をみる
      //-         v-icon mdi-arrow-right
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
      show: false,
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
// .im-wrape {
//   margin-right: 30px;
//   @media (min-width: 600px) {
//     margin-right: 0;
//   }
// }
// .postBody {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
// .bodyArea {
//   width: 100%;
//   overflow: hidden;
// }
// .bodyInner {
//   margin-right: auto;
//   margin-left: 0;
//   @media (min-width: 600px) {
//     min-width: 400px;
//     margin-right: auto;
//     margin-left: auto;
//   }
// }
</style>
