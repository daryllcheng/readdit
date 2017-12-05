import React from 'react';

const Comments = ({ comments })=> (
  <div className="Comments">
    {
      comments.slice(1, 5).map(comment => (
        <div className="comment" key={ comment.author }>
          <p>{ comment.author }</p>
        </div>
      ))
    }
  </div>
)

export default Comments;

