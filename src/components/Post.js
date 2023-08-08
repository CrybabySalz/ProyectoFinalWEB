import React from "react";

const Post = ({ username, content, imageUrl }) => {
  return (
    <div className="post">
      <h3>{username}</h3>
      <p>{content}</p>
      {imageUrl && <img src={imageUrl} alt="Post" />}
    </div>
  );
};

export default Post;
