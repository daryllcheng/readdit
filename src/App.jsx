import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Selectors from './store/reducers/selectors';
import Subscriptions from './containers/Subscriptions';
import Home from './containers/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Subscriptions />
        <Home />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUserReady: Selectors.renderHomepage(state)
  };
}

export default connect(mapStateToProps)(App);
