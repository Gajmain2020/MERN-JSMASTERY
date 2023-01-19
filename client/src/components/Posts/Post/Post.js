import React from "react";
import moment from "moment";

import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//styling elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <img className="post-image" src={post.selectedFile} alt="A post" />
      <div className="pos-fixed">
        <h3 className="post-title left-margin"> {post.title}</h3>
        <h6 className="left-margin">{post.creator}</h6>
        <p className="left-margin">{moment(post.createdAt).fromNow()}</p>
      </div>
      <div className="message-tags">
        <p className="left-margin">{post.tags.map((tag) => `#${tag} `)}</p>
        <p className="left-margin">{post.message}</p>
      </div>
      <div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => dispatch(likePost(post._id))}
        >
          thumbs up icon Like {post.likeCount}
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => dispatch(deletePost(post._id))}
        >
          Delete Icon Delete
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setCurrentId(post._id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Post;
