export function getSubscribedSubreddits(state) {
  return state.subscriptions.subscribedSubreddits;
}

export function getSubreddits(state) {
  return state.subscriptions.subreddits;
}

export function renderHomepage(state) {
  return state.subscriptions.renderHomepage;
}

export function getPosts(state) {
  return state.posts.subredditPosts;
}