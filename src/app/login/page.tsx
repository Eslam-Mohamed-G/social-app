"use client"
import { store } from '@/library/redux/store';
import { getLogin, setUserIsLoggedIn } from '@/library/redux/userSlice';
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface LoginDataType {
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const handlePassowrdVisibility = () => {
    setShowPassword((prev) => !prev)
    };

    let dispatch = useDispatch<typeof store.dispatch>();
    let initialValues: LoginDataType = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least 8 characters, uppercase letter, lowercase letter, number, and special symbol.'),
    });

    async function onSubmit(values: LoginDataType) {
        setIsLoading(true);
        try {
            const response = await axios.post("https://linked-posts.routemisr.com/users/signin", values);
            console.log(response);
            if(response?.data?.message === "success") {
                Cookies.set("token", response.data.token);
                dispatch(setUserIsLoggedIn(true))
                router.push("/")
            } else {
                toast.error(response?.data?.error)
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit,
        // onSubmit: (values) => {
        //     dispatch(getLogin(values)).then((resp) => {
        //         console.log('form login', resp?.payload?.response?.data?.error);
        //         if (resp?.payload?.data?.message === 'success') {
        //             toast.success('Successfully Login!')
        //         } else {
        //             toast.error(resp?.payload?.response?.data?.error)
        //         }
        //     }).catch((error) => { console.log(error) })
        // }
    });
    return (
        <Container maxWidth="md" className='login-container'>
            <Paper elevation={8} sx={{ margin: "auto", textAlign: "end" }}>
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
                    sx={{ padding: '20px', paddingTop: "0px" }}
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

                    <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handlePassowrdVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <Typography color="error" variant="caption" sx={{ textAlign: "start", paddingLeft: "15px" }}>{formik.errors.password}</Typography>
                        )}
                    </FormControl>
                    <Button loading={isLoading} loadingPosition="end" type='submit' variant="outlined" sx={{ marginTop: "15px" }}>login</Button>
                </Box>
            </Paper>
        </Container>
    )
};
