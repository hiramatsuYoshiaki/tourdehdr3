<template lang="pug"> 
    v-app(id="baseline")
        v-navigation-drawer(v-model="drawer" app   bottom stateless width="100%" ) 
            v-list(dense).mr-8 
                v-list-item(
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                    @click.stop="drawer = !drawer"
                )
                    v-list-item-action
                        v-icon {{ item.icon }}
                    v-list-item-content
                        v-list-item-title   {{ item.title }}
               
            div.closeBtn(@click.stop="drawer = !drawer") 
                v-icon mdi-close-thick

        v-app-bar(app) 
            v-app-bar-nav-icon(@click.stop="drawer = !drawer") 
            v-toolbar-title 
                nuxt-link(to="/")
                    span TOURdeHDR+3  
            v-spacer 
            div.d-none.d-sm-flex
                v-btn(v-for="(item, i) in items"
                            :key="i"
                            :to="item.to"
                            router
                            exact
                            text
                    )
                        //- v-icon {{ item.icon }}
                        span {{ item.title }}

        v-main
            nuxt 
        v-footer(app)
            v-toolbar-title 
                span TOURdeHDR+3   
                span &copy; {{ new Date().getFullYear() }} 
        //- v-bottom-navigation(app) bottom-navigation
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      toggle_exclusive: undefined,
      items: [
        {
          icon: 'mdi-hdr',
          title: 'TOP',
          to: '/',
        },
        {
          icon: 'mdi-post-outline',
          title: 'POST',
          to: '/posts',
        },
        {
          icon: 'mdi-map-marker',
          title: 'LOCATION',
          to: '/locations',
        },
        {
          icon: 'mdi-numeric-1-box-multiple',
          title: 'STAGES',
          to: '/stages',
        },
        {
          icon: 'mdi-tag-multiple',
          title: 'TAGS',
          to: '/tags',
        },
      ],
    }
  },
}
</script>
<style lang="scss">
html {
  font-size: 62.5%; //62.5% 1rem=10px
}
// a {
//   color: black;
//   text-decoration: none;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.5;
//   }
// }
// * {
//   border: 1px solid lightgray;
// }
.closeBtn {
  position: absolute;
  top: 0rem;
  right: 0rem;
  margin: 1rem 1rem;
}
</style>
