import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

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

