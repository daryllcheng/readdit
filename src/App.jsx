import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Selectors from './store/reducers/selectors';
import Subscriptions from './containers/Subscriptions';
import Navigation from './containers/Navigation';
import Posts from './containers/Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background" style={{ backgroundImage: "url(assets/dust_scratches.png)" }} />
        <Navigation />
        {
          this.props.renderDialog ?
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
    renderDialog: Selectors.renderDialog(state)
  };
}

export default connect(mapStateToProps)(App);

