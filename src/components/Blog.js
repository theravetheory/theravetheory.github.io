import React from 'react';
import Draggable from "react-draggable";


function Blog() {

  return (
    <Draggable>
      <div className = "blog-window">
      <iframe src="https://thebrowser.com/" width="500" height="600" title="W3Schools Free Online Web Tutorials"></iframe>
      </div>
    </Draggable>
  );
}

export default Blog;