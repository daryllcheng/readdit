import React from 'react';
import ScrollArea from 'react-scrollbar';
import timeago from 'timeago.js';
import ReactStars from 'react-stars'

const Content = ({ content, closeView, onClick }) => (
  <ScrollArea
    speed={ 0.8 }
    className="threadComponent"
    contentClassName="content"
    horizontal={ false }
  >
  { 
    <div>
      <div onClick={ () => closeView(() => onClick(undefined))} style={{ "fontSize": "2em", "color": "Tomato" }}>
        <i className="fas fa-times-circle pulsate"></i>
      </div>
      <div className="contentTitle">
        <h2>{ content.title }</h2>
      </div>
      <div className="postInfo">
        <span className="timeAgo">{ timeago().format(new Date(content.created*1000).toLocaleString()) }</span>
        <span>{ ` in ` }</span>
        <span className="subredditUrl">{ content.subredditUrl }</span>
        <span>{ ` by ` }</span>
        <span className="author">{ content.author }</span>
        <span className="pill">{ content.upvotes }</span>
        {
          content.gilded ? 
          <ReactStars count={ content.gilded } value={ content.gilded } color2={ '#ffd700' } edit={ false }/> :
          <span />
        }
      </div>
      <div>
        {
          content.url ?
          <a href={ content.url } target="_blank">
            <i className="fas fa-link pulsate"></i>
          </a> :
          <div/>
        }
      </div>
        {
          content.preview ?
          <img src={ content.preview } className="contentImage" alt="defaultPreview" /> :
          <div/>
        }
      <div className="contentBody">
        <p>{ content.body }</p>
      </div>
    </div>
  }
  </ScrollArea>
)



export default Content;