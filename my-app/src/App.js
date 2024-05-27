import React from "react";
import { Container } from "@mui/material";
import { PostProvider } from "./Postcontext";
import PostList from "./PostList";
import PostDetails from "./PostDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PhotoProvider } from "./PhotoContext";

const App = () => {
  return (
    <Router>
      <PostProvider>
        <PhotoProvider>
          <Container>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetails />} />
            </Routes>
          </Container>
        </PhotoProvider>
      </PostProvider>
    </Router>
  );
};

export default App;
