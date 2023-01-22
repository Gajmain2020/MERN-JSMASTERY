import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

const Input = ({
  name,
  half,
  handleChange,
  label,
  autoFocus,
  handleShowPassword,
  type,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        varient="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <div>O</div> : <div>o</div>}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
