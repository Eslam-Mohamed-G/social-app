"use client";
import { Box, Container, Paper, TextField } from '@mui/material';
import React from 'react';

interface SignupValues {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string
}

export default function Register() {
  const initialValues: SignupValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    dateOfBirth: '',
    gender: '',
  }
  return (
    <Container maxWidth='md'>
      <Paper sx={{ width: '100%', margin: 'auto' }} elevation={24}>
        <Box
          component="form"
          sx={{ marginBlock: '20px', padding:'20px' }}
        >
          <TextField
            id="name"
            name='name'
            label="Name"
            variant="outlined"
            sx={{ width: '100%', marginTop:'15px' }}
          />
          <TextField
            id="email"
            name='email'
            label="Email"
            variant="outlined"
            sx={{ width: '100%', marginTop:'15px' }}
          />
          <TextField
            id="password"
            name='password'
            label="Password"
            variant="outlined"
            sx={{ width: '100%', marginTop:'15px' }}
          />
          <TextField
            id="rePassword"
            name='rePassword'
            label="rePassword"
            variant="outlined"
            sx={{ width: '100%', marginTop:'15px' }}
          />
          <TextField
            id="dateOfBirth"
            name='dateOfBirth'
            label="Birth Day"
            variant="outlined"
            sx={{ width: '100%', marginTop:'15px' }}
          />
          <TextField
            id="gender"
            name='gender'
            label="gender"
            variant="outlined"
            sx={{ width: '100%', marginTop:'15px' }}
          />
        </Box>
      </Paper>
    </Container>
  )
};
