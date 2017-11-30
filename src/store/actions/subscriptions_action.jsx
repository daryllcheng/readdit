import { FETCHED_SUBREDDITS, SELECTED_SUBREDDITS, RENDER_HOMEPAGE } from './types';
import { getPopularSubreddits }from '../../services/reddit';
import { getSubscribedSubreddits } from '../reducers/selectors';

export function fetchSubreddits() {
  return async(dispath, getState) => {
    try {
      const subredditArray = await getPopularSubreddits();
      const subreddits = subredditArray.map(subreddit => subreddit.url);
      dispath({ type: FETCHED_SUBREDDITS, subreddits });
    } catch (error) {
      console.log(error);
    }
  };
}

export function subscribeToSubreddit(url) {
  return (dispath, getState) => {
    const subscribedSubreddits = getSubscribedSubreddits(getState());
    
  }
}
