"use client";
import { Box, Container, Paper, TextField } from '@mui/material';
import React from 'react';

export default function Signup() {
  return (
    <Container maxWidth='md'>
      <Paper sx={{ width: '50%', margin: 'auto' }} elevation={24}>
        <Box sx={{ marginBlock: '20px' }}>
          <TextField id="name" name='name' label="Name" variant="outlined" sx={{ width: '100%' }} />
        </Box>
      </Paper>
    </Container>
  )
};
