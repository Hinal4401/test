import React, { createContext, useEffect, useState } from "react";
import { fetchPosts, deletePostAPI, updatePostAPI } from "./api";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsData = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
    };

    fetchPostsData();
  }, []);

  const deletePostById = async (postId) => {
    const deletePost = await deletePostAPI(postId);
    if (deletePost) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  const updatePost = async (postId, updatedPost) => {
    const updated = await updatePostAPI(postId, updatedPost);
    if (updated) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    }
    return updated;
  };

  return (
    <PostContext.Provider value={{ posts, deletePostById, updatePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
