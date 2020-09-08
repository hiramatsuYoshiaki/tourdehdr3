<template lang="pug">
div 
    div.mt-4 
        h1 stage/slug.vue 
        h3 param: {{ $route.params.slug}}
    div.mt-4(v-for="post in posts" :key="post.id") 
        //- h5 
        //-     span {{post.stages.id}} 
        //-     span -- 
        //-     span {{$route.params.slug}}
        div(v-if="$route.params.slug === post.stages.id")
             nuxt-link(:to="`/posts/${post.id}`")
                 h3 {{post.title}}
    div.mt-4(@click="$router.go(-1)") 
        h3.blue--text Back
    div.mt-4 
        h3 {{ stages}}
    div.mt-4 
        h3 {{ posts}}

</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['stages', 'posts']),
  },
}
</script>
