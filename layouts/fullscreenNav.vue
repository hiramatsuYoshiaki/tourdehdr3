<template lang="pug"> 
    v-app(id="baseline")
        v-navigation-drawer(v-model="drawer" app dark mobile-breakpoin bottom stateless width="100vw" ) 
            v-list(dense) 
                v-list-item(
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                )
                    v-list-item-action
                        v-icon {{ item.icon }}
                    v-list-item-content
                        v-list-item-title   {{ item.title }}
                //- v-list-item(link to="/" nuxt) 
                //-         v-list-item-action 
                //-                 v-icon  mdi-chart-bubble 
                //-         v-list-item-content 
                //-                 v-list-item-title HOME
                //- v-list-item(link to="/setting" nuxt) 
                //-         v-list-item-action 
                //-                 v-icon  fas fa-cogs
                //-         v-list-item-content 
                //-                 v-list-item-title SETTING
                //- v-list-item(link to="/component" nuxt) 
                //-         v-list-item-action 
                //-                 v-icon  fas fa-cubes
                //-         v-list-item-content 
                //-                 v-list-item-title COMPONENTS
                //- v-list-item(link to="/respPattern" nuxt) 
                //-         v-list-item-action 
                //-                 v-icon  fas fa-stream
                //-         v-list-item-content 
                //-                 v-list-item-title Responsive
                //- v-list-item(@click.stop="drawer = !drawer")
                //-         v-list-item-action 
                //-                 v-icon far fa-times-circle
                //-         v-list-item-content 
                //-                 v-list-item-title Close
                div.closeBtn(@click.stop="drawer = !drawer") 
                        v-icon mdi-chart-bubble

        v-app-bar(app) 
            v-app-bar-nav-icon(@click.stop="drawer = !drawer") 
            v-toolbar-title TOURdeHDR+3  
            v-spacer 
            //- v-btn(v-for="(item, i) in items"
            //-         :key="i"
            //-         :to="item.to"
            //-         router
            //-         exact
            //- )
            //-     v-icon {{ item.icon }}
            //-         span {{ item.title }}
            //- v-btn-toggle(
            //-     v-model="toggle_exclusive" 
            //-     borderless 
            //-     group
            //- )
            v-btn(v-for="(item, i) in items"
                        :key="i"
                        :to="item.to"
                        router
                        exact
                        text
                )
                    v-icon {{ item.icon }}
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
          icon: 'mdi-apps',
          title: 'HOME',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'POST',
          to: '/posts',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'LOCATION',
          to: '/locations',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'STAGES',
          to: '/stages',
        },
        {
          icon: 'mdi-chart-bubble',
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
.closeBtn {
  position: absolute;
  top: 0rem;
  right: 0rem;
  margin: 2rem 4rem;
}
</style>
