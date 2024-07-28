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
  const [studentDetails, setStudentDetails] = useState({
    name: "Hamdumov Umid",
    university: "東京通信大学",
    universityEntryDate: "2021-09-03",
    status: "在学中",
  });

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.student) {
        setStudent(event.data.student);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const fetchCreditDetails = async (studentId) => {
      let response = await axios.post(`/api/kintone/getby`, {
        table: "credit_details",
        col: "studentId",
        val: studentId,
      });
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

      <Box>
        <Typography variant="h6" gutterBottom>
          単位数
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
              {creditData.map((record) => (
                <TableRow key={record.$id.value}>
                  <TableCell>{record.subject.value}</TableCell>
                  <TableCell>{record.hyouka.value}</TableCell>
                  <TableCell>{record.credit.value}</TableCell>
                  <TableCell>{record.date.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </StyledBox>
  );
};

export default CreditDetails;
