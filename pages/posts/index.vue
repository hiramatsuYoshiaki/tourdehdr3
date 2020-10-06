<template lang="pug">
v-container.grey.lighten-4
  section.ly_content_wrapper.mb-4
    v-list.grey.lighten-4 
      v-subheader 
        h1.text-h3 Post List
      v-list-item.py-2.d-flex.align-start(
        v-for='(post, i) in posts',
        :key='post.id'
      )
        v-list-item-averter.pt-2
          nuxt-link(:to='`/posts/${post.id}`')
            .averter-wrapper
              img(
                :src='post.image.url',
                width='100%',
                height='auto',
                alt='post.title'
              )
        v-list-item-content.ml-4 
          v-list-item-subtitle 
            h2.text-h5 {{ post.stages.stageNo }}
          v-list-item-title 
            nuxt-link(:to='`/posts/${post.id}`')
              h1.text-h4.text-h1.el_ellipsis(
                :class='`headline font-weight-light mb-4 `'
              ) {{ post.title }}
          v-list-action-text.d-flex 
            nuxt-link(:to='`/locations/${post.locations.id}`')
              span.text-h6.mr-4 {{ post.locations.locations }}
            span(v-for='tag in post.tags', :key='tag.id')
              nuxt-link(:to='`/tags/${tag.id}`')
                span.text-h6.mr-4 {{ tag.tags }}

          v-spacer
          v-list-item-icon 
            v-icon mid-arrow-right

    //- p {{ posts }}

  .mt-4 
    nuxt-link(to='/')
      h3 Back
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['posts']),
  },
}
</script>
<style lang="scss" scoped>
// * {
//   border: 1px solid rgba(0, 0, 0, 0.3);
// }
.averter-wrapper {
  width: 100px;
  @media (min-width: 600px) {
    width: 200px;
  }
  @media (min-width: 960px) {
    width: 300px;
  }
  @media (min-width: 1264px) {
    width: 400px;
  }
}
</style>
