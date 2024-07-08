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
} from "@mui/material";

import styles from "./Filter.module.css";

const Filter = ({ props }) => {
  const [formState, setFormState] = useState({});

  const handleChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  const renderField = (field) => {
    const width = field.minWidth || "160px";

    switch (field.type) {
      case "radio":
        return (
          <FormControl
            key={field.key}
            component="fieldset"
            sx={{ m: 1 }}
            style={{ width }}
          >
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={formState[field.key] || ""}
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
            key={field.key}
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
                      checked={(formState[field.key] || []).includes(option)}
                      onChange={(e) => {
                        const newValue = (formState[field.key] || []).includes(
                          option
                        )
                          ? (formState[field.key] || []).filter(
                              (item) => item !== option
                            )
                          : [...(formState[field.key] || []), option];
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
    console.log("Form Submitted with State:", formState);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={2} sx={{ p: 1 }}>
          <ButtonGroup fullWidth>
            <Button
              className={styles.submitButton}
              variant="contained"
              color="primary"
              type="submit"
              sx={{ m: 1 }}
            >
              検索
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={10} sx={{ p: 1 }}>
          <FormControl key="id" sx={{ m: 1 }} fullWidth>
            <TextField
              className={styles.textfield}
              label="名前"
              value=""
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>

      {props.map((field) => renderField(field))}
    </Box>
  );
};

export default Filter;
