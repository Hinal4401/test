import React, { createContext, useState, useEffect } from "react";
import { fetchPhotos } from "./api";

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotosData = async () => {
      try {
        const photosData = await fetchPhotos();
        setPhotos(photosData.slice(0, 10));
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotosData();
  }, []);

  return (
    <PhotoContext.Provider value={photos}>{children}</PhotoContext.Provider>
  );
};

export default PhotoContext;
