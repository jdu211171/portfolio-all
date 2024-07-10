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
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container style={{ marginTop: '2rem', maxWidth: "70%", marginLeft: 0 }}>
      <Typography variant='h5' gutterBottom className={FAQstyle["faq-title"]}>
        FAQ
      </Typography>
      {Array(8).fill().map((_, index) => (
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
            <Typography className={FAQstyle["title-accordion"]}>What are the check-in and check-out times?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={FAQstyle['body-accordion']}>
              The check-in time is from 2:00 PM and the check-out time is until 12:00 PM.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ display: 'flex', marginTop: "40px"}}>
        <Box sx={{ display: 'flex',  mr: 2  }} >
          <EmailIcon  />
          <Typography>test@jdu.uz</Typography>
        </Box>
        <Box sx={{ display: 'flex',  mr: 2  }} >
          <PhoneIcon  />
          <Typography>+998 90 123 45 67</Typography>
        </Box>
        <Box sx={{ display: 'flex',  mr: 2  }} >
          <AccessTimeIcon  />
          <Typography>09:00 ~ 18:00</Typography>
        </Box>
        <Box sx={{ display: 'flex',  mr: 2  }} >
          <LocationOnIcon  />
          <Typography>
            Tashkent, Shayhontohur district, Sebzor, 21
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default FAQ;
