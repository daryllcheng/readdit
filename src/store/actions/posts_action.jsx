import { getSubscribedSubreddits } from '../reducers/selectors';
import redditService from '../../services/reddit';
import { FETCHED_POSTS } from './types';

export function fetchPosts() {
  return async(dispatch, getState) => {
    try {
      const subscribedSubredditUrls = getSubscribedSubreddits(getState());
      const fetchPromises = subscribedSubredditUrls.map(url => redditService.getPostsFromSubreddit(url));
      const subredditPosts = await Promise.all(fetchPromises);
      dispatch({ type: FETCHED_POSTS, subredditPosts });
    } catch (error) {
      console.error(error);
    }
  };
}