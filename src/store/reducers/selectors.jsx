export function getSubscribedSubreddits(state) {
  return state.subscriptions.subscribedSubreddits;
}

export function getSubreddits(state) {
  return state.subscriptions.subreddits;
}

export function renderSuggestions(state) {
  return state.subscriptions.renderSuggestions;
}

export function getPosts(state) {
  return state.posts.subredditPosts;
}