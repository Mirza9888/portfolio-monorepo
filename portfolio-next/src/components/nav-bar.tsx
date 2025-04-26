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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    logout();
    setAnchorEl(null);
    router.push('/login');
  };

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
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '70px' }}>
            <Box sx={{ width: '120px' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                component={Link} 
                href="/about" 
                sx={{ 
                  mx: 2, 
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
                    src="/icons/assistance.png" 
                    alt="About" 
                    style={{ 
                      width: 22, 
                      height: 22, 
                      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                    }} 
                  />
                }
              >
                About Me
              </Button>
              <Button 
                component={Link} 
                href="/content" 
                sx={{ 
                  mx: 2, 
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
                    src="/icons/responsive.png" 
                    alt="Content" 
                    style={{ 
                      width: 22, 
                      height: 22, 
                      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                    }} 
                  />
                }
              >
                Content
              </Button>
              <Button 
                component={Link} 
                href="/experience" 
                sx={{ 
                  mx: 2, 
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
                    src="/icons/24-hours.png" 
                    alt="Experience" 
                    style={{ 
                      width: 22, 
                      height: 22, 
                      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                    }} 
                  />
                }
              >
                Experience
              </Button>
              <Button 
                component={Link} 
                href="/contact" 
                sx={{ 
                  mx: 2, 
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
                    src="/icons/telephone.png" 
                    alt="Contact" 
                    style={{ 
                      width: 22, 
                      height: 22, 
                      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                    }} 
                  />
                }
              >
                Contact
              </Button>
            </Box>

            <Box sx={{ width: '120px', display: 'flex', justifyContent: 'flex-end' }}>
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
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}