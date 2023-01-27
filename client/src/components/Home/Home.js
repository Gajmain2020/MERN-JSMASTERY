import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

import Chip from "@mui/material/Chip";
import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  Button,
  TextField,
  Autocomplete,
  ListItem,
} from "@mui/material";

import { useHistory, useLocation } from "react-router-dom";

import "./homeStyles.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  // const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();

  const searchPost = (e) => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery = ${search || "none"}&tags=${tags.join(
          "."
        )} `
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleKeyPressTags = (e) => {
    if (e.keyCode === 13) {
      handleAddChip(tag);
      setTag("");
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (e, tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  // if (isLoading) return <div>Loading...</div>;
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className="gridContainer"
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className="appBarSearch" position="static" color="inherit">
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* TESTING HERE */}

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

              <Button
                onClick={searchPost}
                className="searchButton"
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />

            {!searchQuery && !tags.length && (
              <Paper className="pagination" elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

//    for Loading text
// setIsLoading(true);
// fetch("http://localhost:5000/posts")
// .then((res) => res.json())
// dispatch(getPosts()).then((res) => {
//   console.log("response from fetch", res);
//   dispatch({ type: FETCH_ALL, payload: res });
//   setIsLoading(false);
// });
