import React from 'react';
import ScrollArea from 'react-scrollbar';
import Comment from './Comment';

const Comments = ({ comments })=> (
  <ScrollArea
    speed={ 0.8 }
    className="threadComments threadComponent"
    contentClassName="content"
    horizontal={ false }
  >
   {
    <div className="Comments">
      {
        comments.map(comment => (
          <div className="comment" key={ comment.score }>
            <Comment comment={ comment } />
          </div>
        ))
      }
    </div>
   }
  </ScrollArea>
)

export default Comments;

