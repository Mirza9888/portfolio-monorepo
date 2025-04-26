'use client';

import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  useTheme
} from '@mui/material';

export default function AboutView() {
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
            <Box sx={{ 
              p: { xs: 3, md: 5 }, 
              background: 'linear-gradient(to bottom, rgba(33, 150, 243, 0.02), rgba(255, 255, 255, 0))'
            }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  textAlign: "center",
                  position: 'relative',
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
                About Me
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  mb: 4, 
                  fontSize: '1.1rem', 
                  lineHeight: 1.7,
                  color: theme.palette.text.primary
                }}
              >
                My name is Mirza Redžić, I am 26 years old and I come from Bosnia and Herzegovina.
                I am a junior Full-stack Web Developer with over two years of hands-on experience
                working with technologies like PHP (Laravel), React, and Next.js. Outside of programming,
                I enjoy playing video games and futsal in my free time. I originally graduated from medical high school
                as a medical technician and later completed a degree in Physiotherapy and Occupational Therapy.
                This diverse background helps me approach problems from different perspectives and bring creative solutions to the table.
              </Typography>
              
              <Divider sx={{ 
                my: 5, 
                '&::before, &::after': {
                  borderColor: 'rgba(0, 123, 255, 0.2)',
                }
              }} />
              
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  textAlign: 'center',
                  position: 'relative',
                  mb: 4,
                  fontSize: '1.5rem', 
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    width: '50px',
                    height: '2px',
                    background: theme.palette.primary.main,
                    transform: 'translateX(-50%)'
                  }
                }}
              >
                Summary
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  mb: 4, 
                  fontSize: '1.1rem', 
                  lineHeight: 1.7,
                  color: theme.palette.text.primary
                }}
              >
                A passionate and motivated Full-stack Developer focused on building modern and responsive web applications.
                I enjoy solving complex problems and creating user-friendly interfaces. My technical skillset includes both
                frontend and backend development, especially in e-commerce and business-oriented platforms.
              </Typography>
              
              <Divider sx={{ 
                my: 5,
                '&::before, &::after': {
                  borderColor: 'rgba(0, 123, 255, 0.2)',
                }
              }} />
              
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  textAlign: "center",
                  position: 'relative',
                  mb: 4, 
                  fontSize: '1.5rem',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    width: '50px',
                    height: '2px',
                    background: theme.palette.primary.main,
                    transform: 'translateX(-50%)'
                  }
                }}
              >
                Education
              </Typography>
              <Box sx={{ px: { xs: 0, md: 2 }, py: 1 }}>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    color: theme.palette.text.primary,
                    mb: 2
                  }}
                >
                  <Box component="span" fontWeight="bold" sx={{ 
                    color: theme.palette.text.primary, 
                    fontSize: '1.15rem',
                    display: 'block',
                    mb: 1
                  }}>
                    College of Medical Sciences Doboj • 2017–2021
                  </Box>
                  After earning my degree in Physiotherapy and Occupational Therapy, I transitioned into the tech industry where
                  I found my passion for web development. Since then, I have built complete web solutions using modern technologies like
                  Laravel and React-based frameworks such as Next.js.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}