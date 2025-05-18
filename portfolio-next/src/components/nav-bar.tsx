'use client';

import React, { useState, useEffect } from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';

function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const [mounted, setMounted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShouldHide(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, lastScrollY]);

  if (!mounted) return null;

  return (
    <Slide 
      appear={false} 
      direction="down" 
      in={!shouldHide}
      timeout={300}
      easing={{
        enter: 'cubic-bezier(0.4, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted || isLoading) {
    return null;
  }

  const handleLogout = async () => {
    try {
      document.cookie = 'token=; Max-Age=0; path=/';
      logout();
      setAnchorEl(null);
      setMobileMenuOpen(false);
      await router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navItems = [
    { text: 'About Me', href: '/about', icon: '/icons/assistance.png' },
    { text: 'Content', href: '/content', icon: '/icons/responsive.png' },
    { text: 'Experience', href: '/experience', icon: '/icons/24-hours.png' },
    { text: 'Contact', href: '/contact', icon: '/icons/telephone.png' },
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 300,
          backgroundColor: 'white',
        },
      }}
    >
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
              },
            }}
          >
            <img
              src={item.icon}
              alt={item.text}
              style={{
                width: 22,
                height: 22,
                marginRight: 12,
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
              }}
            />
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {!user && (
          <ListItem
            component={Link}
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
              },
            }}
          >
            <img
              src="/icons/house.png"
              alt="Login"
              style={{
                width: 20,
                height: 20,
                marginRight: 12,
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
              }}
            />
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  return (
    <HideOnScroll>
      <>
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
              <Box sx={{ width: { xs: 'auto', md: '120px' } }} />
              
              {!isMobile ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {navItems.map((item) => (
                    <Button 
                      key={item.text}
                      component={Link} 
                      href={item.href} 
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
              ) : (
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.08)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <Box sx={{ width: { xs: 'auto', md: '120px' }, display: 'flex', justifyContent: 'flex-end' }}>
                {!user && !isMobile ? (
                  <Button
                    component={Link}
                    href="/login"
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: theme.shape.borderRadius,
                      px: 3,
                      py: 1,
                      boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)'
                      }
                    }}
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
                  >
                    Login
                  </Button>
                ) : user && !isMobile ? (
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
                ) : null}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu()}
      </>
    </HideOnScroll>
  );
}