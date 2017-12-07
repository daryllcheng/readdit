import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';

const Content = ({ content, closeView, onClick }) => (
  <ScrollArea
    speed={0.8}
    className="threadContent threadComponent"
    contentClassName="content"
    horizontal={false}
  >
  { 
    <div>
      <div className="contentTitle">
        <h2>{ content.title }</h2>
      </div>
      <button className="threadButton" onClick={ () => closeView(() => onClick(undefined))}> Close </button>
      <div className="postInfo">
        <span>{ `URL: ${ content.url } `}</span>
        <span>{ `UPVOTES: ${ content.upvotes } `}</span>
        <span>{ `CREATED: ${ content.created } `}</span>
      </div>
      <div>
        <span>
        {
          content.preview ?
          <img src={ content.preview } className="contentImage" /> :
          <div/>
        }
        </span>
      </div>
      <div className="contentBody">
        <p>{ content.body }</p>
      </div>
    </div>
  }
  </ScrollArea>
)



export default Content;