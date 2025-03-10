"use client"
import { store } from '@/library/redux/store';
import { getLogin } from '@/library/redux/userSlice';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function Login() {
    let dispatch = useDispatch<typeof store.dispatch>();
    let initialValues: { email: string, password:string} ={
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least 8 characters, uppercase letter, lowercase letter, number, and special symbol.'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
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
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
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
