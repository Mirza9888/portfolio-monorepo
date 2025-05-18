'use client';

import React, { useEffect, useState } from 'react';
import { Container, Fade, Box, CircularProgress, Typography } from '@mui/material';

interface SectionWrapperProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  topMargin?: number;
}

export default function SectionWrapper({ 
  children, 
  maxWidth = 'md',
  topMargin = 15 
}: SectionWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setMounted(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  if (error) {
    return (
      <Container maxWidth={maxWidth} sx={{ py: 4, mt: topMargin }}>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" variant="h6">
            Error loading section. Please try again later.
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!mounted) {
    return (
      <Container maxWidth={maxWidth} sx={{ py: 4, mt: topMargin }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress color="primary" />
        </Box>
      </Container>
    );
  }

  return (
    <Fade in={mounted} timeout={500}>
      <Container 
        maxWidth={maxWidth} 
        sx={{ 
          py: 4, 
          mt: topMargin,
          minHeight: '100vh',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {children}
      </Container>
    </Fade>
  );
} 