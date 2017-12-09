import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../store/reducers/selectors';
import { fetchPosts, selectPost, fetchComments } from '../store/actions/posts_action';
import PostTile from '../components/PostTile';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import Thread from '../components/thread/Thread';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import ScrollToTop from "react-scroll-up";
import { PulseLoader } from 'halogenium';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

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
  }

  renderLoading() {
    return (
      <PulseLoader color="#E55934" size="30px" margin="4px"/>
    );
  }

  render() {
    if (!this.props.subredditPosts) return this.renderLoading();
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1920
    });

    return (
      <div className="Posts">
        {
          this.props.currentPost !== undefined ?
          <TransitionGroup>
            <Thread post={ this.props.currentPost } comments={ this.props.currentPostComments } onClick={ this.handleClick } />
          </TransitionGroup> :
          <div />
        }
        {
          this.props.subredditPosts && this.props.subredditPosts.length > 24 ?
          <div className="grid">
            <Grid
              component="ul"
              columns={4}
              columnWidth={315}
              gutterWidth={5}
              gutterHeight={15}
              layout={layout.pinterest}
              duration={200}
              easing="ease-out"
            >
              {
                this.props.subredditPosts.map(post => (
                  <li 
                    key={ post.id }
                    onClick={ () => this.handleClick(post.id, post.subredditUrl) }
                  >
                    <PostTile 
                      title={ post.title.length > 150 ? `${ post.title.slice(0, 150) }...` : post.title }
                      thumbnail={ post.preview === "" ? `assets/defaultPreview.jpg` : post.preview}
                      overlayClassname={ post.preview === "" ? "textOverlay" : "imageOverlay" }
                    />
                  </li>
                ))
              }
            </Grid>
          </div> :
          <div>
            <h2>Please select a few subreddits...</h2>
            <img src="assets/emptySubreddits.png" alt="emptySubreddits" />
          </div>
        }
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
  }
}

function mapStateToProps(state) {
  return {
    subredditPosts: selectors.getPosts(state),
    subscribedSubreddits: selectors.getSubscribedSubreddits(state),
    currentPost: selectors.getCurrentPost(state),
    currentPostComments: selectors.getPostComments(state)
  }
};

export default connect(mapStateToProps)(Posts);