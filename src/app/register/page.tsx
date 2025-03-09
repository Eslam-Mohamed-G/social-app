"use client";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface SignupDataType {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
}

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePassowrdVisibility = () => {
    setShowPassword((prev) => !prev)
  };

  const initialValues: SignupDataType = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    dateOfBirth: '',
    gender: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least 8 characters, uppercase letter, lowercase letter, number, and special symbol.'),
    rePassword: Yup.string().required('The password must be confirmed').oneOf([Yup.ref('password')], 'Password does not match'),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  async function onSubmit(values: SignupDataType) {
    try {
      const response = await axios.post("https://linked-posts.routemisr.com/users/signup", values)
      console.log(response.data);
      if (response.data.message === "success") {
        toast.success('Register Successfully');
        router.push("/login");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
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
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
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
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name='password'
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
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
            {touched.password && errors.password && (
              <Typography color="error" variant="caption" sx={{ textAlign: "start", paddingLeft: "15px" }}>{errors.password}</Typography>
            )}
          </FormControl>

          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="rePassword">RePassword</InputLabel>
            <OutlinedInput
              id="rePassword"
              name='rePassword'
              value={values.rePassword}
              onChange={handleChange}
              error={touched.rePassword && Boolean(errors.rePassword)}
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
              label="RePassword"
            />
            {touched.rePassword && errors.rePassword && (
              <Typography color="error" variant="caption" sx={{ textAlign: "start", paddingLeft: "15px" }}>{errors.rePassword}</Typography>
            )}
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
            InputLabelProps={{ shrink: true }}
            error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
            helperText={touched.dateOfBirth && errors.dateOfBirth}
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
              error={touched.gender && Boolean(errors.gender)}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
            {touched.gender && errors.gender && (
              <Typography color="error" variant="caption" sx={{ textAlign: "start", paddingLeft: "15px" }}>{errors.gender}</Typography>
            )}
          </FormControl>

          <Button type='submit' variant="outlined" sx={{ marginTop: "15px" }}>Register</Button>
        </Box>
      </Paper>
    </Container>
  )
};
