import React from "react";

import { Box } from "@mui/material";

import Table from "../../components/table/Table";

const Home = () => {
  const headers = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "学生",
      type: "avatar",
    },
    {
      id: "grade",
      numeric: true,
      disablePadding: false,
      label: "学年",
      type: "status",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "学部",
    },
    {
      id: "jlpt",
      numeric: true,
      disablePadding: false,
      label: "日本語能力試験",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "アクション",
    },
  ];

  const props = {
    headers: headers,
    dataLink: "/api/students",
  };

  return (
    <div>
      <h1>Student Page</h1>
      <Box sx={{ width: "100%" }}>
        <>here should be filter</>
      </Box>
      <Table tableProps={props} />
    </div>
  );
};

export default Home;
