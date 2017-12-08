import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../store/reducers/selectors';
import {  switchFilter } from '../store/actions/posts_action';
import { toggleSuggestions } from '../store/actions/subscriptions_action';
import RaisedButton from 'material-ui/RaisedButton';
import SubredditFilter from '../components/SubredditFilter';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.onFilterSwitch = this.onFilterSwitch.bind(this);
  }

  handleOpen() {
    this.props.dispatch(toggleSuggestions());
  };

  onFilterSwitch(newFilter) {
    this.props.dispatch(switchFilter(newFilter));
  }

  render() {
    return (
      <div className="Navigation">
        <h1 className="logo">Reddit</h1>
        <div label="subredditSuggestions" onClick={ () => this.handleOpen() }>
          <i className="fas fa-plus-circle"></i>
        </div>
        <span className="filter">
          <SubredditFilter 
            subscribedSubreddits={ this.props.subscribedSubreddits } 
            currentFilter={ this.props.currentFilter } 
            onFilterSwitch={ this.onFilterSwitch }
          />
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subscribedSubreddits: selectors.getSubscribedSubreddits(state),
    currentFilter: selectors.getCurrentFilter(state),
  }
};

export default connect(mapStateToProps)(Navigation);