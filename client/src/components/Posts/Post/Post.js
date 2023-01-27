import React from "react";
import moment from "moment";

import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

//styling elements
import "bootstrap/dist/css/bootstrap.css";
import "./cardStyles.css";
import {
  Card,
  CardMedia,
  Button,
  Typography,
  CardActions,
  ButtonBase,
  CardContent,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} Like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className="card" raised elevation={6}>
      <ButtonBase className="cardAction" onClick={openPost}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={post.selectedFile}
          className="media"
        />
        <div className="overlay">
          <Typography className="leftAlign" variant="h6">
            {post.name}
          </Typography>
          <Typography className="leftAlign" variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {user?.result?._id === post?.creator && (
          <div className="overlay2">
            <Button
              onClick={() => setCurrentId(post._id)}
              // style={{ color: "white" }}
              size="large"
            >
              <MoreHorizIcon fontSize="default" color="black" />
            </Button>
          </div>
        )}
        <div className="details">
          <Typography
            className="leftAlign"
            variant="body2"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag}  `)}
          </Typography>
        </div>
        <Typography className="title" gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            className="leftAlign"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
