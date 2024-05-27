import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Box, Stack, TextField } from "@mui/material";
import PostContext from "./Postcontext";
import { updatePostAPI } from "./api";
import PhotoSlider from "./PhotoSlider";

const PostDetails = () => {
  const { id } = useParams();
  const { posts } = useContext(PostContext);
  const post = posts.find((post) => post.id == id);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post ? post.title : "");
  const [body, setBody] = useState(post ? post.body : "");

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedPost = { ...post, title, body };
    const updated = await updatePostAPI(post.id, updatedPost);
    if (updated) {
      setTitle(updated.title);
      setBody(updated.body);
      setIsEditing(false);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6">Title:</Typography>
        {isEditing ? (
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        ) : (
          <Typography>{post.title}</Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" marginTop={2}>
        <Typography variant="h6">Body:</Typography>
        {isEditing ? (
          <TextField
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        ) : (
          <Typography>{post.body}</Typography>
        )}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        display="flex"
        justifyContent="center"
        marginTop="10px"
      >
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>
      <PhotoSlider />
    </Box>
  );
};

export default PostDetails;
