import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
  FormLabel,
  FormGroup,
  Box,
  Grid,
  ButtonGroup,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import style from "./Filter.module.css";

const Filter = ({ fields, filterState, onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange(key, value);
  };

  const renderField = (field, index) => {
    const width = field.minWidth || "160px";

    switch (field.type) {
      case "radio":
        return (
          <FormControl
            key={field.key + index}
            component="fieldset"
            sx={{ m: 1 }}
            style={{ width }}
          >
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={filterState[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
            >
              {field.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControl
            key={field.key + index}
            component="fieldset"
            sx={{ m: 1 }}
            style={{ width }}
          >
            <FormLabel component="legend">{field.label}</FormLabel>
            <FormGroup>
              {field.options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={(filterState[field.key] || []).includes(option)}
                      onChange={(e) => {
                        const newValue = (filterState[field.key] || []).includes(option)
                          ? (filterState[field.key] || []).filter(item => item !== option)
                          : [...(filterState[field.key] || []), option];
                        handleChange(field.key, newValue);
                      }}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </FormControl>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted with State:", filterState);
  };

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      setCollapse(true);
    } else {
      setCollapse(false);
      setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={open ? style.open : style.closed}
      id="filter"
    >
      <Grid
        container
        spacing={1}
        className={style.filterBar}
        justifyContent="space-between"
      >
        <Grid item xs={2}>
          <ButtonGroup fullWidth>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                fontSize: {
                  xs: "0.75rem", // Small screen
                  sm: "1rem", // Medium and larger screens
                },
                padding: {
                  xs: "0px 0px", // Small screen
                  sm: "0px 0px", // Medium and larger screens
                },
              }}
            >
              検索
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={10} sx={{ p: 1 }}>
          <FormControl fullWidth>
            <TextField
              className={style.textfield}
              label="名前"
              value={filterState.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <IconButton
          onClick={handleClick}
          style={{ width: "100%", height: "5px", padding: "0 10px" }}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Grid>
      <Collapse in={collapse} timeout={300}>
        <Grid container spacing={1} className={style.filterFields}>
          {fields.map((field, index) => renderField(field, index))}
        </Grid>
      </Collapse>
    </Box>
  );
};

export default Filter;
