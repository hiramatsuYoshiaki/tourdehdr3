<template lang="pug">
div 
    div.mt-4
        h1 locations/_slug.vue 
        h3 {{ $route.params.slug}}
    div.mt-4 
        div(v-for="location in locations" :key="location.id")
            div(v-if="$route.params.slug === location.id") 
                h1 {{ location.locations}}
                div(v-for="post in posts" :key="post.id")
                    div(v-if="location.id === post.locations.id")
                        nuxt-link(:to="`/posts/${post.id}`")
                            h3 
                                span.mr-4 {{ post.title}}
                                span.mr-4 {{ post.id}}
    div.mt-4
        div(@click="$router.go(-1)")
            h3.blue--text Back
    div.mt-4 
        h3 {{locations}} 
    div.mt-4 
        h3 {{ posts}}
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['posts', 'locations']),
  },
}
</script>
