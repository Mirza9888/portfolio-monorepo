'use client';

import { useState } from 'react';
import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper, // Koristi Paper umjesto Card
  CardContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);

      document.cookie = `token=${response.token}; path=/; secure; samesite=strict; max-age=86400`; // 24 hours
      login(response.token, response.user);

      router.push('/about'); 
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
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

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ required: false }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ required: false }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
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
              sx={{ mt: 3 }}
            >
              Sign in
            </Button>
          </Box>
        </CardContent>
      </Paper>
    </Box>
  );
}
