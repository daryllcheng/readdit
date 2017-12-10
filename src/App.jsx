import React, { Component } from "react";
import { connect } from "react-redux";
import * as selectors from "./store/reducers/selectors";
import Navigation from "./containers/Navigation";
import Subscriptions from "./containers/Subscriptions";
import Posts from "./containers/Posts";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background" style={{ backgroundImage: "url(assets/dust_scratches.png)" }} />
        <Navigation />
        {
          this.props.renderDialog ?
          <Subscriptions /> :
          <div />
        }
        <Posts/>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    renderDialog: selectors.renderDialog(state)
  };
};

export default connect(mapStateToProps)(App);