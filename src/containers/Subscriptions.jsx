import React, { Component } from 'react';
import { connect } from 'react-redux';

class Subscriptions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Subscriptions">
        Pick 5 Subreddits
      </div>
    );
  }
}

function mapStateToProps(state) {};

export default connect(mapStateToProps)(Subscriptions);