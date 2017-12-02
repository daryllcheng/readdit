import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../store/reducers/selectors';
import { fetchPosts, switchFilter, selectPost } from '../store/actions/posts_action';
import { toggleSuggestions, fetchSubreddits } from '../store/actions/subscriptions_action';
import PostTile from '../components/PostTile';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import RaisedButton from 'material-ui/RaisedButton';
import SubredditFilter from '../components/SubredditFilter';
import PostView from '../components/PostView';


class Posts extends Component {
  constructor(props) {
    super(props);

    this.onFilterSwitch = this.onFilterSwitch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleOpen = () => {
    this.props.dispatch(toggleSuggestions());
  };

  onFilterSwitch(newFilter) {
    this.props.dispatch(switchFilter(newFilter));
  }

  handleClick(postId) {
    console.log(`clicked: ${postId}`)
    this.props.dispatch(selectPost(postId));
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
        <RaisedButton label="Our Suggestions" onClick={ this.handleOpen } />
        <SubredditFilter 
          className="subredditFilter" 
          subscribedSubreddits={ this.props.subscribedSubreddits } 
          currentFilter={ this.props.currentFilter } 
          onFilterSwitch={ this.onFilterSwitch }
        />
        {
          this.props.currentPost !== undefined ?
          <PostView items={[1, 2, 3, 4]} post={ this.props.currentPost } onClick={ this.handleClick } />:
          <div></div>
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
                <li key={ post.id }>
                  <PostTile post={ post } onClick={ this.handleClick } />
                </li>
              ))
            }
          </Grid> :
          <p>Select a few subreddits!</p>
        }
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }
}

function mapStateToProps(state) {
  return {
    subredditPosts: selectors.getPosts(state),
    subscribedSubreddits: selectors.getSubscribedSubreddits(state),
    currentFilter: selectors.getCurrentFilter(state),
    currentPost: selectors.getCurrentPost(state)
  }
};

export default connect(mapStateToProps)(Posts);