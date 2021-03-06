import { FETCHED_SUBREDDITS, SUBSCRIBED_SUBREDDITS, RENDER_DIALOG } from "./types";
import redditService from "../../services/reddit";
import { getSubscribedSubreddits } from "../reducers/selectors";
import { fetchPosts } from "./posts_action";

export function fetchSubreddits(query) {
  return async(dispatch, getState) => {
    try {
      const fetchedSubreddits = query ? await redditService.getSubredditSuggestions(query) :
      await redditService.getDefaultSubreddits();
      const subscribedSubreddits = getSubscribedSubreddits(getState());
      const subreddits = fetchedSubreddits.filter(subreddit => subscribedSubreddits.indexOf(subreddit.url) === -1);
      dispatch({ type: FETCHED_SUBREDDITS, subreddits });
    } catch (error) {
      console.log(error);
    }
  };
};

export function subscribeToSubreddit(url) {
  return (dispatch, getState) => {
    const subscribedSubreddits = getSubscribedSubreddits(getState());
    const newSubscribedSubreddits = subscribedSubreddits.indexOf(url) !== -1 ?
    subscribedSubreddits.filter(subreddit => subreddit !== url) :
    [...subscribedSubreddits, url];

    dispatch(fetchSubreddits());
    dispatch({ type: SUBSCRIBED_SUBREDDITS, subscribedSubreddits: newSubscribedSubreddits });
    dispatch(fetchPosts());
  };
};

export function toggleSuggestions() {
  return ({ type: RENDER_DIALOG });
};