<template lang="pug">
div     
    div.mt-4 
        h1 tage/index.vue
    div.mt-4
        div(v-for="tag in tags" :key="tag.id") 
            nuxt-link(:to="`/tags/${tag.id}`")
                h1 
                    span.mr-2 {{ tag.tags }} 
                    span.mr-2 {{ tag.id }} 
            div(v-for="post in posts" :key="post.id")
                div(v-for="postTag in post.tags" :key="postTag.id") 
                    div.ml-4(v-if="tag.id === postTag.id")
                        nuxt-link(:to="`/posts/${post.id}`")
                            h3 {{post.title}}

    div(@click="$router.go(-1)")
        h3.blue--text Back
    div.mt-4 
        h3 {{ tags }} 
    div.mt-4 
        h3 {{ posts }} 

</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['tags', 'posts']),
  },
}
</script>
