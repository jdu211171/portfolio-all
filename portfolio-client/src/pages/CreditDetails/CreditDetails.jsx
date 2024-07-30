import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosUtils";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)({
  backgroundColor: "#cfe8fc",
  padding: "20px",
  borderRadius: "5px",
});

const CreditDetails = () => {
  const [student, setStudent] = useState(null);
  const [creditData, setCreditData] = useState([]);

  function base64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("student");
    if (encodedData) {
      const decodedData = JSON.parse(base64DecodeUnicode(encodedData)); // Decode the Base64 and parse the JSON string
      setStudent(decodedData);
    }
  }, []);

  useEffect(() => {
    const fetchCreditDetails = async (studentId) => {
      let response = await axios.post(`/api/kintone/getby`, {
        table: "credit_details",
        col: "studentId",
        val: studentId,
      });

      setTimeout(() => {
        console.log(response.data.records);
      }, 5000);
      setCreditData(response.data.records);
    };

    if (student) {
      fetchCreditDetails(student.student_id);
    }
  }, [student]);

  return (
    <StyledBox>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          学生詳細
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>学生名</TableCell>
                <TableCell>提携大学</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {student?.first_name + " " + student?.last_name}
                </TableCell>
                <TableCell>{student?.partner_university}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          JDU単位数
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>科目名</TableCell>
                <TableCell>評価</TableCell>
                <TableCell>単位数</TableCell>
                <TableCell>取得日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditData.map(
                (record) =>
                  record.gradeUniverGroup.value !== "大学資格" && (
                    <TableRow key={record.$id.value}>
                      <TableCell>{record.subject.value}</TableCell>
                      <TableCell>{record.hyouka.value}</TableCell>
                      <TableCell>{record.manualCredit.value}</TableCell>
                      <TableCell>{record.date.value}</TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          提携大学単位数
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>科目名</TableCell>
                <TableCell>評価</TableCell>
                <TableCell>単位数</TableCell>
                <TableCell>取得日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditData.map(
                (record) =>
                  record.gradeUniverGroup.value == "大学資格" && (
                    <TableRow key={record.$id.value}>
                      <TableCell>{record.subject.value}</TableCell>
                      <TableCell>{record.hyouka.value}</TableCell>
                      <TableCell>{record.manualCredit.value}</TableCell>
                      <TableCell>{record.date.value}</TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </StyledBox>
  );
};

export default CreditDetails;
