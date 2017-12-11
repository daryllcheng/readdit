import { getSubscribedSubreddits } from "../reducers/selectors";
import redditService from "../../services/reddit";
import { FETCHED_POSTS, SWITCHED_FILTER, SELECTED_POST, FETCHED_COMMENTS } from "./types";

export function fetchPosts() {
  return async(dispatch, getState) => {
    try {
      const subscribedSubredditUrls = getSubscribedSubreddits(getState());
      const fetchPromises = subscribedSubredditUrls.map(url => redditService.getPostsFromSubreddit(url));
      const rawPosts = await Promise.all(fetchPromises);
      const subredditPosts = [].concat(...rawPosts).sort((a, b) => a.upvotes < b.upvotes);
      dispatch({ type: FETCHED_POSTS, subredditPosts });
    } catch (error) {
      console.error(error);
    }
  };
};

export function switchFilter(newFilter) {
  return ({ type: SWITCHED_FILTER, filter: newFilter });
};

export function selectPost(postId) {
  return (dispatch, getState) => {
    dispatch({ type: SELECTED_POST, postId });
  };
};

export function fetchComments(subreddit, postId) {
  return async(dispatch, getState) => {
    try {
      const currentPostComments = await redditService.getCommentsFromPost(subreddit, postId);
      dispatch({ type: FETCHED_COMMENTS, currentPostComments });
    } catch (error) {
      console.error(error);
    }
  };
};