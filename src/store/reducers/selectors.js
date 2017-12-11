export function getSubscribedSubreddits(state) {
  return state.subscriptions.subscribedSubreddits;
};

export function getSubreddits(state) {
  return state.subscriptions.subreddits;
};

export function renderDialog(state) {
  return state.subscriptions.renderDialog;
};

export function getPosts(state) {
  const subredditPosts = state.posts.subredditPosts;
  const currentFilter = state.posts.currentFilter;
  if (subredditPosts === undefined) return subredditPosts;
  const postsArray = currentFilter === "all" ?
  subredditPosts :
  subredditPosts.filter(post => post.subredditUrl === currentFilter);
  return postsArray;
};

export function getCurrentFilter(state) {
  return state.posts.currentFilter;
};

export function getCurrentPost(state) {
  return state.posts.currentPostId !== undefined && state.posts.subredditPosts.length > 24 ? 
  state.posts.subredditPosts.find(post => post.id === state.posts.currentPostId) :
  undefined;
};

export function getPostComments(state) {
  return state.posts.currentPostComments;
};