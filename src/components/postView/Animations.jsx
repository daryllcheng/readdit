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

export function animateIn(gridContainer) {
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

export function animateOut(gridContainer, callback) {
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