import { FETCHED_SUBREDDITS, SUBSCRIBED_SUBREDDITS, RENDER_DIALOG } from '../actions/types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  subreddits: undefined,
  subscribedSubreddits: ['/r/news/'],
  renderDialog: true
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
    case RENDER_DIALOG:
      return state.merge({
        renderDialog: !state.renderDialog
      });
    default:
      return state;
  }
}