import React from "react";
import PropTypes from "prop-types";
import { Chip, Box } from "@mui/material";

const SkillsTable = ({ itSkills, otherSkills }) => {
  const parseSkills = (skills) => skills.split(", ").map(skill => skill.trim());

  return (
    <Box>
      <h2>単位数とスキル</h2>
      <p>Coming soon</p>
    </Box>
  );
};

SkillsTable.propTypes = {
  itSkills: PropTypes.string.isRequired,
  otherSkills: PropTypes.string.isRequired,
};

export default SkillsTable;
