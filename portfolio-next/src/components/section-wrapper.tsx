'use client';

import React, { useEffect, useState } from 'react';
import { Container, Fade } from '@mui/material';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return null;
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