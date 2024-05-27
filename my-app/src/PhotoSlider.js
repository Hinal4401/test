import React, { useContext } from "react";
import { Typography } from "@mui/material";
import PhotoContext from "./PhotoContext";
import "./App.css";

const PhotoSlider = () => {
  const photos = useContext(PhotoContext);

  if (!photos || photos.length === 0) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div className="photo-slider-container">
      <Typography variant="h5">Photo Slider</Typography>
      <div className="photo-slider">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-slide">
            <img
              src={photo.url}
              alt={photo.title}
              className="photo-slide-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSlider;
