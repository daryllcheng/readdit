import { getSubscribedSubreddits } from '../reducers/selectors';
import redditService from '../../services/reddit';
import { FETCHED_POSTS, SWITCHED_FILTER, SELECTED_POST } from './types';

export function fetchPosts() {
  return async(dispatch, getState) => {
    try {
      const subscribedSubredditUrls = getSubscribedSubreddits(getState());
      const fetchPromises = subscribedSubredditUrls.map(url => redditService.getPostsFromSubreddit(url));
      const rawPosts = await Promise.all(fetchPromises);
      const subredditPosts = [].concat(...rawPosts).sort((a, b) => a.created < b.upvotes);
      dispatch({ type: FETCHED_POSTS, subredditPosts });
    } catch (error) {
      console.error(error);
    }
  };
}

export function switchFilter(newFilter) {
  return ({ type: SWITCHED_FILTER, filter: newFilter });
}

export function selectPost(postId) {
  return ({ type: SELECTED_POST, postId });
}