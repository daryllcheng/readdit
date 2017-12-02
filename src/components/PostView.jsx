import React from 'react'
import ReactDOM from 'react-dom'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import anime from 'animejs'

let currentAnimation

const clearCurrentAnimation = () => {
  if (currentAnimation) currentAnimation.pause()
}

const animationTimings = {
  gridEnter : 1200,
  gridLeave : 600,
  cardEnter : 300,
  cardLeave : 100,
  cardStagger : 50
}

const animateIn = (gridContainer) => {
  clearCurrentAnimation()
  const cards = gridContainer.querySelectorAll('.card')
  currentAnimation = anime.timeline()
  .add({
    targets: cards,
    opacity: 0,
    duration: 1
  })
  .add({
    targets: gridContainer,
    translateX: [-1000, 0],
    opacity: [0, 1],
    duration: animationTimings.gridEnter
  })
  .add({
    targets: cards,
    duration: 800,
    opacity: [0, 1],
    translateY: [-30, 0],
    delay: function (el, i, l) {
      return i * 100
    }
  })
}

const animateOut = (gridContainer, callback) => {
  clearCurrentAnimation()

  const cards = gridContainer.querySelectorAll('.card')
  currentAnimation = anime.timeline()
  .add({
    targets: cards,
    duration: 700,
    opacity: [1, 0],
    translateY: -30,
    delay: function (el, i, l) {
      return i * 100
    }
  })
  .add({
    targets: gridContainer,
    translateX: 1000,
    opacity: [1, 0],
    duration: 1000,
    complete: callback,
    offset: '-=200'
  })
}

class AnimatedGridContents extends React.Component {
  componentDidAppear () {
    animateIn(ReactDOM.findDOMNode(this))
  }
  componentDidEnter () {
    animateIn(ReactDOM.findDOMNode(this))
  }
  close (callback) {
    animateOut(ReactDOM.findDOMNode(this), callback)

  }

  render () {
    return (
      <div className='grid grid-to-animate' >
        {this.props.items.map((item) => {
          return <div className='card' key={item}>{item}</div>
        })}
        <button onClick={ () => this.close(() => this.props.onClick(undefined))}> Close </button>
      </div>
      )
  }
}

const PostView = ({ onClick, items }) => {
  return (
    <TransitionGroup>
      <AnimatedGridContents items={items} onClick={ onClick } key='AnimatedGridContents' />
    </TransitionGroup>
  )
}


export default PostView;