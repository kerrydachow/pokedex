import React, { useState, useContext } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { UserProfileContext } from "../../../contexts/UserProfile.Context";
import { useNavigate } from 'react-router-dom';

const LoginContainer = () => {
  const { setRefreshToken, setAccessToken, setUser } = useContext(UserProfileContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const userSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleFormSubmit = async (values) => {
    const { email, password } = values;
    try {
      setIsSubmitting(true);
      const userData = await axios.post("http://localhost:4001/api/user/login", {
        email,
        password,
      });
      console.log(userData.data.user);
      localStorage.setItem('user-details', JSON.stringify(userData.data.user));
      localStorage.setItem('access-token', userData.data.accessToken);
      localStorage.setItem('refresh-token', userData.data.refreshToken);
      setRefreshToken(userData.refreshToken);
      setAccessToken(userData.accessToken);
      setUser(userData.user);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
      navigate('/')
    }
  };

  return (
    <Container sx={{ padding: 20, mb: 20 }} maxWidth="xs">
      <Typography variant="h2" sx={{ mb: 5 }}>
        Login
      </Typography>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                label="Email"
                variant="filled"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="filled"
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                color="inherit"
                variant="contained"
                disabled={isSubmitting ? true : false}
                sx={{ gridColumn: "span 4", height: 50 }}
              >
                Login
              </Button>
            </Box>
            <Link href="signup" textAlign="center" color="inherit">
              <Typography variant="h6" sx={{ mt: 3 }}>
                Don't have an Account? <u>Create Account</u>
              </Typography>
            </Link>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginContainer;
