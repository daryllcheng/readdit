import React from 'react';

const Posttile = ({ post, onClick }) => (
  <div style={{width: '19em'}} onClick={ onClick(post.Id) }>
    { post.title }
  </div>
)

export default Posttile;