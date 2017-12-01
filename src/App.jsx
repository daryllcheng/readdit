import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Selectors from './store/reducers/selectors';
import Subscriptions from './containers/Subscriptions';
import Home from './containers/Home';

class App extends Component {
  render() {
    console.log(this.props.renderSuggestions);
    return (
      <div className="App">
        {
          this.props.renderSuggestions ?
          <Subscriptions /> :
          <div></div>
        }
        <Home />
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

