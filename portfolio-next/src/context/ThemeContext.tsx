'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import baseTheme from '@/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const theme = createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode,
      ...(mode === 'light'
        ? {
            // Light mode colors (using your existing theme)
            primary: baseTheme.palette.primary,
            secondary: baseTheme.palette.secondary,
            background: baseTheme.palette.background,
            text: baseTheme.palette.text,
          }
        : {
            // Dark mode colors
            primary: {
              ...baseTheme.palette.primary,
              main: '#90caf9',
              light: '#e3f2fd',
              dark: '#42a5f5',
            },
            secondary: {
              ...baseTheme.palette.secondary,
              main: '#ce93d8',
              light: '#f3e5f5',
              dark: '#ab47bc',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: 'rgba(255, 255, 255, 0.87)',
              secondary: 'rgba(255, 255, 255, 0.6)',
              disabled: 'rgba(255, 255, 255, 0.38)',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
            action: {
              active: 'rgba(255, 255, 255, 0.56)',
              hover: 'rgba(255, 255, 255, 0.08)',
              selected: 'rgba(255, 255, 255, 0.16)',
              disabled: 'rgba(255, 255, 255, 0.3)',
              disabledBackground: 'rgba(255, 255, 255, 0.12)',
            },
          }),
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 