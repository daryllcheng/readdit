import { combineReducers } from 'redux';
import subscriptionReducer from './subscriptions';

export default combineReducers({
  subscriptions: subscriptionReducer
});