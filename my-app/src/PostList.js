import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  Pagination,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import PostContext from "./Postcontext";
import { deletePostAPI } from "./api";
import "./App.css";

const PostList = () => {
  const { posts, deletePostById } = useContext(PostContext);
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const postsPerPage = 18;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handleDelete = async (postId) => {
    const success = await deletePostAPI(postId);
    if (success) {
      deletePostById(postId);
    }
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <Grid key={post.id} item xs={4} lg={2} sm={4} md={2}>
        <Grid
          style={{
            border: "1px solid #000",
            padding: "10px",
            borderRadius: "5px",
            maxHeight: "150px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <Stack className="post-body">
            <Typography sx={{ color: "black" }}>Title</Typography>
            <Typography sx={{ color: "gray" }}>{post.title}</Typography>
          </Stack>
          <Stack className="post-body">
            <Typography sx={{ color: "black" }}>Description</Typography>
            <Typography sx={{ color: "gray" }}>{post.body}</Typography>
          </Stack>
          <Box>
            <Button onClick={() => handleReadMore(post)} sx={{ fontSize: 8 }}>
              Read More
            </Button>
            <IconButton onClick={() => handleDelete(post.id)}>
              <DeleteIcon style={{ color: "red", fontSize: 14 }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    ));
  };

  return (
    <div>
      <Typography variant="h5">Posts</Typography>
      <Grid container spacing={2}>
        {renderPosts()}
      </Grid>
      <Pagination
        count={Math.ceil(posts.length / postsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: "20px" }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post Details</DialogTitle>
        <DialogContent>
          {selectedPost && (
            <>
              <Typography variant="h6">{selectedPost.title}</Typography>
              <Typography variant="body1">{selectedPost.body}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostList;
