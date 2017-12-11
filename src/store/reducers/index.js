import { combineReducers } from "redux";
import subscriptionReducer from "./subscriptions_reducer";
import postReducer from "./posts_reducer";

export default combineReducers({
  subscriptions: subscriptionReducer,
  posts: postReducer
});