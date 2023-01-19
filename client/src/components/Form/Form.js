import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import FileBase from "react-file-base64";

//  Importing Actions
import { createPost, updatePost } from "../../actions/posts";

//  Styling Elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

//  GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
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
          {/* for creator */}
          <div className="inputs">
            <input
              type="text"
              name="creator"
              className="input-field"
              placeholder="Creator"
              value={postData.creator}
              onChange={(e) =>
                setPostData({ ...postData, creator: e.target.value })
              }
            ></input>

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
            ></input>

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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
