import { FETCHED_POSTS, SWITCHED_FILTER, SELECTED_POST } from '../actions/types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  subredditPosts: "undefined",
  currentFilter: "all",
  currentPostId: undefined
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCHED_POSTS:
      return state.merge({
        subredditPosts: action.subredditPosts
      });
    case SWITCHED_FILTER:
      return state.merge({
        currentFilter: action.filter
      });
    case SELECTED_POST:
      return state.merge({
        currentPostId: action.postId
      });
    default:
      return state;
  }
}