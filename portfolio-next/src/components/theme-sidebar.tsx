'use client';

import { useState } from 'react';
import { Box, IconButton, Switch, useTheme as useMuiTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@/context/ThemeContext';

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  right: '1rem',
  top: '1rem',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
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
  const [isOpen, setIsOpen] = useState(false);
  const { mode, toggleTheme } = useTheme();
  const theme = useMuiTheme();

  return (
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
  );
} 