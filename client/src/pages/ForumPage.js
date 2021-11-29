import React from "react";
import PostsList from "../components/PostsList";
import postContent from "./post-content";

const ForumPage = () => {
  return (
    <div className="content-container">
      <h1>Plant Care Forum</h1>
      <PostsList posts={postContent} />
    </div>
  );
};

export default ForumPage;
