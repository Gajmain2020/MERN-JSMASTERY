import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//ADDING POSTS COMPONENT
import Posts from "./components/Posts/Posts";
import Navbar from "./components/Navbar/Navbar";

//ADDING FORM COMPONENTS
import Form from "./components/Form/Form";

import { getPosts } from "./actions/posts";
//styling elements
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

//ADDING STYLES TO THE REACT APP USING MATERIAL UI
// import useStyles from "./styles";

const App = () => {
  // const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <div className="container">
        <Navbar />
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
      </div>
    </>
  );
};

export default App;
