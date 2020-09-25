<template lang="pug">
div 
    div.mt-4 
        h1 locations/index.vue
    div.mt-4 
        div(v-for="location in locations" :key="location.id")
            nuxt-link(:to="`/locations/${location.id}`")
                h1 
                    span.mr-4 {{location.locations}}
                    span.mr-4 {{location.id}}
            div(v-for="post in posts" :key="post.id")
                div.ml-4(v-if="location.id === post.locations.id")
                    nuxt-link(:to="`/posts/${post.id}`")
                        h3 {{ post.title}}
    div.mt-4(@click="$router.go(-1)") 
        h3.blue--text Back
    div.mt-4 
        h3 {{ locations}}
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
