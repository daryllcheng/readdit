export function getSubscribedSubredditUrls(state) {
  return state.subscriptions.subscribedSubredditUrls;
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