'use client';

import React from 'react';
import { Container } from '@mui/material';

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
  return (
    <Container 
      maxWidth={maxWidth} 
      sx={{ 
        py: 4, 
        mt: topMargin,
        minHeight: '100vh'
      }}
    >
      {children}
    </Container>
  );
} 