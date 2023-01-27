import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import FileBase from "react-file-base64";

import { useHistory } from "react-router-dom";

//  Importing Actions
import { createPost, updatePost } from "../../actions/posts";

import {
  Paper,
  Typography,
  Button,
  TextField,
  ListItem,
  Chip,
} from "@mui/material";

//  Styling Elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

//  GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    // setCurrentId(0);

    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost(
          { ...postData, name: user?.result?.name, tags: tags },
          history
        )
      );

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
      <Paper className="paper" elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const handleKeyPressTags = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleAddChip(tag);
      setTag("");
    }
  };
  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteChip = (e, tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Paper className="paper" elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div style={{ padding: "5px 0", width: "100%" }}>
          <TextField
            onKeyDown={handleKeyPressTags}
            name="tagInput"
            variant="outlined"
            label="Tags"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <ListItem>
            {tags.map((tagSingle) => (
              <Chip
                value={tagSingle}
                label={tagSingle}
                onDelete={(e) => handleDeleteChip(e, tagSingle)}
              />
            ))}
          </ListItem>
        </div>
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className="buttonSubmit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          // onKeyDown={handleKeyPress}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
