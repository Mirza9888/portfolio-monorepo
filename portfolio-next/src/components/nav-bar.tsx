'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@/context/AuthContext';
import useMediaQuery from '@mui/material/useMediaQuery';

function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    logout();
    setAnchorEl(null);
    router.push('/login');
  };

  const navItems = [
    { text: 'About Me', href: '/about', icon: '/icons/assistance.png' },
    { text: 'Content', href: '/content', icon: '/icons/responsive.png' },
    { text: 'Experience', href: '/experience', icon: '/icons/24-hours.png' },
    { text: 'Contact', href: '/contact', icon: '/icons/telephone.png' },
  ];

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: '0 1px 8px rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar 
            disableGutters 
            sx={{ 
              height: '70px',
              flexDirection: isMobile ? 'column' : 'row',
              pt: isMobile ? 1 : 0,
              pb: isMobile ? 1 : 0
            }}
          >
            {/* Top row in mobile: Main navigation */}
            {isMobile && (
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  mb: 1
                }}
              >
                {navItems.map((item) => (
                  <IconButton
                    key={item.text}
                    component={Link}
                    href={item.href}
                    aria-label={item.text}
                    sx={{
                      mx: { xs: 2, sm: 3 },
                      color: theme.palette.primary.main,
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.text}
                      style={{
                        width: 24,
                        height: 24,
                        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                      }}
                    />
                  </IconButton>
                ))}
              </Box>
            )}

            {/* Desktop layout or bottom row in mobile */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
              {/* Left side - Logo or Brand placeholder */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: '120px'
              }}>
                <Box sx={{ width: '100%' }} />
              </Box>
              
              {/* Middle - Navigation links shown only on desktop */}
              {!isMobile && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  flexGrow: 1
                }}>
                  {navItems.map((item) => (
                    <Button 
                      key={item.text}
                      component={Link} 
                      href={item.href} 
                      sx={{ 
                        mx: { xs: 0.5, sm: 1, md: 2 }, 
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                        borderRadius: theme.shape.borderRadius,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: 'rgba(33, 150, 243, 0.08)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                      startIcon={
                        <img 
                          src={item.icon}
                          alt={item.text} 
                          style={{ 
                            width: 22, 
                            height: 22, 
                            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                          }} 
                        />
                      }
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Right side - User avatar or login button */}
              <Box sx={{ 
                width: '120px', 
                display: 'flex', 
                justifyContent: 'flex-end'
              }}>
                {user ? (
                  <>
                    <IconButton 
                      onClick={(e) => setAnchorEl(e.currentTarget)} 
                      sx={{ 
                        p: 0.5,
                        border: '2px solid rgba(33, 150, 243, 0.2)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: 'rgba(33, 150, 243, 0.05)',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <Avatar 
                        alt={user.name || 'User Avatar'} 
                        src={`/static/images/avatar/${user.avatarId || 1}.jpg`}
                        sx={{
                          width: 36,
                          height: 36,
                          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        sx: {
                          mt: 1.5,
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                          borderRadius: theme.shape.borderRadius,
                          minWidth: '150px',
                          border: '1px solid rgba(0, 0, 0, 0.05)'
                        }
                      }}
                    >
                      <MenuItem 
                        onClick={handleLogout}
                        sx={{
                          borderRadius: '6px',
                          mx: 0.5,
                          px: 2,
                          py: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(33, 150, 243, 0.08)'
                          }
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  !isMobile && (
                    <Button 
                      component={Link} 
                      href="/login"
                      startIcon={
                        <img 
                          src="/icons/house.png" 
                          alt="Login" 
                          style={{ 
                            width: 20, 
                            height: 20,
                            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                          }} 
                        />
                      }
                      sx={{ 
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                        borderRadius: theme.shape.borderRadius,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: 'rgba(33, 150, 243, 0.08)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Login
                    </Button>
                  )
                )}
                {isMobile && !user && (
                  <IconButton
                    component={Link}
                    href="/login"
                    aria-label="Login"
                    sx={{
                      color: theme.palette.primary.main,
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                      }
                    }}
                  >
                    <img
                      src="/icons/house.png"
                      alt="Login"
                      style={{
                        width: 22,
                        height: 22,
                        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                      }}
                    />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}