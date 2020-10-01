import axios from 'axios'
// state
export const state = () => ({
  posts: [],
  stages: [],
  tags: [],
  locations: [],
})
// mutation
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  cg(state, payload) {
    console.log(payload)
    console.log(state.posts[payload].isShow)
    state.posts[payload].isShow = !state.posts[payload].isShow
  },
  setLink(state, payload) {
    state.stages = []
    state.tags = []

    payload.map((post) => {
      const entory = post
      // stage store
      if (entory.stages) {
        const dataStages = state.stages.find((stg) => {
          return stg.id === entory.stages.id
        })
        if (!dataStages) {
          // state.stages.push(post.stages)
          state.stages.push(entory.stages)
        }
      }
      // locations
      if (entory.locations) {
        const dataLocations = state.locations.find((loc) => {
          return loc.id === entory.locations.id
        })
        if (!dataLocations) {
          state.locations.push(entory.locations)
        }
      }
      // tag store
      if (entory.tags) {
        entory.tags.map((tagsTag) => {
          const dataTags = state.tags.find((tag) => {
            return tag.id === tagsTag.id
          })
          if (!dataTags) {
            state.tags.push(tagsTag)
          }
        })
      }
    })
    state.stages.sort((a, b) => a.sort - b.sort)
    state.tags.sort((a, b) => a.sort - b.sort)
    state.locations.sort((a, b) => a.sort - b.sort)
    // for (let i = 0; i < payload.length; i++) {
    //   const entory = payload[i]
    //   if (entory.stages) {
    //     const data = state.stages.find((a) => {
    //       return a.id === entory.stages.id
    //     })
    //     if (!data) {
    //       state.stages.push(payload[i].stages)
    //     }
    //   }
    // }
    // state.stages.sort((a, b) => a.sort - b.sort)

    // for (let i = 0; i < payload.length; i++) {
    //   const entory = payload[i]
    //   if (entory.stages) {
    //     const data = state.stages.find((a) => {
    //       return a.id === entory.stages.id
    //     })
    //     if (!data) {
    //       state.stages.push(payload[i].stages)
    //     }
    //   }
    // }
    // state.stages.sort((a, b) => a.sort - b.sort)

    // console.log(state.stages)
    // console.log(payload[0].locations)
    // console.log(state.tags)
  },
}
// actions
export const actions = {
  async getPosts({ commit }) {
    await axios
      .get('https://h-works.microcms.io/api/v1/blog', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        commit('setPosts', res.data.contents)
        commit('setLink', res.data.contents)
        // console.log(res.data.contents)
      })
      .catch((err) => {
        console.log(`Error! HTTP Status: ` + err)
      })
  },
}
