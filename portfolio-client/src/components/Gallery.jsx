import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Gallery.module.css";

const Gallery = ({ galleryUrls }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box className={styles.galleryContainer} onClick={handleClickOpen}>
        {galleryUrls.slice(0, 2).map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Gallery ${index}`}
            className={styles.galleryImage}
          />
        ))}
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
                key={index}
                src={url}
                alt={`Gallery ${index}`}
                className={styles.fullGalleryImage}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;
