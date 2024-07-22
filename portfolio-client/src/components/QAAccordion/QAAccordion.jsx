import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import styles from "./QAAccordion.module.css";

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  minHeight: 50,
  maxHeight: 50,
  "&.Mui-expanded": {
    minHeight: 50,
    maxHeight: 50,
  },
  ".MuiAccordionSummary-expandIcon": {
    order: -1,
  },
}));

const QAAccordion = ({ question, answer }) => {
  return (
    <div>
      <Accordion className={styles.accordion}>
        <StyledAccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className={styles.qPart}>Q</div>
          <Typography className={styles.question}>{question}</Typography>
        </StyledAccordionSummary>
        <AccordionDetails className={styles.answer}>
          <Typography>{answer} </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QAAccordion;
