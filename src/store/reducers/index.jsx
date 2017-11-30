import { combineReducers } from 'redux';
import subscriptionReducer from './subscriptions_reducer';

export default combineReducers({
  subscriptions: subscriptionReducer
});