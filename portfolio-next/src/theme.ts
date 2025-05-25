'use client';
import { createTheme } from '@mui/material/styles';



const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans), "Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    
    h1: {
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
      marginBottom: '0.5em',
    },
    h2: {
      fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
      marginBottom: '0.5em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0em',
      marginBottom: '0.5em',
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      fontWeight: 600,
      lineHeight: 1.35,
      letterSpacing: '0.00735em',
      marginBottom: '0.5em',
    },
    h5: {
      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0em',
      marginBottom: '0.5em',
    },
    h6: {
      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.0075em',
      marginBottom: '0.5em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.9375rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      light: '#e3f2fd',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f3e5f5',
      main: '#9c27b0',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    mode: 'light',
  },
  shape: {
    borderRadius: 8,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '0.5rem 1.25rem',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'box-shadow 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
          },
          '& .MuiInputBase-input': {
            padding: '14px 16px',
            fontSize: '1rem',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '12px',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        elevation3: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '1rem 0',
          backgroundColor: 'rgba(0, 0, 0, 0.09)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'color 0.2s ease',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: '1rem',
        },
      },
    },
  },
});

export default theme;