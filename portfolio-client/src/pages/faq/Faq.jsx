import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FAQstyle from "./Faq.module.css";

const FAQ = () => {
  const questionAnswer = [
    {
      question: "ポートフォリオシステムで何を登録できますか？",
      answer: "ポートフォリオシステムでは、自己 PR、特技、IT スキル、成果物、その他を他人と共有できます。これにより、あなたの学業成果やスキルを効果的にアピールできます。"
    },
    {
      question: "他の学生のポートフォリオを見ることはできますか？",
      answer: "リクルーターのプロフィールを見ることができますが、他の学生のポートフォリを見られません。"
    },
    {
      question: "モバイルデバイスでもポートフォリオを閲覧できますか？",
      answer: "はい、ポートフォリオシステムはレスポンシブデザインを対応しており、スマートフォンやタブレットなど、どのデバイスでも快適に閲覧できます。"
    }
  ];

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant='h5' gutterBottom className={FAQstyle["faq-title"]}>
        FAQ
      </Typography>
      {questionAnswer.map((qa, index) => (
        <Accordion className={FAQstyle["accordion-box"]}
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          defaultExpanded={index === 0} 
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography className={FAQstyle["title-accordion"]}>{qa.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={FAQstyle['body-accordion']}>
              {qa.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box className={FAQstyle["help-info-box"]}>
        <Box className={FAQstyle["faq-box"]}>
          <EmailIcon className={FAQstyle["faq-icons"]} />
          <Typography>test@jdu.uz</Typography>
        </Box>
        <Box className={FAQstyle["faq-box"]}>
          <PhoneIcon className={FAQstyle["faq-icons"]} />
          <Typography>+998 90 123 45 67</Typography>
        </Box>
        <Box className={FAQstyle["faq-box"]}>
          <AccessTimeIcon className={FAQstyle["faq-icons"]} />
          <Typography>09:00 ~ 18:00</Typography>
        </Box>
        <Box className={FAQstyle["faq-box"]}>
          <LocationOnIcon className={FAQstyle["faq-icons"]} />
          <Typography>
            Tashkent, Shayhontohur district, Sebzor, 21
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default FAQ;
