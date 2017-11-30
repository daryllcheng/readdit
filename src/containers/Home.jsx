import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Home">
        Home
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  }
};

export default connect(mapStateToProps)(Home);