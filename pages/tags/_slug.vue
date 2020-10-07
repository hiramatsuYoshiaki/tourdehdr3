<template lang="pug">
v-container.grey.lighten-4 
  section.ly_content_wrapper.mb-4 
    v-subheader
      //- h1 {{ $route.params.slug }}
      h1.text-h3 {{ getTagsNameById($route.params.slug) }}
    v-list.grey.lighten-4 
      v-list-item.d-flex.align-start(
        v-for='post in getPostsByTag($route.params.slug)',
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

  .mt-4
    div(@click='$router.go(-1)')
    h3.blue--text Back
//- div 
//-   .mt-4 
//-     h1 tags/_slug.vue
//-     h3 {{ $route.params.slug }}
//-   div(@click='$router.go(-1)')
//-     h3.blue--text Back
//-   .mt-4 
//-     div(v-for='tag in tags', :key='tag.id')
//-       div(v-if='tag.id === $route.params.slug') 
//-         h1 
//-           span.ml-2 {{ tag.tags }}
//-           span.ml-2 {{ tag.id }}
//-         .ml-4 
//-           div(v-for='post in posts', :key='post.id')
//-             div(v-for='postTag in post.tags', :key='postTag.id')
//-               div(v-if='tag.id === postTag.id')
//-                 nuxt-link(:to='`/posts/${post.id}`')
//-                   h3 
//-                     span.mr-4 {{ post.title }}
//-                     span.mr-4 {{ post.id }}
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['tags', 'posts', 'tags']),
    ...mapGetters(['getPostsByTag', 'getTagsNameById']),
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
