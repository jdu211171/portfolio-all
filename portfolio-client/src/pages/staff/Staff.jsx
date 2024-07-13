import React, { useState } from "react";

import { Box } from "@mui/material";

import Table from "../../components/table/Table";
import Filter from '../../components/filter/Filter'

const Staff = () => {
  const headers = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "職員",
      type: "avatar",
    },
    {
      id: "staff_id",
      numeric: true,
      disablePadding: false,
      label: "職員ID",
      type: "status",
    },
    {
      id: "role",
      numeric: true,
      disablePadding: false,
      label: "役職",
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
      key: "test1",
      label: "test1",
      type: "checkbox",
      options: ["opt1", "opt2", "opt3"],
      minWidth: "160px",
    },
    {
      key: "role",
      label: "役職",
      type: "checkbox",
      options: ["Specialty", "Admin", "Manager"],
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
    dataLink: "/api/staff",
    filter:filterState,
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

export default Staff;
