import React, { Component } from "react";
import { connect } from "react-redux";
import * as selectors from "../store/reducers/selectors";
import { fetchPosts, selectPost, fetchComments } from "../store/actions/posts_action";
import TransitionGroup from "react-transition-group/TransitionGroup";
import ScrollToTop from "react-scroll-up";
import { PulseLoader } from "halogenium";
import Thread from "../components/thread/Thread";
import PostsGrid from "../components/postsGrid/PostsGrid";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  };

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  };

  handleClick(postId, subredditUrl) {
    if (postId === undefined) {
      this.props.dispatch(selectPost(postId));
    } else if (window.pageYOffset < 200 && postId !== undefined) {
      this.props.dispatch(selectPost(postId));
      this.props.dispatch(fetchComments(subredditUrl, postId));
    } else {
      document.getElementById("scrollToTop").click();
      setTimeout(() => {
        this.handleClick(postId, subredditUrl);
      }, 1000)
    }
  };

  renderLoading() {
    return (
      <PulseLoader color="#E55934" size="30px" margin="4px"/>
    );
  };

  render() {
    if (!this.props.subredditPosts) return this.renderLoading();
    return (
      <div className="Posts">
        {
          this.props.currentPost !== undefined ?
          <TransitionGroup>
            <Thread post={ this.props.currentPost } comments={ this.props.currentPostComments } onClick={ this.handleClick } />
          </TransitionGroup> :
          <div />
        }
        <PostsGrid posts={ this.props.subredditPosts } handleClick={ this.handleClick } /> :
        <ScrollToTop 
          showUnder={ 160 }
          duration={ 500 }
          style={{ "zIndex": 2 }}
        >
          <span id="scrollToTop">
            <i className="fas fa-arrow-circle-up pulsate"></i>
          </span>
        </ScrollToTop>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    subredditPosts: selectors.getPosts(state),
    subscribedSubreddits: selectors.getSubscribedSubreddits(state),
    currentPost: selectors.getCurrentPost(state),
    currentPostComments: selectors.getPostComments(state)
  };
};

export default connect(mapStateToProps)(Posts);