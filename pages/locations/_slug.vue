<template lang="pug">
v-container.grey.lighten-4 
  section.ly_content_wrapper.mb-4 
    v-subheader
      //-   h1 {{ $route.params.slug }}
      h1.text-h3 {{ getLocationsNameById($route.params.slug) }}
    v-list.grey.lighten-4 
      v-list-item.d-flex.align-start(
        v-for='post in getPostsByLocaction($route.params.slug)',
        :key='post.id'
      ) 
        v-list-item-averter.py-2
          nuxt-link(:to='`/posts/${post.id}`')
            .averter-wrapper
              img(
                :src='post.image.url',
                width='100%',
                height='auto',
                alt='post.title'
              )

        v-list-item-content.ml-4
          v-list-item-title
            nuxt-link(:to='`/posts/${post.id}`') 
          v-list-item-subtitle 
            h2.text-h4 {{ post.stages.stageNo }}
              span.text-h4.ml-1 No.
              span.text-h4 {{ post.postNo }}
              span.text-h5.ml-1 {{ post.stages.year }}
          v-list-item-title 
            nuxt-link(:to='`/posts/${post.id}`')
              h1.text-h4.text-h1.el_ellipsis(
                :class='`headline font-weight-light mb-4 `'
              ) {{ post.title }}
            v-list-action-text.d-flex 
              span(v-for='postTag in post.tags', :key='postTag.id')
                nuxt-link(:to='`/tags/${postTag.id}`')
                  span.text-h6.mr-4 {{ postTag.tags }}

  .mt-4
    div(@click='$router.go(-1)')
    h3.blue--text Back
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['posts', 'locations', 'tags']),
    ...mapGetters(['getPostsByLocaction', 'getLocationsNameById']),
  },
}
</script>
<style lang="scss" scoped>
.averter-wrapper {
  width: 100px;
  @media (min-width: 600px) {
    width: 150px;
  }
  @media (min-width: 960px) {
    width: 200px;
  }
  @media (min-width: 1264px) {
    width: 200px;
  }
}
</style>
