import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import axios from "../../../utils/axiosUtils";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreditsProgressBar from "../../../components/CreditsProgressBar/CreditsProgressBar";
import SkillSelector from "../../../components/SkillSelector/SkillSelector";
import styles from "./Stats.module.css";

const Stats = () => {
  const { studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [kintoneData, setKintoneData] = useState({});
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        const kintone = await axios.post(`/api/kintone/getby`, {
          table: "student_credits",
          col: "studentId",
          val: response.data.student_id,
        });
        if (kintone.data.records.length != 0) {
          await setKintoneData(kintone.data.records[0]);
          console.log(kintoneData, kintone.data.records[0]);
        }
        await setStudent(response.data);
      } catch (error) {
        showAlert("Error fetching student data", "error");
      }
    };

    fetchStudent();
  }, [studentId]);

  const [subTabIndex, setSubTabIndex] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSubTabChange = (event, newIndex) => {
    setSubTabIndex(newIndex);
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: "", severity: "" });
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  const breakpoints = [
    { label: "入学", point: 0 },
    { label: "", point: 19 },
    { label: "", point: 38 },
    { label: "", point: 57 },
    { label: "卒業", point: 76 },
  ];

  const breakpoints2 = [
    { label: "入学", point: 0 },
    { label: "1年", point: 31 },
    { label: "2年", point: 62 },
    { label: "3年", point: 93 },
    { label: "4年", point: 124 },
  ];

  const credits = 40;

  return (
    <Box my={2}>
      <Tabs
        className={styles.Tabs}
        value={subTabIndex}
        onChange={handleSubTabChange}
      >
        <Tab label="JDU" />
        <Tab label={student.partner_university} />
      </Tabs>
      {subTabIndex === 0 && (
        <Box my={2}>
          JDU
          <CreditsProgressBar
            breakpoints={breakpoints}
            unit="単位"
            credits={
              Number(kintoneData.businessSkillsCredits.value) +
              Number(kintoneData.japaneseEmploymentCredits.value)
            }
            semester={kintoneData.semester.value}
          />
        </Box>
      )}
      {/* 成果物 starts from here */}
      {subTabIndex === 1 && (
        <Box my={2}>
          TOU
          <CreditsProgressBar
            breakpoints={breakpoints2}
            unit="単位"
            credits={kintoneData.partnerUniversityCredits.value}
          />
        </Box>
      )}

      <Box my={2}>
        <SkillSelector
          title="ITスキル"
          headers={{
            上級: "3年間以上",
            中級: "1年間〜1年間半",
            初級: "基礎",
          }}
          data={student}
          editData={editData}
          editMode={editMode}
          showAutocomplete={true}
          showHeaders={true}
          keyName="it_skills"
        />
        <SkillSelector
          title="その他"
          headers={{
            上級: "3年間以上",
            中級: "1年間〜1年間半",
            初級: "基礎",
          }}
          data={student}
          editMode={editMode}
          editData={editData}
          showAutocomplete={false}
          showHeaders={false}
          keyName="skills"
        />
      </Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Stats;
