<template lang="pug">
v-container.grey.lighten-4
  section.ly_content_wrapper.mb-4 
  v-list.grey.lighten-4 
    v-subheader 
      h1.text-h3 Stage List
    v-list-item(v-for='stage in stages', :key='stage.id') 
      v-list-item-title 
        nuxt-link(:to='`/stages/${stage.id}`') 
          span.text-h3.mr-2 {{ stage.year }}
          span.text-h3.mr-2 {{ stage.stageNo }}
          span.text-h5.mr-2 {{ stage.title }}
          span.text-h5.mr-2 {{ stage.sort }}
  .mt-4 
    nuxt-link(to='/')
      h3 Home
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'fullscreenNav',
  computed: {
    ...mapState(['posts', 'stages', 'tags']),
  },
}
</script>
