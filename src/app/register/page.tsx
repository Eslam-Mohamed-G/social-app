"use client";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import * as React from 'react';
import { useFormik } from 'formik';

interface SignupDataType {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
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
    gender: '',
  };

  async function onSubmit(values: SignupDataType) {
    try {
      const response = await axios.post("https://linked-posts.routemisr.com/users/signup", values)
      console.log(response.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues,
    onSubmit,
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
            value={values.name}
            onChange={handleChange}
          />

          <TextField
            id="email"
            name='email'
            type='email'
            label="Email"
            variant="outlined"
            sx={{ width: '100%', marginTop: '15px' }}
            value={values.email}
            onChange={handleChange}
          />

          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name='password'
              value={values.password}
              onChange={handleChange}
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
            <InputLabel htmlFor="rePassword">RePassword</InputLabel>
            <OutlinedInput
              id="rePassword"
              name='rePassword'
              value={values.rePassword}
              onChange={handleChange}
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
            value={values.dateOfBirth}
            onChange={handleChange}
          />

          {/*   gender   gender   gender   */}
          <FormControl sx={{ width: '100%', textAlign: "left", marginTop: '15px' }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name='gender'
              label="Gender"
              value={values.gender}
              onChange={handleChange}
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
