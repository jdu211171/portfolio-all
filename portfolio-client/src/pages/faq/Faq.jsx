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

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        FAQ
      </Typography>
      {Array(8).fill().map((_, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          defaultExpanded={index === 0} 
          sx={{ width: '70%' }} 
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography>What are the check-in and check-out times?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The check-in time is from 2:00 PM and the check-out time is until 12:00 PM.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box style={{ marginTop: '2rem' }}>
        <Box display="flex" style={{ marginBottom: '1rem' }}>
          <EmailIcon />
          <Typography style={{ marginLeft: '0.5rem' }}>test@jdu.uz</Typography>
        </Box>
        <Box display="flex" alignItems="center" style={{ marginBottom: '1rem' }}>
          <PhoneIcon />
          <Typography style={{ marginLeft: '0.5rem' }}>+998 90 123 45 67</Typography>
        </Box>
        <Box display="flex" alignItems="center" style={{ marginBottom: '1rem' }}>
          <AccessTimeIcon />
          <Typography style={{ marginLeft: '0.5rem' }}>09:00 ~ 18:00</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <LocationOnIcon />
          <Typography style={{ marginLeft: '0.5rem' }}>
            Tashkent, Shayhontohur district, Sebzor, 21
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default FAQ;
