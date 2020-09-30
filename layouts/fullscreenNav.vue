<template lang="pug">
v-app#baseline
  v-navigation-drawer.d-flex.justify-sm-center.align-sm-center.pa-8(
    v-model='drawer',
    app,
    bottom,
    stateless,
    width='100vw',
    height='100vh'
  ) 
    v-list.d-flex.flex-column.justify-center.align-center(
      light,
      dense,
      width='30rem',
      height='50rem',
      text
    ) 
      v-list-item.listItems(
        v-for='(item, i) in items',
        :key='i',
        :to='item.to',
        router,
        exact,
        @click.stop='drawer = !drawer'
      )
        v-list-item-action.pl-8.pr-2
          v-icon(large) {{ item.icon }}
        v-list-item-content
          v-list-item-title 
            h1.text-h4 {{ item.title }}

    .closeBtn(@click.stop='drawer = !drawer') 
      v-icon mdi-close-thick

  v-app-bar(app) 
    v-app-bar-nav-icon(@click.stop='drawer = !drawer') 
    v-toolbar-title 
      nuxt-link(to='/')
        h2 TOURdeHDR+3
    v-spacer 
    .d-none.d-sm-flex
      v-btn(
        v-for='(item, i) in items',
        :key='i',
        :to='item.to',
        router,
        exact,
        text
      )
        v-icon.d-none.d-lg-block.mr-1 {{ item.icon }}
        span {{ item.title }}

  v-main
    nuxt 
  v-footer(app, width='100vw')
    //- v-toolbar-title.d-flex.justify-center.align-center
    v-toolbar-title.footerTitle.pa-4.d-flex.justify-center.align-center
      //- span TOURdeHDR+3
      img.d-block.mr-4(
        src='~assets/img/logo/h-logo.svg',
        alt='h-works',
        height='28'
      )
      img.mr-4.d-none.d-md-block(
        src='~/assets/img/logo/h-works1200x600black.svg',
        alt='h-works logo',
        height='28'
      )
      .mr-4.mt-2 &copy; {{ new Date().getFullYear() }}
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
          icon: 'mdi-new-box',
          title: 'NEW',
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

.listItems {
  // border: 1px solid darkblue;
  width: 28rem;
  padding: 0;
  margin: 0;
}
.footerTitle {
  width: 100vw;
}
</style>
