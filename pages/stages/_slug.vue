<template lang="pug">
v-container.grey.lighten-4 
  section.ly_content-wrapper.mb-4 
    v-subheader 
      //-   h3.text-h3 {{ $route.params.slug }}
      h3.text-h3 {{ getStagesTitleById($route.params.slug).stageNo }}
      h5.text-h5.ml-2 {{ getStagesTitleById($route.params.slug).year }}
    v-subheader 
      h3.text-h5.text-md-h3 {{ getStagesTitleById($route.params.slug).title }}
    v-list.grey.lighten-4 
      v-list-item.d-flex.align-start(
        v-for='post in getPostsByStage($route.params.slug)',
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
            nuxt-link(:to='`/posts/${post.id}`') {{ post.title }}
          v-list-item-subtitle 
            h2.text-h5 {{ post.stages.stageNo }}
              span.text-h5.ml-2 {{ post.year }}
              span.text-h5.ml-2 {{ post.stageNo }}
              span.text-h5.ml-2 {{ post.no }}
          v-list-item-title 
            nuxt-link(:to='`/posts/${post.id}`')
            h1.text-h4.text-h1.el_ellipsis(
              :class='`headline font-weight-light mb-4 `'
            ) {{ post.title }}
            v-list-action-text.d-flex 
              span(v-for='postTag in post.tags', :key='postTag.id')
                nuxt-link(:to='`/tags/${postTag.id}`')
                  span.text-h6.mr-4 {{ postTag.tags }}

  .mt-4(@click='$router.go(-1)') 
    h3.blue--text Back

//-   .mt-4 
//-     h1 stage/slug.vue
//-     h3 param: {{ $route.params.slug }}
//-   .mt-4(v-for='post in posts', :key='post.id') 
//-     //- h5 
//-     //-     span {{post.stages.id}} 
//-     //-     span -- 
//-     //-     span {{$route.params.slug}}
//-     div(v-if='$route.params.slug === post.stages.id')
//-       nuxt-link(:to='`/posts/${post.id}`')
//-         h3 {{ post.title }}
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['stages', 'posts', 'tags']),
    ...mapGetters(['getPostsByStage', 'getStagesById', 'getStagesTitleById']),
  },
}
</script>
<style lang="scss" scoped>
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
