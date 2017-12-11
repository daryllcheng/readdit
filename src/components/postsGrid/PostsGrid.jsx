import React from "react";
import { CSSGrid, layout, makeResponsive, measureItems } from "react-stonecutter";
import PostTile from "./PostTile";
import EmptyGrid from "./EmptyGrid";

const PostsGrid = ({ posts, handleClick }) => {
  const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
    maxWidth: 1920
  });

  return (
    <div>
      {
        posts && posts.length > 1 ?
        <div className="grid">
          <Grid
            component="ul"
            columns={ 4 }
            columnWidth={ 315 }
            gutterWidth={ 5 }
            gutterHeight={ 15 }
            layout={ layout.pinterest }
            duration={ 200 }
            easing="ease-out"
          >
            {
              posts.map(post => (
                <li 
                  key={ post.id }
                  onClick={ () => handleClick(post.id, post.subredditUrl) }
                >
                  <PostTile 
                    title={ post.title.length > 150 ? `${ post.title.slice(0, 150) }...` : post.title }
                    thumbnail={ post.preview === "" ? `assets/defaultPreview.jpg` : post.preview}
                    overlayClassname={ post.preview === "" ? "textOverlay" : "imageOverlay" }
                  />
                </li>
              ))
            }
          </Grid>
        </div> :
        <EmptyGrid />
      } 
   </div>
  )
}

export default PostsGrid;