"use client";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from 'react';
import { useFormik } from 'formik';

interface SignupDataType {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: "male" | "female"
}

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const initialValues: SignupDataType = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    dateOfBirth: '',
    gender: 'male',
  };

  const { handleSubmit, values} = useFormik({
    initialValues,
    onSubmit: () =>{}
  });
  return (
    <Container maxWidth='md' sx={{ padding: "20px" }}>
      <Paper sx={{ width: '100%', margin: 'auto', textAlign: "end" }} elevation={8}>
        <Typography
          sx={{
            color: '#1976d2',
            textAlign: "center",
            fontSize: { xs: "24px", md: "34px" },
            paddingTop: "20px",
          }}>Register
        </Typography>
        <Box
          component="form"
          sx={{ padding: '20px' }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="name"
            type='text'
            name='name'
            label="Name"
            variant="outlined"
            sx={{ width: '100%', marginTop: '15px' }}
          />
          <TextField
            id="email"
            name='email'
            type='email'
            label="Email"
            variant="outlined"
            sx={{ width: '100%', marginTop: '15px' }}
          />
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name='password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="repassword">RePassword</InputLabel>
            <OutlinedInput
              id="repassword"
              name='repassword'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="RePassword"
            />
          </FormControl>

          <TextField
            id="dateOfBirth"
            name='dateOfBirth'
            type='date'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            label="Birth Day"
            variant="outlined"
            sx={{ width: '100%', marginTop: '15px' }}
          />
          <FormControl sx={{ width: '100%', marginTop: '15px' }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='gender'
              label="Gender"
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
          <Button type='submit' variant="outlined" sx={{ marginTop: "15px" }}>Register</Button>
        </Box>
      </Paper>
    </Container>
  )
};
