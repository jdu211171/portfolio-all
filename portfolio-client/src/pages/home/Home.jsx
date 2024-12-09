import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../utils/axiosUtils";
import { useAlert } from "../../contexts/AlertContext";

import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";

import styles from "./Home.module.css";
import Photo1 from "../../assets/Photo1.jpg";
import Photo2 from "../../assets/Photo2.jpg";
import { Box, Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [editData, setEditData] = useState("");
  const [editMode, setEditMode] = useState(false);

  const showAlert = useAlert();

  const fetchHomePageData = async () => {
    const userRole = sessionStorage.getItem("role");
    await setRole(userRole);
    try {
      const response = await axios.get("/api/settings/homepage");
      await setEditData(response.data.value);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
  };

  const handleContentChange = (newContent) => {
    setEditData(newContent);
  };

  const handleClick = () => {
    navigate("/student");
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleCancel = () => {
    fetchHomePageData();
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/settings/homepage`, {
        value: editData,
      });

      if (response.status === 200) {
        setEditMode(false);
        showAlert("Changes saved successfully!", "success");
      }
    } catch (error) {
      console.error("Error updating homepage data:", error);
    }
  };

  useEffect(() => {
    fetchHomePageData();
  }, []);

  return (
    <div>
      <Box className={styles.header}>
        <h3>
          <a href="https://www.jdu.uz/">Japan Digital University</a>
        </h3>
        <Box display={"flex"} gap={"10px"}>
          {role == "Admin" && (
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
                  編集
                </Button>
              )}
            </>
          )}
        </Box>
      </Box>
      <div className={styles.container}>
        <div className={styles.textSection}>
          {editMode && (
            <RichTextEditor value={editData} onChange={handleContentChange} />
          )}

          {!editMode && (
            <>
              <p
                className={styles.textParagraph}
                dangerouslySetInnerHTML={{ __html: editData }}
              ></p>
            </>
          )}

          {/* <div className={styles.titleContainer}>
            <span className={styles.subtitle}>より良い</span>
            <span className={styles.title}>明日へ</span>
          </div> */}

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleClick}>
              次へ➜
            </button>
          </div>
        </div>
        <div className={styles.imageSection}>
          <img src={Photo1} alt="Large class photo" />
          <img src={Photo2} alt="Group photo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
