import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const deletePostAPI = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
};

export const updatePostAPI = async (postId, updatedPost) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, updatedPost);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    return null;
  }
};

export const fetchPhotos = async () => {
  try {
    const response = await axios.get(`${API_URL}/photos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
