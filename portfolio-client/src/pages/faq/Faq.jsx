import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FAQstyle from "./Faq.module.css";

import QATextField from "../../components/QATextField/QATextField";
import QAAccordion from "../../components/QAAccordion/QAAccordion";

import axios from "../../utils/axiosUtils";
import { useAlert } from "../../contexts/AlertContext";

const FAQ = () => {
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const showAlert = useAlert();

  const questionAnswer = [
    {
      question: "ポートフォリオシステムで何を登録できますか？",
      answer:
        "ポートフォリオシステムでは、自己 PR、特技、IT スキル、成果物、その他を他人と共有できます。これにより、あなたの学業成果やスキルを効果的にアピールできます。",
    },
    {
      question: "他の学生のポートフォリオを見ることはできますか？",
      answer:
        "リクルーターのプロフィールを見ることができますが、他の学生のポートフォリオを見られません。",
    },
    {
      question: "モバイルデバイスでもポートフォリオを閲覧できますか？",
      answer:
        "はい、ポートフォリオシステムはレスポンシブデザインを対応しており、スマートフォンやタブレットなど、どのデバイスでも快適に閲覧できます。",
    },
  ];

  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchFAQ = async () => {
    try {
      const response = await axios.get("/api/settings/faq"); // Assuming this is the endpoint for FAQ
      await setEditData(JSON.parse(response.data.value)); // Set the FAQ data
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };

  useEffect(() => {
    fetchFAQ();
  }, []);

  const handleUpdate = (keyName, value, qa) => {
    setEditData((prevEditData) => {
      // Clone the previous editData
      const updatedEditData = { ...prevEditData };

      // If the key exists, update the corresponding value
      if (updatedEditData[keyName]) {
        updatedEditData[keyName] = {
          ...updatedEditData[keyName],
          [qa]: value, // Update the 'answer' field
        };
      }

      return updatedEditData;
    });
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const updatedValue = JSON.stringify(editData); // Ensure it is stringified

      // Send a PUT request to save the updated FAQ data
      const response = await axios.put(`/api/settings/faq`, {
        value: updatedValue,
      });

      if (response.status === 200) {
        setEditMode(false);
        showAlert("Changes saved successfully!", "success");
      }
    } catch (error) {
      console.error("Error updating FAQ data:", error);
    }
  };

  const handleCancel = () => {
    fetchFAQ();
    setEditMode(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom className={FAQstyle["faq-title"]}>
        FAQ
      </Typography>
      <>
        {editMode ? (
          <>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              size="small"
            >
              保存
            </Button>

            <Button
              onClick={handleCancel}
              variant="outlined"
              color="error"
              size="small"
            >
              キャンセル
            </Button>
          </>
        ) : (
          <Button
            onClick={toggleEditMode}
            variant="contained"
            color="primary"
            size="small"
          >
            QAを編集
          </Button>
        )}
      </>
      <Box my={2}>
        {editMode &&
          Object.entries(editData).map(([key, { question, answer }]) => (
            <QATextField
              key={key}
              data={editData} // Pass any relevant data here if needed
              editData={editData}
              category={false} // Use labels to get the current category
              question={question}
              keyName={key}
              updateEditData={handleUpdate}
            />
          ))}
      </Box>

      <Box my={2}>
        {!editMode &&
          Object.entries(editData).map(([key, { question, answer }]) => (
            <QAAccordion
              key={key}
              question={question}
              answer={answer ? answer : "回答なし"}
            />
          ))}
      </Box>

      {questionAnswer.map((qa, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          defaultExpanded={index === 0}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography className={FAQstyle["title-accordion"]}>
              {qa.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={FAQstyle["body-accordion"]}>
              {qa.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex">
              <EmailIcon className={FAQstyle["faq-icons"]} />
              <Typography sx={{ ml: 1 }}>test@jdu.uz</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex">
              <PhoneIcon className={FAQstyle["faq-icons"]} />
              <Typography sx={{ ml: 1 }}>+998 90 123 45 67</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex">
              <AccessTimeIcon className={FAQstyle["faq-icons"]} />
              <Typography sx={{ ml: 1 }}>09:00 ~ 18:00</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex">
              <LocationOnIcon className={FAQstyle["faq-icons"]} />
              <Typography sx={{ ml: 1 }}>
                Tashkent, Shayhontohur district, Sebzor, 21
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FAQ;
