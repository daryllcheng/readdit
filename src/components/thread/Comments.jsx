import React from "react";
import ScrollArea from "react-scrollbar";
import Comment from "./Comment";

const Comments = ({ comments })=> (
  <ScrollArea
    speed={ 0.8 }
    className="threadComponent"
    contentClassName="content"
    horizontal={ false }
  >
   {
    <div className="Comments">
      {
        comments.map(comment => (
          <Comment key={ comment.id }comment={ comment } />
        ))
      }
    </div>
   }
  </ScrollArea>
);

export default Comments;