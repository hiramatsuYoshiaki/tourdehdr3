<template lang="pug">
//- v-container.grey.lighten-5(fluid) 
v-container.grey.lighten-5
  h1.text-h3.my-2 NEW POST
  section.ly_section_wrapper
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
        v-for='(post, i) in posts.slice(0, 2)',
        :key='i',
        :src='post.image.url',
        reverse-transition='fade-transition',
        transition='fade-transition'
      )
    .mt-8 
  section.ly_section_wrapper 
    h1.text-h3.my-2 TIME LINE
    v-timeline(dense, align-top)
      v-timeline-item(v-for='(post, i) in posts.slice(0, 5)', :key='i', small)
        template(v-slot:icon)
        .py-1
          h2.text-h4(:class='`headline font-weight-light mb-4 `') {{ post.stages.stageNo }}
            span.text-h4.ml-1(:class='`headline font-weight-light mb-4 `') No.
            span.text-h4(:class='`headline font-weight-light mb-4 `') {{ post.postNo }}
            span.text-h5.ml-1(:class='`headline font-weight-light mb-4 `') {{ post.stages.year }}
          nuxt-link(:to='`/posts/${post.id}`')
            h1.text-h3(:class='`headline font-weight-light mb-4 `') {{ post.title }}
          v-card(flat, max-width='600')
            nuxt-link(:to='`/posts/${post.id}`')
              v-img(
                :src='post.image.url',
                width='100%',
                height='auto',
                :alt='post.title'
              )
            v-card-text
              nuxt-link(:to='`/locations/${post.locations.id}`')
                h5.text-h5.mr-4 {{ post.locations.locations }}
              div
                span(v-for='tag in post.tags', :key='tag.id')
                  nuxt-link(:to='`/tags/${tag.id}`')
                    span.text-h5.mr-4 {{ tag.tags }}
            v-card-actions.grey.lighten-4
              v-btn(color='orange lighten-2', text) 
                h5.text-h5 Detail
              v-spacer
              v-btn(icon, @click='sw(i)')
                v-icon {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
            v-expand-transition
              .grey.lighten-4(v-show='post.isShow')
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
  methods: {
    sw(idx) {
      this.$store.commit('cg', idx)
    },
  },
}
</script>
<style lang="scss" scoped></style>
