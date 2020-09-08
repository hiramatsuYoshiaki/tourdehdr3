<template lang="pug">
div
    div.mt-4
        h1 stage index.vue
    div.mt-4 
        div(v-for="stage in stages" :key="stage.id")
            nuxt-link(:to="`/stages/${stage.id}`")
                h3 
                    span.mr-2 {{stage.stageNo}}
                    span.mr-2 {{stage.title}}
                    span.mr-2 {{stage.id}}
            div(v-for="post in posts" :key="post.id")
                div.ml-4(v-if="stage.id === post.stages.id")
                    nuxt-link(:to="`/posts/${post.id}`")
                        h5 
                            span.mr-2 {{post.title}}
                            span.mr-2 paost:{{post.id}}
                            span.mr-2 stage:{{post.stages.id}}
    div.mt-4
        h3 {{stages}}
    div.mt-4
        h3 {{posts}}
    div.mt-4 
        nuxt-link(to="/")
            h3 Home
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['posts', 'stages']),
  },
}
</script>
