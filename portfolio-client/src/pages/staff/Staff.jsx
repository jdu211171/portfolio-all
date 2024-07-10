import React from "react";

import { Box } from "@mui/material";

import Table from "../../components/table/Table";

const Home = () => {
  const headers = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "職員",
      type: "avatar",
    },
    {
      id: "active",
      numeric: true,
      disablePadding: false,
      label: "アクティブ",
      type: "status",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "メール",
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
    dataLink: "/api/staff",
  };

  return (
    <div>
      <h1>Staff Page</h1>
      <Box sx={{ width: "100%" }}>
        <>here should be filter</>
      </Box>
      <Table tableProps={props} />
    </div>
  );
};

export default Home;
