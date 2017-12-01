import { getSubscribedSubreddits } from '../reducers/selectors';
import redditService from '../../services/reddit';
import { FETCHED_POSTS } from './types';

export function fetchPosts() {
  return async(dispatch, getState) => {
    try {
      const subscribedSubredditUrls = getSubscribedSubreddits(getState());
      console.log(subscribedSubredditUrls);
      const fetchPromises = subscribedSubredditUrls.map(url => redditService.getPostsFromSubreddit(url));
      const rawPosts = await Promise.all(fetchPromises);
      dispatch({ type: FETCHED_POSTS, subredditPosts: rawPosts['0'] });
    } catch (error) {
      console.error(error);
    }
  };
}