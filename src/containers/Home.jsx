import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../store/reducers/selectors';
import { fetchPosts } from '../store/actions/posts_action';
import { toggleSuggestions } from '../store/actions/subscriptions_action';
import Posttile from '../components/posts/Posttile';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import RaisedButton from 'material-ui/RaisedButton';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleOpen = () => {
    this.props.dispatch(toggleSuggestions());
  };

  render() {
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1920,
      minPadding: 20
    });

    return (
      <div className="Home">
      <RaisedButton label="Our Suggestions" onClick={ this.handleOpen } />
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
                <Posttile post={ post }/>
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
    subscribedSubredditUrls: selectors.getSubscribedSubredditUrls(state)
  }
};

export default connect(mapStateToProps)(Home);