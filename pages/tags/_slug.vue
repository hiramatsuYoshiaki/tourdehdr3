<template lang="pug">
div 
    div.mt-4 
        h1 tags/_slug.vue 
        h3 {{ $route.params.slug}}
    div.mt-4 
        div(v-for="tag in tags" :key="tag.id")
            div(v-if="tag.id === $route.params.slug") 
                h1 
                    span.ml-2 {{ tag.tags }}
                    span.ml-2 {{ tag.id}}
                div.ml-4 
                    div(v-for="post in posts" :key="post.id")
                        div(v-for="postTag in post.tags" :key="postTag.id")
                            div(v-if="tag.id === postTag.id")
                                nuxt-link(:to="`/posts/${post.id}`")
                                    h3 
                                        span.mr-4 {{post.title}}
                                        span.mr-4 {{post.id}}

    div.mt-4 
        h3 {{ tags }}
    div.mt-4 
        h3 {{ posts}}
    div(@click="$router.go(-1)")
        h3.blue--text Back
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['tags', 'posts']),
  },
}
</script>
