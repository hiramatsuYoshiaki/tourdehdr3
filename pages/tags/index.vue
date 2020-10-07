<template lang="pug">
v-container.grey.lighten-4 
  section.ly_content_wrapper.mb-4
    v-list.grey.lighten-4 
      v-subheader 
        h1.text-h3 LOCATION LIST
      v-list-item(v-for='(tag, i) in tags', :key='tag.id', three-line)
        v-list-item-title
          .d-flex
            nuxt-link(:to='`/tags/${tag.id}`') 
              h3.text-h3 {{ tag.tags }}
            v-spacer
              v-btn(icon, @click='isOpen(i)')
                v-icon {{ tag.isShow ? "mdi-chevron-up" : "mdi-chevron-down" }}
          v-list-item-group.d-flex.align-start(
            v-for='post in getPostsByTag(tag.id)',
            :key='post.id'
          )
            v-list-item-averter(v-show='tag.isShow')
              nuxt-link(:to='`/posts/${post.id}`')
              .averter-wrapper
                img(
                  :src='post.image.url',
                  width='100%',
                  height='auto',
                  alt='post.title'
                )
            v-list-item-content.ml-4(v-show='tag.isShow')
              v-list-item-title
                nuxt-link(:to='`/posts/${post.id}`') 
              v-list-item-subtitle 
                h2.text-h5 {{ post.stages.stageNo }}
                  span.ml-2 No.
                  span.text-h5 {{ post.postNo }}
                  span.text-h6.ml-2 {{ post.year }}
              v-list-item-title 
                nuxt-link(:to='`/posts/${post.id}`')
                  h1.text-h4.text-h1.el_ellipsis(
                    :class='`headline font-weight-light mb-4 `'
                  ) {{ post.title }}
              v-list-action-text.d-flex 
                span(v-for='postTag in post.tags', :key='postTag.id')
                  nuxt-link(:to='`/tags/${postTag.id}`')
                    span.text-h6.mr-4 {{ postTag.tags }}
  div(@click='$router.go(-1)')
    h3.blue--text BACK
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['tags', 'posts', 'tags']),
    ...mapGetters(['getPostsByTag']),
  },
  methods: {
    isOpen(idx) {
      this.$store.commit('chengTagsIsShow', idx)
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
