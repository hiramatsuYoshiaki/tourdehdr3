<template lang="pug">
  v-container 
    div 
      h1 crousel posts
    div 
      v-carousel(
        cycle
        width="100%"
        height="400"
        hide-delimiter-background
        hide-delimiters
        show-arrows
        show-arrows-on-hover
      )
        v-carousel-item(
          v-for="(post, i) in posts"
          :key="i"
          :src="post.image.url"
          reverse-transition="fade-transition"
          transition="fade-transition"
        )
    div 
    v-timeline
      v-timeline-item(
        v-for="(post, i) in posts"
        :key="i"
        small
      )
        template(v-slot:opposite)
          span(
              :class="`headline font-weight-bold `"
              v-text="post.stages.stageNo"
            )
        div.py-4
          h1( :class="`headline font-weight-light mb-4 `") {{post.stages.stageNo}}
          h2( :class="`headline font-weight-light mb-4 `") {{post.title}}
          div {{post.body}}
          h3 {{ post.link}}
          h3 {{ post.users.name}}
          h3 {{ post.locations.locations}}
          h3 {{ post.stages.stage}}
          h3 {{ post.stages.title}}
          div(v-for="tag in post.tags" :key="tag.id")
                span.mr-4 {{tag.tags}}
          img(:src="post.image.url" width="300" height="200" alt="画像" ) 
    v-divider
    div 
      h1 crousel 1
    div 
      v-carousel(
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      )
        v-carousel-item(
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        )
    v-divider
    div 
      h1 crousel 2
    div 
      v-carousel(
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      )
        v-carousel-item(
          v-for="(slide, i) in slides"
          :key="i"
        )
          v-sheet(
            :color="colors[i]"
            height="100%"
          )
            v-row(
              class="fill-height"
              align="center"
              justify="center"
            )
              div.display-3 {{ slide }} Slide
    v-divider
    div 
      h1 Time Line 
    div 
      v-timeline
        v-timeline-item(
          v-for="(year, i) in years"
          :key="i"
          :color="year.color"
          small
        )
          template(v-slot:opposite)
            span(
                :class="`headline font-weight-bold ${year.color}--text`"
                v-text="year.year"
              )
          div.py-4
            h2( :class="`headline font-weight-light mb-4 ${year.color}--text`") Lorem ipsum
            div Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
    v-divider
    div 
      h1 micro CMS Blog Test
    div 
      nuxt-link(to="/stages")
        h1 stages index
    div 
      nuxt-link(to="/tags")
        h1 tags index
    div 
      nuxt-link(to="/locations")
        h1 locations index
    div 
      h3 Blog list 
      ul 
        li(v-for="post in posts" :key="post.id") 
            nuxt-link( :to="`/posts/${post.id}`")
              h1 {{ post.title}}
            div
              h3 {{ post.body}}
              h3 {{ post.link}}
              h3 {{ post.users.name}}
              h3 {{ post.locations.locations}}
              h3 {{ post.stages.stage}}
              h3 {{ post.stages.title}}
              div(v-for="tag in post.tags" :key="tag.id")
                span.mr-4 {{tag.tags}}
              img(:src="post.image.url" width="300" height="200" alt="画像" ) 
      //- div.mt-8 {{posts}}
    
</template>
<script>
// import axios from 'axios'
import { mapState } from 'vuex'
export default {
  layout: 'fullscreenNav',
  // async asyncData({ error, env }) {
  //   try {
  //     const { data } = await axios.get(
  //       'https://h-works.microcms.io/api/v1/blog',
  //       {
  //         headers: { 'X-API-KEY': process.env.API_KEY },
  //       }
  //     )
  //     return {
  //       contents: data.contents,
  //     }
  //   } catch (err) {
  //     error({
  //       statusCode: err.response.status,
  //       message: err.response.data.message,
  //     })
  //     console.log('error: ' + err)
  //   }
  // },
  data() {
    return {
      contents: [],
      // curousel test
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      years: [
        {
          color: 'cyan',
          year: '1960',
        },
        {
          color: 'green',
          year: '1970',
        },
        {
          color: 'pink',
          year: '1980',
        },
        {
          color: 'amber',
          year: '1990',
        },
        {
          color: 'orange',
          year: '2000',
        },
      ],
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
  computed: {
    ...mapState(['posts']),
  },
}
</script>
