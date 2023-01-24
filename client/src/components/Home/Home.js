import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { FETCH_ALL } from "../../constants/actionTypes";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    // setIsLoading(true);
    // fetch("http://localhost:5000/posts")
    // .then((res) => res.json())
    // dispatch(getPosts()).then((res) => {
    //   console.log("response from fetch", res);
    //   dispatch({ type: FETCH_ALL, payload: res });
    //   setIsLoading(false);
    // });
  }, [currentId, dispatch]);
  // if (isLoading) return <div>Loading...</div>;
  return (
    <div className="content">
      <div className="row align-items-start">
        <div className="col">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="col">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
