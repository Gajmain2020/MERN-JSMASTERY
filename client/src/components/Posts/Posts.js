import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import { Grid, CircularProgress } from "@mui/material";

//styling elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  // console.log(posts);

  if (!posts.length && !isLoading) return "No Post";

  return isLoading ? (
    <CircularProgress size="lg" color="secondary" />
  ) : (
    <Grid className="container" container alignItems="streach" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
