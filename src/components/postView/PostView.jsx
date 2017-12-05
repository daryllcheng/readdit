import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { animateIn, animateOut } from './Animations';
import Comments from './Comments';

class PostView extends Component {
  constructor(props) {
    super(props)

  }
  
  componentDidMount() {
    animateIn(ReactDOM.findDOMNode(this))
  }

  closeView(cb) {
    animateOut(ReactDOM.findDOMNode(this), cb)
  }

  render () {
    return (
      <div className='grid grid-to-animate' >
        {
          this.props.comments ? 
          <div className="card"> 
            <Comments comments={ this.props.comments } />
          </div> :
          <div/>
        }
        <div className="card">
          <p>{ this.props.post.title }</p>
        </div>   
          {
            this.props.post.thumbnail ?
            <div className="card">
              <img src={ this.props.post.thumbnail} /> 
            </div> :
            <div/>
          }
        <div className="card">
          <p>{ this.props.post.body }</p>
        </div>
        <button onClick={ () => this.closeView(() => this.props.onClick(undefined))}> Close </button>
      </div>
      )
  }
}

export default PostView;