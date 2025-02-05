import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactDOM from "react-dom";

import axios from "../../../utils/axiosUtils";
import { Box, Tabs, Tab, Button } from "@mui/material";
import Gallery from "../../../components/Gallery";
import TextField from "../../../components/TextField/TextField";
import SkillSelector from "../../../components/SkillSelector/SkillSelector";
import Deliverables from "../../../components/Deliverables/Deliverables";
import QA from "../../../pages/Profile/QA/QA";
import { useAlert } from "../../../contexts/AlertContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import translations from "../../../locales/translations"; // Импортируем переводы
import styles from "./Top.module.css";

const Top = () => {
  let id;
  const role = sessionStorage.getItem("role");
  const { studentId } = useParams();
  const location = useLocation();
  const { userId } = location.state || {};
  const { language } = useLanguage(); // Получение текущего языка из контекста

  const t = (key) => translations[language][key] || key; // Функция перевода

  if (userId !== 0 && userId) {
    id = userId;
  } else {
    id = studentId;
  }
  const showAlert = useAlert();

  const [student, setStudent] = useState(null);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [deletedUrls, setDeletedUrls] = useState([]);
  const [deliverableImages, setDeliverableImages] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        const mappedData = mapData(response.data);
        setStudent(mappedData);
        setEditData(mappedData);
      } catch (error) {
        showAlert("Error fetching student data", "error");
      }
    };

    fetchStudent();
  }, [id]);

  const mapData = (data) => {
    // Keys that should be moved inside 'introduction'
    const introductionKeys = [
      "gallery",
      "self_introduction",
      "hobbies",
      "other_information",
      "it_skills",
      "skills",
    ];

    return {
      ...data, // Keep existing data
      introduction: introductionKeys.reduce((acc, key) => {
        acc[key] = data[key] || ""; // Move keys inside 'introduction', default to an empty string if undefined
        return acc;
      }, {}),
    };
  };

  const handleUpdateEditData = (key, value) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      ...(key === "deliverables"
        ? { [key]: value } // Directly set 'deliverables'
        : { introduction: { ...prevEditData.introduction, [key]: value } }), // Set inside 'introduction'
    }));
  };
  console.log(editData);
  const handleGalleryUpdate = (
    files,
    isNewFiles = false,
    isDelete = false,
    parentKey = null
  ) => {
    if (isNewFiles && !isDelete) {
      // Convert FileList to an array of files
      const newFiles = Array.from(files);
      // Update the state with new files
      setNewImages((prevImages) => {
        // Create a new array with the existing images and the new files
        return [...prevImages, ...newFiles];
      });
    } else if (isDelete) {
      if (isNewFiles) {
        setNewImages((prevImages) => {
          return prevImages.filter((_, i) => i !== files);
        });
      } else {
        if (parentKey) {
          let oldFiles = editData[parentKey].gallery;
          deletedUrls.push(oldFiles[files]);
          oldFiles.splice(files, 1);
          handleUpdateEditData("gallery", oldFiles);
        } else {
          let oldFiles = editData.gallery;
          deletedUrls.push(oldFiles[files]);
          oldFiles.splice(files, 1);
          handleUpdateEditData("gallery", oldFiles);
        }
      }
    }
  };

  const handleImageUpload = (activeDeliverable, file) => {
    setDeliverableImages((prevImages) => ({
      ...prevImages,
      [activeDeliverable]: file,
    }));
  };

  const handleUpdateEditMode = () => {
    setEditMode(true);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append each file in the `newImages` array to the form data
      newImages.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      console.log(newImages)
      // Append other necessary fields
      formData.append("role", role);
      formData.append("imageType", "Gallery");
      formData.append("id", id);

      // Append the array of deleted URLs
      deletedUrls.forEach((url, index) => {
        formData.append(`oldFilePath[${index}]`, url);
      });

      // Send the form data via POST request
      const fileResponse = await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let oldFiles = editData.introduction.gallery;

      if (Array.isArray(fileResponse.data)) {
        fileResponse.data.forEach((file) => {
          oldFiles.push(file.Location);
        });
      } else if (fileResponse.data.Location) {
        oldFiles.push(fileResponse.data.Location);
      }

      await handleUpdateEditData("gallery", oldFiles);

      // Process deliverable images
      for (const [index, file] of Object.entries(deliverableImages)) {
        if (file) {
          const deliverableFormData = new FormData();
          deliverableFormData.append("role", role);
          deliverableFormData.append("file", file);
          deliverableFormData.append("imageType", "Deliverable");
          deliverableFormData.append("id", id);
          deliverableFormData.append(
            "oldFilePath",
            editData.deliverables[index]?.imageLink || ""
          );

          const deliverableFileResponse = await axios.post(
            "/api/files/upload",
            deliverableFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const deliverableImageLink = deliverableFileResponse.data.Location;
          // Update the deliverable's imageLink with the new file location
          editData.deliverables[index].imageLink = deliverableImageLink;
        }
      }

      await axios.put(`/api/students/${id}`, editData);
      setStudent(editData);
      setNewImages([]);
      setDeletedUrls([]);
      setEditMode(false);
      showAlert(
        translations[language]?.changesSavedSuccessfully ||
          translations.en.changesSavedSuccessfully,
        "success"
      );
    } catch (error) {
      console.error("Error saving student data:", error);
      showAlert(
        translations[language]?.errorSavingChanges ||
          translations.en.errorSavingChanges,
        "error"
      );
    }
  };

  const handleCancel = () => {
    setEditData(student);
    setEditMode(!editMode);
  };

  const [subTabIndex, setSubTabIndex] = useState(0);

  const handleSubTabChange = (event, newIndex) => {
    setSubTabIndex(newIndex);
  };

  if (!student) {
    return <div>{t("loading")}</div>;
  }

  const portalContent = (
    <Box className={styles.buttonsContainer}>
      {role === "Student" && (
        <>
          {editMode ? (
            <>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                size="small"
              >
                {t("save")}
              </Button>

              <Button
                onClick={handleCancel}
                variant="outlined"
                color="error"
                size="small"
              >
                {t("cancel")}
              </Button>
            </>
          ) : (
            <Button
              onClick={toggleEditMode}
              variant="contained"
              color="primary"
              size="small"
            >
              {t("editProfile")}
            </Button>
          )}
        </>
      )}
    </Box>
  );

  return (
    <Box my={2}>
      <>
        {subTabIndex !== 2 &&
          ReactDOM.createPortal(
            portalContent,
            document.getElementById("saveButton")
          )}
      </>

      <Tabs
        className={styles.Tabs}
        value={subTabIndex}
        onChange={handleSubTabChange}
      >
        <Tab label={t("selfIntroduction")} />
        <Tab label={t("deliverables")} />
        <Tab label={t("qa")} />
      </Tabs>
      {subTabIndex === 0 && (
        <Box my={2}>
          <TextField
            title={t("selfIntroduction")}
            data={student.self_introduction}
            editData={editData}
            editMode={editMode}
            updateEditData={handleUpdateEditData}
            keyName="self_introduction"
            parentKey="introduction"
          />
          <Gallery
            galleryUrls={editData}
            newImages={newImages}
            deletedUrls={deletedUrls}
            editMode={editMode}
            updateEditData={handleGalleryUpdate}
            keyName="gallery"
            parentKey="introduction"
          />
          <TextField
            title={t("hobbies")}
            data={student.hobbies}
            editData={editData}
            editMode={editMode}
            updateEditData={handleUpdateEditData}
            keyName="hobbies"
            parentKey="introduction"
          />
          <TextField
            title={t("specialSkills")}
            data={student.other_information}
            editData={editData}
            editMode={editMode}
            updateEditData={handleUpdateEditData}
            keyName="other_information"
            parentKey="introduction"
          />
          <SkillSelector
            title={t("itSkills")}
            headers={{
              上級: t("threeYearsOrMore"),
              中級: t("threeYearsOrMore"),
              初級: t("oneToOneAndHalfYears"),
            }}
            data={student}
            editData={editData}
            editMode={editMode}
            updateEditData={handleUpdateEditData}
            showAutocomplete={true}
            showHeaders={true}
            keyName="it_skills"
            parentKey="introduction"
          />
          <SkillSelector
            title={t("otherSkills")}
            headers={{
              上級: "3年間以上",
              中級: "1年間〜1年間半",
              初級: "基礎",
            }}
            data={student}
            editMode={editMode}
            editData={editData}
            updateEditData={handleUpdateEditData}
            showAutocomplete={false}
            showHeaders={false}
            keyName="skills"
            parentKey="introduction"
          />
        </Box>
      )}
      {subTabIndex === 1 && (
        <Box my={2}>
          <Deliverables
            data={student.deliverables}
            editMode={editMode}
            editData={editData.deliverables}
            updateEditData={handleUpdateEditData}
            showAutocomplete={false}
            showHeaders={false}
            keyName="deliverables"
            updateEditMode={handleUpdateEditMode}
            onImageUpload={handleImageUpload} // Pass image upload handler
          />
        </Box>
      )}
      {subTabIndex === 2 && (
        <Box my={2}>
          <QA />
        </Box>
      )}
    </Box>
  );
};

export default Top;

