import React from "react";
import { Link } from "react-router-dom";

const PostsList = ({ posts }) => (
  <div className="content-container">
    {posts.map((post, key) => (
      <Link className="post-list-item" key={key} to={`/post/${post.name}`}>
        <h3>{post.title}</h3>
      </Link>
    ))}
  </div>
);

export default PostsList;
