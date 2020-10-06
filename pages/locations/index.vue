<template lang="pug">
v-container.grey.lighten-4 
  section.ly_content_wrapper.mb-4
    v-list.grey.lighten-4 
      v-subheader 
        h1.text-h3 Location List
      v-list-item.py-1(v-for='(location, i) in locations', :key='location.id') 
        v-list-item-title
          .d-flex
            nuxt-link(:to='`/locations/${location.id}`') 
              h3.text-h3 {{ location.locations }}
            v-spacer
              v-btn(icon, @click='isOpen(i)')
                v-icon {{ location.isShow ? "mdi-chevron-up" : "mdi-chevron-down" }}
          v-list-item-group.d-flex.align-start(
            v-for='post in getPostsByLocaction(location.id)',
            :key='post.id'
          ) 
            v-list-item-averter.py-2(v-show='location.isShow')
              nuxt-link(:to='`/posts/${post.id}`')
              .averter-wrapper
                img(
                  :src='post.image.url',
                  width='100%',
                  height='auto',
                  alt='post.title'
                )

            v-list-item-content.ml-4(v-show='location.isShow')
              v-list-item-title
                nuxt-link(:to='`/posts/${post.id}`') {{ post.title }}
              v-list-item-subtitle 
                h2.text-h5 {{ post.stages.stageNo }}
              v-list-item-title 
                nuxt-link(:to='`/posts/${post.id}`')
                  h1.text-h4.text-h1.el_ellipsis(
                    :class='`headline font-weight-light mb-4 `'
                  ) {{ post.title }}
              v-list-action-text.d-flex 
                span(v-for='tag in post.tags', :key='tag.id')
                  nuxt-link(:to='`/tags/${tag.id}`')
                    span.text-h6.mr-4 {{ tag.tags }}

    .mt-4(@click='$router.go(-1)') 
      h3.blue--text Back
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['posts', 'locations', 'tags']),
    ...mapGetters(['getPostsByLocaction']),
    // ghkbxdc21
    // selectLocationOfPosts(locationId) {
    //   return this.$store.getters.getPostsByLocaction(locationId)
    // },
  },
  methods: {
    isOpen(idx) {
      this.$store.commit('chengLocationIsShow', idx)
    },
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
