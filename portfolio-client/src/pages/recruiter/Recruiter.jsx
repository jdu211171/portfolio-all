import React, { useState } from "react";

import { Box } from "@mui/material";

import Table from "../../components/table/Table";
import Filter from "../../components/filter/Filter";

const Recruiter = () => {
  const headers = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "リクルーター",
      type: "avatar",
    },
    {
      id: "company_name",
      numeric: true,
      disablePadding: false,
      label: "会社名",
    },
    {
      id: "phone_number",
      numeric: true,
      disablePadding: false,
      label: "電話番号",
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

  const [filterState, setFilterState] = useState({});
  // must match with db table col names
  const filterProps = [
    { key: "name", label: "名前", type: "text", minWidth: "160px" },
    {
      key: "company_name",
      label: "会社名",
      type: "text",
      minWidth: "160px",
    },
    {
      key: "phone_number",
      label: "電話番号",
      type: "text",
      minWidth: "160px",
    },
    {
      key: "email",
      label: "メール",
      type: "text",
      minWidth: "160px",
    }
  ];

  const tableProps = {
    headers: headers,
    dataLink: "/api/recruiters",
    filter:filterState
  };

  const handleFilterChange = (value) => {
    setFilterState(value)
  };

  return (
    <div>
      <Box sx={{ width: "100%", height: "100px" }}>
        <Filter
          fields={filterProps}
          filterState={filterState}
          onFilterChange={handleFilterChange}
        />
      </Box>
      <Table tableProps={tableProps} />
    </div>
  );
};

export default Recruiter;
