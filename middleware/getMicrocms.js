export default async ({ store }) => {
  if (!store.state.posts.length) await store.dispatch('getPosts')
  // await store.dispatch('getPosts')
  // console.log('getMicrocms')
}
