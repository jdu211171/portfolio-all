// src/components/QATextField.js

import React, { useState, useEffect } from "react";
import { TextField as MuiTextField } from "@mui/material";
import styles from "./QATextField.module.css"; // Assuming you have some CSS for styling

const QATextField = ({
  category,
  question,
  keyName,
  editData,
  updateEditData,
}) => {
  // Initialize editData with the value from props
  const [localEditData, setLocalEditData] = useState("");
  const [localEditQuestion, setLocalQuestion] = useState("");
  // Update localEditData when editData changes
  useEffect(() => {
    if (category == false) {
      setLocalEditData(editData[keyName]?.answer || "");
      setLocalQuestion(editData[keyName]?.question || "");
    } else {
      setLocalEditData(editData[category]?.[keyName]?.answer || "");
      setLocalQuestion(editData[category]?.[keyName]?.question || "");
    }
  }, [editData, category, keyName]);

  const handleChange = (e, fieldType) => {
    const updatedValue = e.target.value;

    if (category == false) {
      if (fieldType === "question") {
        // Update the question field
        setLocalQuestion(updatedValue); // Assuming you're using a state for the question (e.g., `setQuestion`)
        updateEditData(keyName, updatedValue, "question"); // Pass the updated question and answer to the parent
      } else if (fieldType === "answer") {
        // Update the answer fields
        setLocalEditData(updatedValue); // Update the answer field (localEditData state)
        updateEditData(keyName, updatedValue, "answer"); // Pass the updated answer and question to the parent
      }
    } else {
      setLocalEditData(updatedValue);
      updateEditData(category, keyName, updatedValue); // Call the function to update parent state
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {category === false ? (
          <MuiTextField
            value={localEditQuestion}
            onChange={(e) => handleChange(e, "question")} // Pass 'question' as a type identifier
            variant="outlined"
            fullWidth
            multiline
          />
        ) : (
          <div>{localEditQuestion}</div> // Show question as plain text when category is not false
        )}
      </div>
      <div className={styles.data}>
        <MuiTextField
          value={localEditData}
          onChange={(e) => handleChange(e, "answer")} // Pass 'answer' as a type identifier
          variant="outlined"
          fullWidth
          multiline
        />
      </div>
    </div>
  );
};

export default QATextField;
