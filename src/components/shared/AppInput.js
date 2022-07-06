import React from 'react';
import TextField from '@mui/material/TextField';

const AppInput = ({value, placeholder, error}) => {
  return (
    <TextField
      InputProps={{}}
      value={value}
      placeholder={placeholder}
      error={error}
    />
  );
};

export default AppInput;
