import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  useParams,
  useNavigate,
  useLocation,
  Outlet,
  NavLink,
} from "react-router-dom";
import axios from "../../../utils/axiosUtils";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./CompanyProfile.module.css";

import Gallery from "../../../components/Gallery";
import TextField from "../../../components/TextField/TextField";

const CompanyProfile = ({ userId = 0 }) => {
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  const { recruiterId } = location.state || {};

  let id;
  if (userId != 0) {
    id = userId;
  } else {
    id = recruiterId;
  }

  const [company, setCompany] = useState(null);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`/api/recruiters/${id}`);
        setCompany(response.data);
        setEditData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompany();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/recruiters/${id}`, editData);
      setCompany(editData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving student data:", error);
    }
  };

  const handleCancel = () => {
    setEditData(company);
    setEditMode(!editMode);
  };

  const handleUpdateEditData = (key, value) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      [key]: value,
    }));
  };

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryUrls, setGalleryUrls] = useState([]);

  const handleGalleryOpen = () => {
    setGalleryOpen(true);
  };

  const generateGalleryUrls = (numImages) => {
    return Array.from(
      { length: numImages },
      (_, index) => `https://picsum.photos/300/200?random=${index + 1}`
    );
  };

  useEffect(() => {
    setGalleryUrls(generateGalleryUrls(8));
  }, []);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid container>
        <Grid></Grid>
      </Grid>

      <Box className={styles.topControlButtons}>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "grey.300",
            flexGrow: 1,
          }}
        >
          <IconButton onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>
          | Back
        </Box>
        <Box id="saveButton">
          <Box my={2} className={styles.buttonsContainer}>
            {role == "Recruiter" && (
              <>
                {editMode ? (
                  <>
                    <Button
                      onClick={handleSave}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      保存
                    </Button>

                    <Button
                      onClick={handleCancel}
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      キャンセル
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={toggleEditMode}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    プロフィールを編集
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box className={styles.container}>
        <Box className={styles.avatarContainer}>
          <Avatar
            src={company.photo}
            alt={company.first_name}
            sx={{ width: 130, height: 130 }}
          />
        </Box>
        <Box className={styles.infoContainer}>
          <Box className={styles.nameEmailContainer}>
            <Box>
              <Typography
                variant="h4"
                component="div"
                className={styles.mainTitle}
              >
                {company.first_name} {company.last_name}
              </Typography>
            </Box>
            <Box>
              <a href={`mailto:${company.email}`} className={styles.email}>
                <EmailIcon className={styles.emailIcon} />
                {company.email}
              </a>
            </Box>
          </Box>
          <Box className={styles.chipContainer}>
            <Chip
              label={`${company.company_name}`}
              variant="outlined"
              color="primary"
              sx={{
                fontSize: "16px",
                padding: "2px 6px",
                height: "auto",
                lineHeight: 1,
                width: "160px",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box p={2}>
        <TextField
          title="会社概要"
          data={company.company_description}
          editData={editData}
          editMode={editMode}
          updateEditData={handleUpdateEditData}
          keyName="company_description"
        />
        <Gallery
          galleryUrls={galleryUrls.slice(0, 2)}
          onClick={handleGalleryOpen}
        />
      </Box>
    </Box>
  );
};

export default CompanyProfile;
