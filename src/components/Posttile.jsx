import React from 'react';

const PostTile = ({ title, thumbnail, overlayClassname }) => (
  <div className="postTile" style={{ backgroundImage: `url(${ thumbnail })` }}>
    <div className={ overlayClassname }>
      <div className="postTitle">
        { title }
      </div> 
    </div>
  </div>
)

export default PostTile;