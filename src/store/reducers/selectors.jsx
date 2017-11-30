export function renderHomepage(state) {
  return state.subscriptions.renderHomepage;
}

export function getSubscribedSubreddits(state) {
  return state.subscriptions.subscribedSubreddits.map(subreddit => state.subsciptions.subreddits[subreddit]);
}

export function getSubscribedSubredditUrls(state) {
  return state.subscriptions.subscribedSubreddits;
}