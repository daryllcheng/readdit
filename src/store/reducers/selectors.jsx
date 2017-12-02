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
  const subredditPosts = state.posts.subredditPosts;
  const currentFilter = state.posts.currentFilter;
  const subscribedSubreddits = getSubscribedSubreddits(state);
  if (subredditPosts === 'undefined') return subredditPosts;
  console.log(`currentFilter: ${ currentFilter }`)
  console.log(`filtered: ${ subredditPosts.filter( post => post.subredditUrl === currentFilter)}`)
  const postsArray = currentFilter === "all" ?
  subredditPosts :
  subredditPosts.filter(post => post.subredditUrl === currentFilter);
  return postsArray;
}

export function getCurrentFilter(state) {
  return state.posts.currentFilter;
}

export function getCurrentPost(state) {
  return state.posts.subredditPosts[state.posts.currentPostId];
}