'use client';

import { useState } from 'react';
import { Box, IconButton, Switch, useTheme as useMuiTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@/context/ThemeContext';

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  backgroundColor: 'transparent',
  transition: 'all 0.3s ease-in-out',
}));

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: theme.palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.grey[500],
  },
}));

export default function ThemeSidebar() {
  const { mode, toggleTheme } = useTheme();
  const theme = useMuiTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <SidebarContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Brightness7Icon color={mode === 'light' ? 'primary' : 'action'} />
          <ThemeSwitch
            checked={mode === 'dark'}
            onChange={toggleTheme}
            inputProps={{ 'aria-label': 'toggle theme' }}
          />
          <Brightness4Icon color={mode === 'dark' ? 'primary' : 'action'} />
        </Box>
      </SidebarContainer>
    </Box>
  );
} 