import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Table from '../../components/table/Table';
import Filter from '../../components/filter/Filter';

const Student = () => {
  const [filterState, setFilterState] = useState({});
  
  // Ensure filterProps have unique keys matching your database columns
  const filterProps = [
    { key: "name", label: "名前", type: "text", minWidth: "160px" },
    {
      key: "jlpt",
      label: "日本語能力試験",
      type: "checkbox",
      options: ["N1", "N2", "N3", "N4", "N5"],
      minWidth: "160px",
    },
    {
      key: "ielts",
      label: "IELTS (英語力)",
      type: "radio",
      options: ["6.5", "7", "7.5", "8", "8.5"],
      minWidth: "160px",
    },
    {
      key: "year",
      label: "学年",
      type: "radio",
      options: ["1年生", "2年生", "3年生", "4年生"],
      minWidth: "160px",
    },
    {
      key: "department",
      label: "学部",
      type: "radio",
      options: ["ITエンジニア", "データサイエンス", "デザイナー", "AI"],
      minWidth: "160px",
    },
    {
      key: "it_skill_level",
      label: "ITスキルレベル",
      type: "radio",
      options: ["上級", "中級", "初級"],
      minWidth: "160px",
    },
    {
      key: "programming_languages",
      label: "プログラミング言語",
      type: "checkbox",
      options: ["JS", "Python", "Java", "SQL"],
      minWidth: "160px",
    },
    {
      key: "grade",
      label: "成績 (有無)",
      type: "radio",
      options: ["有り", "無し"],
      minWidth: "160px",
    },
    {
      key: "credits",
      label: "単位数",
      type: "radio",
      options: ["20単位内", "40単位内", "60単位内", "80単位内", "100単位以上"],
      minWidth: "160px",
    },
    {
      key: "special_qualification",
      label: "特技 (有無)",
      type: "radio",
      options: ["有り", "無し"],
      minWidth: "160px",
    },
    {
      key: "affiliated_university",
      label: "提携大学",
      type: "radio",
      options: [
        "東京通信大学",
        "産能短期大学",
        "京都大学",
        "大手前大学",
        "新潟大学",
      ],
      minWidth: "160px",
    },
  ];
  
  const handleFilterChange = (newFilterState) => {
    setFilterState(newFilterState);
  };

  const navigate = useNavigate();

  const NavigateToProfile = (studentId) => {
    navigate(`/profile/${studentId}`);
  };


  const headers = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: '学生',
      type: 'avatar',
      onClickAction: NavigateToProfile
    },
    {
      id: 'grade',
      numeric: true,
      disablePadding: false,
      label: '学年',
      type: 'status',
    },
    {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: '学部',
    },
    {
      id: 'jlpt',
      numeric: true,
      disablePadding: false,
      label: '日本語能力試験',
    },
    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'アクション',
    },
  ];

  const tableProps = {
    headers: headers,
    dataLink: '/api/students',
    filter: filterState,
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

export default Student;
