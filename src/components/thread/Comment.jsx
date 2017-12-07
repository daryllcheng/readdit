import React from 'react';

const Comment = ({ comment })=> (
  <div className="comment">
    <div>
      <p>{ comment.author }</p>
      <p>{ comment.body }</p>
    </div>
  </div>
)

export default Comment;