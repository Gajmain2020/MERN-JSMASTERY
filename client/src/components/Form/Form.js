import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import FileBase from "react-file-base64";

//  Importing Actions
import { createPost, updatePost } from "../../actions/posts";

import { Paper, Typography } from "@mui/material";

//  Styling Elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

//  GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  // const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper>
        <Typography varient="h6" align="center" className="paper">
          {" "}
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <div className="form">
      <div className="form-heading">
        <h5
          className="
        heading"
        >
          {currentId ? "Editing" : "Creating"} A Memory
        </h5>
        <form
          autoComplete="off"
          noValidate
          className="main-form"
          onSubmit={handleSubmit}
        >
          {/* For Title */}
          <input
            type="text"
            name="title"
            className="input-field"
            placeholder="Title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          {/* {showError ? "Please Enter Title" : null} */}

          {/* For Message */}
          <input
            type="text"
            name="message"
            className="input-field"
            placeholder="Message"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></input>

          {/* For Tags */}
          <input
            type="text"
            name="tags"
            className="input-field"
            placeholder="Tags"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          ></input>

          {/* input file */}
          <div className="input-field file-input">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
            {/* Submit Button */}
            <button className="btn btn-success input-field" type="submit">
              Click To Submit
            </button>
            {/* Reset Button */}

            <button className="btn btn-warning input-field" onClick={clear}>
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
