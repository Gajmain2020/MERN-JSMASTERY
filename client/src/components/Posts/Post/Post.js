import React from "react";
import moment from "moment";

import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

//styling elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import {
  Card,
  CardMedia,
  Button,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
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

  return (
    <Card>
      <CardMedia component="img" alt="green iguana" image={post.selectedFile} />
      <div>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user?.result?._id === post?.creator && (
        <div>
          <Button
            onClick={() => setCurrentId(post._id)}
            // style={{ color: "white" }}
            size="large"
          >
            <MoreHorizIcon fontSize="default" color="black" />
          </Button>
        </div>
      )}
      <div>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography gutterBottom variant="h5" component="h2">
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions>
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

// <div className="card">
//       <img className="post-image" src={post.selectedFile} alt="A post" />
//       <div className="pos-fixed">
//         <h3 className="post-title left-margin"> {post.title}</h3>
//         <h6 className="left-margin">{post.name}</h6>
//         <p className="left-margin">{moment(post.createdAt).fromNow()}</p>
//       </div>
//       <div className="message-tags">
//         <p className="left-margin">{post.tags.map((tag) => `#${tag} `)}</p>
//         <p className="left-margin">{post.message}</p>
//       </div>
//       <div>
//         <button
//           disabled={!user?.result}
//           className="btn btn-primary btn-sm"
//           onClick={() => dispatch(likePost(post._id))}
//         >
//           <Likes />
//         </button>
//         <button
//           className="btn btn-primary btn-sm"
//           onClick={() => dispatch(deletePost(post._id))}
//         >
//           Delete Icon Delete
//         </button>
//         <button
//           className="btn btn-primary btn-sm"
//           onClick={() => setCurrentId(post._id)}
//         >
//           Edit
//         </button>
//       </div>
//     </div>
