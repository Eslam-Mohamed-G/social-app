"use client"
import { store } from '@/library/redux/store';
import { getLogin } from '@/library/redux/userSlice';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function Login() {
    let dispatch = useDispatch<typeof store.dispatch>();
    let initialValues: { email: string, password:string} ={
        email: '',
        password: '',
    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values)=>{ 
            dispatch(getLogin(values)).then((resp) =>{
                console.log('form login', resp?.payload?.response?.data?.error);
                if(resp?.payload?.data?.message === 'success'){ 
                    toast.success('Successfully Login!')
                }else {
                    toast.error(resp?.payload?.response?.data?.error)
                }
            }).catch((error)=>{console.log(error)})
        }
    });
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
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        id="email"
                        name='email'
                        label="Email"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        sx={{ width: '100%', marginTop: '15px' }}
                    />
                    <TextField
                        id="password"
                        name='password'
                        label="Password"
                        variant="outlined"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        sx={{ width: '100%', marginTop: '15px' }}
                    />
                    <Button type='submit' variant="outlined" sx={{ marginTop: "15px" }}>login</Button>
                </Box>
            </Paper>
        </Container>
    )
};
