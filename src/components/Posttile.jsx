import React, { Component } from 'react';
import Measure from 'react-measure';
import classNames from 'classnames';

class PostTile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
      device: "big"
    }
  }

  handleMouseOver() {
		this.setState({ hover: true });
	}

	handleMouseOut() {
		this.setState({ hover: false });
	}

  handleResize(contentRect) {
    if (contentRect.bounds.width < 700) {
      this.setState({
        device: "small"
      })
    } else {
      this.setState({
        device: "big"
      })
    }
    console.log(`hover: ${ this.props.hover }`)
  }

  render() {
    let overlay, filter, opacity;
    overlay = this.state.hover ? 'linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0))' : 'none';
    opacity = this.state.hover ? '1' : '0';

    return (
      <Measure
        bounds
        onResize={ (contentRect) => this.handleResize(contentRect) }
      >
        {
          ({ measureRef }) =>
          <div 
            ref={ measureRef } 
            className="postTile"
            style={{ backgroundImage: `url(${ this.props.thumbnail })` }}
            onMouseOver={ () => this.handleMouseOver() }  
            onMouseOut={ () => this.handleMouseOut() } 
          >
            <div className="postOverlay" style={{ background: overlay } } >
              <div className="postTitle" style={{ opacity: opacity }}>
                { this.props.title }
              </div> 
            </div>
          </div>
        }
        </Measure>
    )
  }
}

export default PostTile;