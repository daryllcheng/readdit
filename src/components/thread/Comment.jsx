import React from 'react';
import timeago from 'timeago.js';
import ReactStars from 'react-stars'

const Comment = ({ comment })=> (
  <div className="comment">
    <div className="commentInfo">
      <span className="author">{ comment.author }</span>
      <span className="pill">{ comment.score }</span>
      <span className="timeAgo" >{ timeago().format(new Date(comment.created*1000).toLocaleString()) }</span>
      {
        comment.gilded ? 
        <ReactStars count={ comment.gilded } value={ comment.gilded } color2={ '#ffd700' } edit={ false }/> :
        <span />
      }
    </div>
    <div className="commentBody">
      <p>{ comment.body }</p>
    </div>
  </div>
)

export default Comment;