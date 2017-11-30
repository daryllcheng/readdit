import { FETCHED_SUBREDDITS, SUBSCRIBED_SUBREDDITS, RENDER_HOMEPAGE } from '../actions/types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  subreddits: undefined,
  subscribedSubreddits: [],
  renderHomepage: false
});

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case FETCHED_SUBREDDITS:
      return state.merge({
        subreddits: action.subreddits
      });
    case SUBSCRIBED_SUBREDDITS:
      return state.merge({
        subscribedSubreddits: action.subscribedSubreddits
      });
    case RENDER_HOMEPAGE:
      return state.merge({
        renderHomepage: true
      });
    default:
      return state;
  }
}