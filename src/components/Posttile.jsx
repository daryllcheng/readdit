import React, { Component } from 'react';

const PostTile = ({ title, thumbnail }) => (
  <div className="postTile" style={{ backgroundImage: `url(${ thumbnail })` }}>
    <div className="postOverlay">
      <div className="postTitle">
        { title }
      </div> 
    </div>
  </div>
)

export default PostTile;