import React, { useState } from "react";

import { Box } from "@mui/material";

import Table from "../../components/table/Table";
import Filter from '../../components/filter/Filter'

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
      key: "test2",
      label: "test2",
      type: "checkbox",
      options: ["opt1", "opt2", "opt3"],
      minWidth: "160px",
    },
    {
      key: "test3",
      label: "test3",
      type: "checkbox",
      options: ["opt1", "opt2", "opt3"],
      minWidth: "160px",
    },
    {
      key: "test4",
      label: "test4",
      type: "checkbox",
      options: ["opt1", "opt2", "opt3"],
      minWidth: "160px",
    },
    {
      key: "test5",
      label: "test5",
      type: "checkbox",
      options: ["opt1", "opt2", "opt3"],
      minWidth: "160px",
    },
    {
      key: "test6",
      label: "test6",
      type: "checkbox",
      options: ["opt1", "opt2", "opt3"],
      minWidth: "160px",
    },
  ];

  const props = {
    headers: headers,
    dataLink: "/api/staff",
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
      <Table tableProps={props} />
    </div>
  );
};

export default Home;
