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
    state.posts[payload].isShow = !state.posts[payload].isShow
  },
  chengLocationIsShow(state, payload) {
    state.locations[payload].isShow = !state.locations[payload].isShow
  },
  chengTagsIsShow(state, payload) {
    state.tags[payload].isShow = !state.tags[payload].isShow
  },
  setLink(state, payload) {
    state.stages = []
    state.tags = []

    payload.map((post) => {
      const entory = post
      // stage
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
    state.posts.sort((a, b) => a.sort - b.sort)
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
      })
      .catch((err) => {
        console.log(`Error! HTTP Status: ` + err)
      })
  },
}
// getters
export const getters = {
  // setEyeCatch: () => (post) => {
  //   if (!!post.fields.heroImage && !!post.fields.heroImage.fields)
  //     return {
  //       url: `https:${post.fields.heroImage.fields.file.url}`,
  //       title: post.fields.heroImage.fields.title
  //     }
  //   else return { url: defaultEyeCatch, title: 'defaultImage' }
  // },
  // relatedPosts: (state) => (category) => {
  //   const posts = []
  //   for (let i = 0; i < state.posts.length; i++) {
  //     const catId = state.posts[i].fields.category.sys.id
  //     if (category.sys.id === catId) posts.push(state.posts[i])
  //   }
  //   return posts
  // }
  // getPostsByLocaction: (state) => (locationId) => {
  //   return state.posts.filter((post) => post.locations.id === locationId)
  // },

  getPostsByLocaction: (state) => (locationId) => {
    return state.posts.filter((post) => post.locations.id === locationId)
  },
  getPostsByStage: (state) => (stageId) => {
    return state.posts.filter((post) => post.stages.id === stageId)
  },
  getPostsByTag: (state) => (stageId) => {
    return state.posts.filter((post) => {
      const isFinded = post.tags.find((tag) => tag.id === stageId)
      if (isFinded) return true
    })
  },

  getLocationsById: (state) => (id) => {
    return state.locations.filter((location) => location.id === id)
  },
  getLocationsNameById: (state) => (id) => {
    const locaName = state.locations.find((location) => location.id === id)
    if (locaName) return locaName.locations
  },

  getStagesById: (state) => (id) => {
    return state.stages.filter((stage) => stage.id === id)
  },
  getStagesTitleById: (state) => (id) => {
    const stagesTitle = state.stages.find((stage) => stage.id === id)
    if (stagesTitle) {
      const selectStage = {
        title: '',
        year: '',
        stageNo: '',
      }
      selectStage.title = stagesTitle.title
      selectStage.year = stagesTitle.year
      selectStage.stageNo = stagesTitle.stageNo
      return selectStage
    }
  },
  getTagsNameById: (state) => (id) => {
    const tagName = state.tags.find((tag) => tag.id === id)
    if (tagName) return tagName.tags
  },
  // associatePosts: (state) => (currentTag) => {
  //   const posts = []
  //   for (let i = 0; i < state.posts.length; i++) {
  //     const post = state.posts[i]
  //     if (post.fields.tags) {
  //       const tag = post.fields.tags.find(
  //         (tag) => tag.sys.id === currentTag.sys.id
  //       )
  //       if (tag) posts.push(post)
  //     }
  //   }
  //   return posts
  // }
}
