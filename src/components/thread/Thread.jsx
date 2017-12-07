import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { animateIn, animateOut } from './Animations';
import Comments from './Comments';
import Content from './Content';

class Thread extends Component {
  constructor(props) {
    super(props)

    this.closeView = this.closeView.bind(this);
  }
  
  componentDidMount() {
    animateIn(ReactDOM.findDOMNode(this))
  }

  closeView(cb) {
    animateOut(ReactDOM.findDOMNode(this), cb)
  }

  render () {
    return (
      <div className="threadContainer" >
        <div>
          <Content 
            content={ this.props.post } 
            closeView={ this.closeView } 
            onClick={ this.props.onClick } 
          />
        </div>
        <div className="threadComments threadComponent">
        {
          this.props.comments ? 
          <Comments comments={ this.props.comments } /> :
          <div/>
        }
        </div>
      </div>
      )
  }
}

export default Thread;