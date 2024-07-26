import React, { useState, useEffect, useRef } from "react";
import { TextField as MuiTextField, Box, IconButton } from "@mui/material";
import { Add, DeleteOutline } from "@mui/icons-material";

import styles from "./Deliverables.module.css"; // Assuming you have some CSS for styling
import TextField from "../TextField/TextField";
import RoleField from "../RoleField/RoleField";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const Deliverables = ({
  data,
  editData,
  editMode,
  updateEditData,
  keyName,
  updateEditMode,
}) => {
  const textFieldRef = useRef(null);
  const [newData, setNewData] = useState(editData);
  const [activeDeliverable, setActiveDeliverable] = useState(0);

  useEffect(() => {
    setNewData(editData);
  }, [editData]);

  const handleChange = (key, value) => {
    const updatedData = newData.map((item, index) => {
      if (index === activeDeliverable) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setNewData(updatedData);
    updateEditData(keyName, updatedData);
  };

  const addNewDeliverable = () => {
    const deliverable = {
      title: "",
      link: "",
      role: [],
      codeLink: "",
      imageLink: "",
      description: "",
    };
    const updatedData = [...newData, deliverable];
    setNewData(updatedData);
    updateEditData(keyName, updatedData);
    updateEditMode();
    setActiveDeliverable(updatedData.length - 1);
    setTimeout(() => {
      textFieldRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (editData.length == 0) {
      addNewDeliverable();
    }
  }, []);

  const deleteDeliverable = (index) => {
    const updatedData = newData.filter((_, i) => i !== index);
    setNewData(updatedData);
    updateEditData(keyName, updatedData);
    if (activeDeliverable >= updatedData.length) {
      setActiveDeliverable(updatedData.length - 1);
    }
  };

  const handleChangeActive = (index) => {
    setActiveDeliverable(index);
  };

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className={styles.zoomContainer}>
        <button className={styles.zoomButtonR} onClick={zoomIn}>
          +
        </button>
        <button className={styles.resetButton} onClick={resetTransform}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V1L8 5l4 4V6c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8h-2c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10z"
              fill="white"
            />
          </svg>
        </button>
        <button className={styles.zoomButtonL} onClick={zoomOut}>
          -
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <td className={styles.cellLeft}>タイトル：</td>
            <td className={styles.cell}>
              {editMode ? (
                <MuiTextField
                  inputRef={textFieldRef}
                  value={newData[activeDeliverable]?.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  fullWidth
                  multiline
                />
              ) : (
                <div className={styles.cell}>
                  {newData[activeDeliverable]?.title}
                </div>
              )}
            </td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cellLeft}>開発経験共有：</td>
            <td className={styles.cell}>
              {editMode ? (
                <MuiTextField
                  value={newData[activeDeliverable]?.link || ""}
                  onChange={(e) => handleChange("link", e.target.value)}
                  fullWidth
                  multiline
                />
              ) : (
                <div className={styles.cell}>
                  <a
                    href={newData[activeDeliverable]?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {newData[activeDeliverable]?.link}
                  </a>
                </div>
              )}
            </td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cellLeft}>ソースコード：</td>
            <td className={styles.cell}>
              {editMode ? (
                <MuiTextField
                  value={newData[activeDeliverable]?.codeLink || ""}
                  onChange={(e) => handleChange("codeLink", e.target.value)}
                  fullWidth
                  multiline
                />
              ) : (
                <div className={styles.cell}>
                  <a
                    href={newData[activeDeliverable]?.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {newData[activeDeliverable]?.codeLink}
                  </a>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <Box className={styles.imageBox}>
        <TransformWrapper>
          <TransformComponent>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="test"
              width="100%"
            />
          </TransformComponent>
          <Controls />
        </TransformWrapper>
      </Box>
      <Box>
        <TextField
          title="プロジェクトの概要欄"
          data={newData[activeDeliverable]?.description}
          editData={newData[activeDeliverable]}
          editMode={editMode}
          updateEditData={handleChange}
          keyName="description"
        />
        <RoleField
          data={newData[activeDeliverable]?.role}
          editData={newData[activeDeliverable]}
          editMode={editMode}
          updateEditData={handleChange}
          keyName="role"
        />
      </Box>
      <Box className={styles.imageContainer}>
        {newData.map(
          (pr, index) =>
            activeDeliverable !== index && (
              <div
                key={"pr" + index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeActive(index);
                }}
                className={styles.image}
              >
                <img
                  src={`https://picsum.photos/300/200?random=${index}`}
                  alt={pr.imageLink}
                />
                {editMode && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDeliverable(index);
                    }}
                    color="error"
                    className={styles.removeIconButton}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </div>
            )
        )}
        {editMode && (
          <div className={styles.image}>
            <IconButton
              onClick={addNewDeliverable}
              color="primary"
              className={styles.addIconButton}
            >
              <Add />
            </IconButton>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Deliverables;
