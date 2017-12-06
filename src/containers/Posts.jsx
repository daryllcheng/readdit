import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../store/reducers/selectors';
import { fetchPosts, selectPost, fetchComments } from '../store/actions/posts_action';
import { fetchSubreddits } from '../store/actions/subscriptions_action';
import PostTile from '../components/PostTile';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import PostView from '../components/postView/PostView';
import TransitionGroup from 'react-transition-group/TransitionGroup';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleClick(postId, subredditUrl) {
    this.props.dispatch(selectPost(postId));
    if (postId !== undefined) {
      this.props.dispatch(fetchComments(subredditUrl, postId));
    }
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  render() {
    if (!this.props.subredditPosts) return this.renderLoading();
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1920,
      minPadding: 20
    });

    return (
      <div className="Posts">
        {
          this.props.currentPost !== undefined ?
          <TransitionGroup className="thread">
            <PostView post={ this.props.currentPost } comments={ this.props.currentPostComments } onClick={ this.handleClick } />
          </TransitionGroup> :
          <div />
        }
        {
          this.props.subredditPosts && this.props.subredditPosts.length > 24 ?
          <Grid
            component="ul"
            columns={5}
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
                    title={ post.title.length > 70 ? `${ post.title.slice(0, 70) }...` : post.title }
                    thumbnail={ post.preview ? post.preview : `assets/defaultPreview.jpg`}
                  />
                </li>
              ))
            }
          </Grid> :
          <p>Select a few subreddits!</p>
        }
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