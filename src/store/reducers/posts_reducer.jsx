import { FETCHED_POSTS } from '../actions/types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  subredditPosts: 'undefined',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCHED_POSTS:
      return state.merge({
        subredditPosts: action.subredditPosts
      });
    default:
      return state;
  }
}