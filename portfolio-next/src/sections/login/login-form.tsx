'use client';

import { useState, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  useTheme,
  Fade,
  Grow,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Login as LoginIcon } from '@mui/icons-material';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
  error?: string;
}

export default function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const initialValues = {
    email: '',
    password: '',
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3,
          fontWeight: 600,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Welcome Back
      </Typography>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Grow in timeout={1000}>
              <Box>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{ 
                    required: false,
                    sx: { 
                      fontWeight: 500,
                      color: theme.palette.text.secondary
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ 
                          color: theme.palette.primary.main,
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          }
                        }} />
                      </InputAdornment>
                    ),
                    sx: {
                      '&.Mui-focused': {
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(33, 150, 243, 0.04)',
                      },
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.2s ease-in-out',
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                        transform: 'scale(1.01)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px',
                      },
                    }
                  }}
                />
              </Box>
            </Grow>

            <Grow in timeout={1200}>
              <Box>
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputLabelProps={{ 
                    required: false,
                    sx: { 
                      fontWeight: 500,
                      color: theme.palette.text.secondary
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ 
                          color: theme.palette.primary.main,
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          }
                        }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                          size="small"
                          sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(33, 150, 243, 0.08)',
                              transform: 'scale(1.1)',
                            },
                            padding: '4px',
                            transition: 'all 0.2s ease-in-out',
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
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(33, 150, 243, 0.04)',
                      },
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.2s ease-in-out',
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                        transform: 'scale(1.01)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px',
                      },
                    }
                  }}
                />
              </Box>
            </Grow>

            <Fade in={Boolean(error)} timeout={500}>
              <Box>
                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mt: 2,
                      borderRadius: 2,
                      '& .MuiAlert-icon': {
                        color: theme.palette.error.main
                      }
                    }}
                  >
                    {error}
                  </Alert>
                )}
              </Box>
            </Fade>

            <Grow in timeout={1400}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                startIcon={<LoginIcon />}
                sx={{ 
                  mt: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                    transform: 'translateY(-2px) scale(1.02)',
                  },
                  '&:active': {
                    transform: 'translateY(0) scale(0.98)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </Grow>
          </Form>
        )}
      </Formik>
    </Box>
  );
} 