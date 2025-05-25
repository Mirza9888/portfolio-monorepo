'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  CardContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Head from 'next/head';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function Login() {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const initialValues = useMemo(() => ({
    email: '',
    password: '',
  }), []);

  const handleSubmit = useCallback(async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      const response = await authService.login(values.email, values.password);
      document.cookie = `token=${response.token}; path=/; secure; samesite=strict; max-age=86400`;
      login(response.token, response.user);
      router.push('/about');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  }, [login, router]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  useEffect(() => {
    // SEO optimization
    document.title = 'Login | Your Portfolio';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Login to access your portfolio dashboard');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login | Your Portfolio</title>
        <meta name="description" content="Login to access your portfolio dashboard" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Paper
          elevation={3}
          sx={{
            maxWidth: 400,
            padding: 3,
            borderRadius: (theme) => theme.shape.borderRadius * 2,
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Sign in to your account
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    InputLabelProps={{ required: false }}
                  />

                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputLabelProps={{ required: false }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                            size="small"
                            sx={{
                              color: 'primary.main',
                              '&:hover': {
                                backgroundColor: 'rgba(144, 202, 249, 0.2)',
                              },
                              padding: '4px',
                            }}
                          >
                            {showPassword ? 
                              <VisibilityOff sx={{ fontSize: '1.4rem' }} /> : 
                              <Visibility sx={{ fontSize: '1.4rem' }} />
                            }
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(144, 202, 249, 0.1)',
                        },
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '& input:-webkit-autofill': {
                          boxShadow: '0 0 0 1000px rgba(144, 202, 249, 0.3) inset',
                          transition: 'background-color 5000s ease-in-out 0s',
                        },
                        '& input:-webkit-autofill:focus': {
                          boxShadow: '0 0 0 1000px rgba(144, 202, 249, 0.4) inset',
                          transition: 'background-color 5000s ease-in-out 0s',
                        },
                      }
                    }}
                  />

                  {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{ mt: 3 }}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Paper>
      </Box>
    </>
  );
}
