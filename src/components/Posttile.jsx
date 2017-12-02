import React from 'react';

const PostTile = ({ post, onClick }) => (
  <div style={{width: '19em'}} onClick={ () => onClick(post.id) }>
    { post.title }
  </div>
)

export default PostTile;