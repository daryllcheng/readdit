import React , { Component } from 'react'
import ReactDOM from 'react-dom'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { animateIn, animateOut } from './Animations';

class PostView extends Component {
  constructor(props) {
    super(props)

  }
  componentDidAppear() {
    animateIn(ReactDOM.findDOMNode(this))
  }

  closeView(cb) {
    animateOut(ReactDOM.findDOMNode(this), cb)

  }

  render () {
    return (
      <div className='grid grid-to-animate' >
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
        {
          this.props.comments ? this.props.comments.slice(1, 5).map(comment => (
            <div className="card" key={ comment.author }>
              <p>{ comment.author }</p>
            </div>
          )) :
          <div />
        }
        <button onClick={ () => this.closeView(() => this.props.onClick(undefined))}> Close </button>
      </div>
      )
  }
}

export default PostView;