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
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    logout();
    setAnchorEl(null);
    router.push('/login');
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'About Me', href: '/about', icon: '/icons/assistance.png' },
    { text: 'Content', href: '/content', icon: '/icons/responsive.png' },
    { text: 'Experience', href: '/experience', icon: '/icons/24-hours.png' },
    { text: 'Contact', href: '/contact', icon: '/icons/telephone.png' },
  ];

  const mobileDrawerList = (
    <Box 
      sx={{ width: 250 }} 
      role="presentation" 
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            button 
            component={Link} 
            href={item.href} 
            key={item.text}
            sx={{
              my: 1,
              mx: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
              }
            }}
          >
            <ListItemIcon>
              <img
                src={item.icon}
                alt={item.text}
                style={{
                  width: 22,
                  height: 22,
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                }}
              />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {user ? (
          <ListItem 
            button 
            onClick={handleLogout}
            sx={{
              my: 1,
              mx: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
              }
            }}
          >
            <ListItemIcon>
              <img
                src="/icons/house.png"
                alt="Logout"
                style={{
                  width: 22,
                  height: 22,
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem 
            button 
            component={Link} 
            href="/login"
            sx={{
              my: 1,
              mx: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
              }
            }}
          >
            <ListItemIcon>
              <img
                src="/icons/house.png"
                alt="Login"
                style={{
                  width: 22,
                  height: 22,
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))'
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

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
            {/* Left side - Logo or Brand placeholder */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer(true)}
                  sx={{ 
                    mr: 2, 
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.08)',
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Box sx={{ width: isMobile ? '50px' : '120px' }} />
            </Box>
            
            {/* Middle - Navigation links only shown on desktop */}
            {!isMobile && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
              width: isMobile ? '50px' : '120px', 
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
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {mobileDrawerList}
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
}