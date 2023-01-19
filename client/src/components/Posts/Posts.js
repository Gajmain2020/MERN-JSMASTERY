import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

//styling elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);
  return (
    <div className="container">
      {posts.map((post) => (
        <div className="item" key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
