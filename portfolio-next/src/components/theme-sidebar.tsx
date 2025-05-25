'use client';

import { useState } from 'react';
import { Box, IconButton, Switch, useTheme as useMuiTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@/context/ThemeContext';

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px 0 0 8px',
  transition: 'transform 0.3s ease-in-out',
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
    <SidebarContainer
      sx={{
        transform: isOpen ? 'translateY(-50%)' : 'translate(calc(100% - 40px), -50%)',
      }}
    >
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'absolute',
          left: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: theme.palette.background.paper,
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {isOpen ? '→' : '←'}
      </IconButton>
      
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