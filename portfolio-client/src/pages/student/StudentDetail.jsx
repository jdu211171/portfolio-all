import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4">{student.first_name} {student.last_name}</Typography>
      <Typography variant="body1">Email: {student.email}</Typography>
      <Typography variant="body1">Grade: {student.grade}</Typography>
      {/* Add more fields as needed */}
    </Box>
  );
};

export default StudentDetail;
