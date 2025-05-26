'use client';

import { useState, useCallback, useEffect } from 'react';
import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Container,
  Grid,
  alpha,
  Zoom,
} from '@mui/material';
import Head from 'next/head';
import LoginForm from '../login-form';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const theme = useTheme();

  const handleSubmit = useCallback(async (values: { email: string; password: string }) => {
    try {
      const response = await authService.login(values.email, values.password);
      document.cookie = `token=${response.token}; path=/; secure; samesite=strict; max-age=86400`;
      login(response.token, response.user);
      router.push('/about');
    } catch (err) {
      setError('Invalid credentials');
    }
  }, [login, router]);

  useEffect(() => {
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
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`
            : `linear-gradient(135deg, ${alpha('#f8f9fa', 0.95)} 0%, ${alpha('#ffffff', 0.95)} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left side - Creative content */}
            <Grid item xs={12} md={6}>
              <Zoom in timeout={800}>
                <Box
                  sx={{
                    pr: { md: 4 },
                    textAlign: { xs: 'center', md: 'left' },
                    mb: { xs: 4, md: 0 },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                    }}
                  >
                    Discover My Creative Journey
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      fontWeight: 400,
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                    }}
                  >
                    Explore a world of innovation and creativity through my portfolio. 
                    Every project tells a unique story of passion and expertise.
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      flexWrap: 'wrap',
                    }}
                  >
                    {['Web Development', 'UI/UX Design', 'Creative Solutions'].map((tag) => (
                      <Paper
                        key={tag}
                        elevation={0}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          background: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.1)
                            : alpha(theme.palette.primary.main, 0.05),
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.2)
                            : alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            background: theme.palette.mode === 'dark'
                              ? alpha(theme.palette.primary.main, 0.15)
                              : alpha(theme.palette.primary.main, 0.08),
                          },
                        }}
                      >
                        {tag}
                      </Paper>
                    ))}
                  </Box>
                </Box>
              </Zoom>
            </Grid>

            {/* Right side - Login form */}
            <Grid item xs={12} md={6}>
              <Zoom in timeout={1000}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.paper, 0.8)
                      : alpha('#ffffff', 0.8),
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.05),
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 12px 48px rgba(0, 0, 0, 0.4)'
                        : '0 12px 48px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <LoginForm onSubmit={handleSubmit} error={error} />
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
