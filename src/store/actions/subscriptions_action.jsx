import { FETCHED_SUBREDDITS, SUBSCRIBED_SUBREDDITS, RENDER_SUGGESTIONS } from './types';
import redditService from '../../services/reddit';
import { getSubscribedSubreddits, renderSuggestions } from '../reducers/selectors';
import { fetchPosts } from './posts_action';

export function fetchSubreddits() {
  return async(dispatch, getState) => {
    try {
      const temp = await redditService.getDefaultSubreddits();
      const subscribedSubreddits = getSubscribedSubreddits(getState());
      // const subreddits = subredditArray.map(subreddit => subreddit.url);
      const subreddits = temp.map(subreddit => {
        return {
          ...subreddit,
        checked: subscribedSubreddits.indexOf(subreddit.url) !== -1 ? true : false}
      });
      console.log(subreddits);
      dispatch({ type: FETCHED_SUBREDDITS, subreddits });
    } catch (error) {
      console.log(error);
    }
  };
}

export function subscribeToSubreddit(url) {
  return (dispatch, getState) => {
    const subscribedSubreddits = getSubscribedSubreddits(getState());
    const newSubscribedSubreddits = subscribedSubreddits.indexOf(url) !== -1 ?
    subscribedSubreddits.filter(subreddit => subreddit !== url) :
    [...subscribedSubreddits, url];

    dispatch({ type: SUBSCRIBED_SUBREDDITS, subscribedSubreddits: newSubscribedSubreddits });
  }
}

export function toggleSuggestions() {
  return ({ type: RENDER_SUGGESTIONS });
}
