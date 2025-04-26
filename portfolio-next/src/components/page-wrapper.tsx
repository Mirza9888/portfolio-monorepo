'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                py: 3,
                px: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: '500px',
                    width: '100%',
                    p: 4,
                    borderRadius: 2,
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default PageWrapper;