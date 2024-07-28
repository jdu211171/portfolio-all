import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "../../../utils/axiosUtils";
import certificateColors from "../../../utils/certificates";
import { Box, Tabs, Tab, Snackbar, Alert } from "@mui/material";
import CreditsProgressBar from "../../../components/CreditsProgressBar/CreditsProgressBar";
import SkillSelector from "../../../components/SkillSelector/SkillSelector";
import styles from "./Stats.module.css";

const Stats = () => {
  let id;
  const { studentId } = useParams();
  const location = useLocation();
  const { userId } = location.state || {};

  if (userId != 0 && userId) {
    id = userId;
  } else {
    id = studentId;
  }

  const [student, setStudent] = useState(null);
  const [kintoneData, setKintoneData] = useState({});
  const [editData, setEditData] = useState({});
  const [certificates, setCertificates] = useState({});
  const [subTabIndex, setSubTabIndex] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentResponse = await axios.get(`/api/students/${id}`);
        const studentData = studentResponse.data;

        const kintoneResponse = await axios.post(`/api/kintone/getby`, {
          table: "student_credits",
          col: "studentId",
          val: studentData.student_id,
        });

        if (kintoneResponse.data.records.length > 0) {
          setKintoneData(kintoneResponse.data.records[0]);
        }

        const fetchCertificates = async () => {
          const requests = [
            axios.post(`/api/kintone/getby`, {
              table: "certificate_ielts",
              col: "studentId",
              val: studentData.student_id,
            }),
            axios.post(`/api/kintone/getby`, {
              table: "certificate_jlpt",
              col: "studentId",
              val: studentData.student_id,
            }),
            axios.post(`/api/kintone/getby`, {
              table: "certificate_jdu_jlpt",
              col: "studentId",
              val: studentData.student_id,
            }),
            axios.post(`/api/kintone/getby`, {
              table: "certificate_benron",
              col: "studentId",
              val: studentData.student_id,
            }),
            axios.post(`/api/kintone/getby`, {
              table: "certificate_it_contest",
              col: "studentId",
              val: studentData.student_id,
            }),
          ];

          const [
            ieltsResponse,
            jlptResponse,
            jduJlptResponse,
            benronResponse,
            itContestResponse,
          ] = await Promise.all(requests);

          setCertificateData("main", "JLPT", jlptResponse.data.records);
          setCertificateData("main", "JDU_JLPT", jduJlptResponse.data.records);
          setCertificateData("main", "IELTS", ieltsResponse.data.records);
          setCertificateData(
            "other",
            "日本語弁論大会学内",
            benronResponse.data.records
          );
          setCertificateData(
            "other",
            "ITコンテスト学内",
            itContestResponse.data.records
          );

          setStudent(studentData);
        };

        await fetchCertificates();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const setCertificateData = (key, type, data) => {
    // Create a temporary array to hold the processed data
    let temp = [];

    // Process each item in the data array
    if (key == "main") {
      data.forEach((x) => {
        let obj = {
          name: type == "IELTS" ? x.awards.value : x.jlptLevel.value,
          date: x.date.value.slice(0, 7),
          color:
            certificateColors[type][
              type == "IELTS" ? x.awards.value : x.jlptLevel.value
            ],
        };
        temp.push(obj);
      });
    } else {
      data.forEach((x) => {
        let obj = {
          name: x.level.value,
          date: x.date.value.slice(0, 7),
          color: certificateColors[key][x.level.value],
        };
        temp.push(obj);
      });
    }

    // Update the certificates state immutably
    setCertificates((prevCertificates) => ({
      ...prevCertificates,
      [key]: {
        ...prevCertificates[key],
        [type]: temp,
      },
    }));
  };

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
              JSON.stringify(kintoneData) !== "{}"
                ? Number(kintoneData.businessSkillsCredits?.value) +
                  Number(kintoneData.japaneseEmploymentCredits?.value)
                : 0
            }
            semester={
              JSON.stringify(kintoneData) !== "{}"
                ? kintoneData.semester?.value
                : 0
            }
          />
        </Box>
      )}
      {subTabIndex === 1 && (
        <Box my={2}>
          {student.partner_university}
          <CreditsProgressBar
            breakpoints={breakpoints2}
            unit="単位"
            credits={
              JSON.stringify(kintoneData) !== "{}"
                ? kintoneData.partnerUniversityCredits.value
                : 0
            }
            semester={
              JSON.stringify(kintoneData) !== "{}"
                ? kintoneData.semester?.value
                : 0
            }
          />
        </Box>
      )}
      <Box my={2}>
        <SkillSelector
          title="資格"
          headers={{
            JLPT: "",
            JDU日本語認定試験: "",
            IELTS: "",
          }}
          data={certificates}
          editData={editData}
          showAutocomplete={true}
          showHeaders={false}
          keyName="main"
        />
        <SkillSelector
          title="その他"
          headers={{
            上級: "3年間以上",
            中級: "1年間〜1年間半",
            初級: "基礎",
          }}
          data={certificates}
          editData={editData}
          showAutocomplete={false}
          showHeaders={false}
          keyName="other"
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
