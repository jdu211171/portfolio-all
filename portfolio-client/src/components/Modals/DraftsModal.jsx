import React from "react";
import { Box, Button } from "@mui/material";
import axios from "../../utils/axiosUtils";

const DraftsModal = ({ id, handleSettingDraft, handleSettingtoHonban }) => {
  const handleSaveLatestDraft = async () => {
    try {
      const response = await axios.get(`/api/draft/student/${id}`);
      const drafts = response.data;

      if (drafts.length > 0) {
        const latestDraft = drafts.reduce((prev, current) =>
          new Date(prev.updated_at) > new Date(current.updated_at)
            ? prev
            : current
        );

        handleSettingDraft(latestDraft);
        console.log("Latest draft saved:", latestDraft);
      } else {
        console.warn("No drafts available to save.");
      }
    } catch (error) {
      console.error("Error fetching latest draft:", error);
    }
  };

  return (
    <Box>
      {/* 本番 (Honban) tugmasi */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSettingtoHonban}
      >
        本番
      </Button>

      {/* 下書き (Shitagaki) tugmasi */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSaveLatestDraft}
      >
        下書き
      </Button>
    </Box>
  );
};

export default DraftsModal;
