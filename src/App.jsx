import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Selectors from './store/reducers/selectors';
import Subscriptions from './containers/Subscriptions';
import Posts from './containers/Posts';
import Navigation from './containers/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {
          this.props.renderSuggestions ?
          <Subscriptions /> :
          <div></div>
        }
        <Posts/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    renderSuggestions: Selectors.renderSuggestions(state)
  };
}

export default connect(mapStateToProps)(App);

