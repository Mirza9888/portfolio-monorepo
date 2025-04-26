'use client';

import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Link,
  useTheme,
  IconButton
} from '@mui/material';
import { useRouter } from 'next/navigation';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ContactView() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 4, mt: 15 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
          mb: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)'
          }
        }}
      >
        <Box 
          sx={{ 
            height: '6px', 
            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
          }} 
        />
        <Grid container>
          <Grid item xs={12}>
            <Box 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                textAlign: 'center',
                background: 'linear-gradient(to bottom, rgba(33, 150, 243, 0.02), rgba(255, 255, 255, 0))'
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  position: 'relative',
                  display: 'inline-block',
                  mb: 5, 
                  fontSize: '2rem', 
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-12px',
                    left: '50%',
                    width: '60px',
                    height: '3px',
                    background: theme.palette.primary.main,
                    transform: 'translateX(-50%)'
                  }
                }}
              >
                Contact Me
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  mb: 4 
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: '1.3rem'
                  }}
                >
                  Mirza Redžić
                </Typography>
              </Box>

              <Grid container spacing={4} sx={{ mt: 2 }}> 
                <Grid item xs={12} sm={4}>
                  <Box 
                    sx={{ 
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      gap: 1.5, 
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)'
                      }
                    }}
                  >
                    <IconButton 
                      sx={{ 
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          color: '#fff'
                        },
                        width: 64, 
                        height: 64, 
                        mb: 1.5 
                      }}
                    >
                      <EmailIcon sx={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" fontWeight={500} sx={{ fontSize: '1rem' }}>
                      Email
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500,
                        wordBreak: 'break-word',
                        fontSize: '1.1rem' 
                      }}
                    >
                      mirza.redzic@live.com
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box 
                    sx={{ 
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      gap: 1.5,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)'
                      }
                    }}
                  >
                    <IconButton 
                      sx={{ 
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          color: '#fff'
                        },
                        width: 64, 
                        height: 64, 
                        mb: 1.5
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: '1.8rem' }} /> 
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" fontWeight={500} sx={{ fontSize: '1rem' }}>
                      Phone
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '1.1rem'
                      }}
                    >
                      +387644015455
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box 
                    sx={{ 
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      gap: 1.5,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)'
                      }
                    }}
                  >
                    <IconButton 
                      component="a"
                      href="https://www.linkedin.com/in/mirza-redzic-4b727734a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: '#0a66c2',
                          color: '#fff'
                        },
                        width: 64, 
                        height: 64, 
                        mb: 1.5
                      }}
                    >
                      <LinkedInIcon sx={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" fontWeight={500} sx={{ fontSize: '1rem' }}>
                      LinkedIn
                    </Typography>
                    <Link
                      href="https://www.linkedin.com/in/mirza-redzic-4b727734a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ 
                        color: '#0a66c2', 
                        fontWeight: 500,
                        fontSize: '1.05rem' // Increased font size
                      }}
                    >
                      View Profile
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}