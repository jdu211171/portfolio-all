import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Gallery.module.css";

const Gallery = ({ galleryUrls, newImages, deletedUrls, editMode, updateEditData }) => {
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    updateEditData(files);
  };

  useEffect(() => {
    // Create object URLs for new images
    const urls = newImages.map((file) => URL.createObjectURL(file));
    setImageUrls(urls);

    // Cleanup function to revoke object URLs when component unmounts or new images change
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImages]);

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <Box className={styles.galleryContainer} onClick={handleClickOpen}>
        {galleryUrls.slice(0, 2).map((url, index) => (
          <img
            key={`gallery-${index}`}
            src={url}
            alt={`Gallery ${index}`}
            className={styles.galleryImage}
          />
        ))}
        {editMode && (
          <label
            htmlFor="file-upload"
            className={styles.editPlaceholder}
            onClick={handleAddImageClick}
          >
            <Typography variant="h6">Add Image</Typography>
          </label>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          Gallery
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box className={styles.fullGalleryContainer}>
            {galleryUrls.map((url, index) => (
              <img
                key={`gallery-full-${index}`}
                src={url}
                alt={`Gallery ${index}`}
                className={styles.fullGalleryImage}
              />
            ))}
            {imageUrls.map((url, index) => (
              <img
                key={`new-${index}`}
                src={url}
                alt={`New Gallery ${index}`}
                className={styles.fullGalleryImage}
              />
            ))}
            {editMode && (
              <label
                htmlFor="file-upload"
                className={styles.editPlaceholder}
                onClick={handleAddImageClick}
              >
                <Typography variant="h6">Add Image</Typography>
              </label>
            )}
          </Box>
        </DialogContent>
      </Dialog>
      <Input
        id="file-upload"
        type="file"
        inputProps={{ multiple: true, accept: "image/*" }}
        style={{ display: "none" }} // Hide the file input
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default Gallery;
