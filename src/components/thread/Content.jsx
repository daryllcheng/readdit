import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';
import timeago from 'timeago.js';
import ReactStars from 'react-stars'

const Content = ({ content, closeView, onClick }) => (
  <ScrollArea
    speed={ 0.8 }
    className="threadContent threadComponent"
    contentClassName="content"
    horizontal={ false }
  >
  { 
    <div>
      <button className="threadButton" onClick={ () => closeView(() => onClick(undefined))}> Close </button>
      <div className="contentTitle">
        <h2>{ content.title }</h2>
      </div>
      <div className="postInfo">
        <span>{ `${ timeago().format(new Date(content.created*1000).toLocaleString()) } in ${ content.subredditUrl } by ${ content.author }` }</span>
        <span className="upvotes">{ content.upvotes }</span>
        {
          content.gilded ? 
          <ReactStars count={ content.gilded } value={ content.gilded } color2={ '#ffd700' } edit={ false }/> :
          <span />
        }
      </div>
      <div>
        {
          content.url ?
          <a href={ content.url } target="_blank">Source</a> :
          <div/>
        }
      </div>
      <div>
        {
          content.preview ?
          <img src={ content.preview } className="contentImage" /> :
          <div/>
        }
      </div>
      <div className="contentBody">
        <p>{ content.body }</p>
      </div>
    </div>
  }
  </ScrollArea>
)



export default Content;