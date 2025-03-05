import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

export default function Login() {
    return (
        <Container maxWidth="md" className='login-container'>
            <Paper elevation={8} sx={{ margin: "auto", textAlign:"end" }}>
                <Typography
                    sx={{
                        color: '#1976d2',
                        textAlign: "center",
                        fontSize: { xs: "24px", md: "34px" },
                        paddingTop: "20px",
                    }}>Login Now
                </Typography>
                <Box
                    component="form"
                    sx={{ padding: '20px', paddingTop:"0px" }}
                    noValidate
                >
                    <TextField
                        id="email"
                        name='email'
                        label="Email"
                        variant="outlined"
                        sx={{ width: '100%', marginTop: '15px' }}
                    />
                    <TextField
                        id="password"
                        name='password'
                        label="Password"
                        variant="outlined"
                        sx={{ width: '100%', marginTop: '15px' }}
                    />
                    <Button type='submit' variant="outlined" sx={{ marginTop: "15px" }}>login</Button>
                </Box>
            </Paper>
        </Container>
    )
};
