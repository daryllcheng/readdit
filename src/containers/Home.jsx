import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../store/reducers/selectors';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import { fetchPosts } from '../store/actions/posts_action';
import Posttile from '../components/posts/Posttile';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    )
  }

  render() {
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1920,
      minPadding: 20
    });
    return (
      <div className="Home">
      {
        this.props.subredditPosts.length > 24 ?
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
        this.renderLoading()
      }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subredditPosts: selectors.getPosts(state),
    subscribedSubreddits: selectors.getSubscribedSubreddits(state)
  }
};

export default connect(mapStateToProps)(Home);