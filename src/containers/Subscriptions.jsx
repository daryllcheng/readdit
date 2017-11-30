import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubreddits } from '../store/actions/subscriptions_action';
import * as selectors from '../store/reducers/selectors';

class Subscriptions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchSubreddits());
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    )
  }

  render() {
    if (!this.props.subreddits) return this.renderLoading();
    console.log(this.props.subreddits[0]);
    return (
      <div className="Subscriptions">
        <h1>Pick 3 Subreddits</h1>
        {
          this.props.subreddits.map(subreddit => (
            <div>
              <p>{ subreddit.title }</p>
              <p>{ subreddit.description }</p>
              <p>{ subreddit.url }</p>
            </div> 
          ))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const subreddits = selectors.getSubreddits(state);
  return {
    subreddits,
    subscribedSubreddits: selectors.getSubscribedSubreddits(state),
  }
};

export default connect(mapStateToProps)(Subscriptions);