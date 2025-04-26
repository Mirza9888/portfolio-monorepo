'use client';

import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  useTheme,
  Avatar
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ExperienceSkillSection from '../experience-skill-section';
import ExperienceCardSection from '../experience-card-section';


export default function ExperienceView() {
  const theme = useTheme();

  const skills = {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "MaterialUI", "TailwindCSS", "SCSS", "HTML5", "CSS3"],
    backend: ["PHP", "Laravel", "RESTful APIs"],
    database: ["MySQL", "MeiliSearch"],
    devops: ["Docker", "Git", "CI/CD pipelines", "Cloudflare"],
    ecommerce: ["WooCommerce", "Custom e-commerce solutions", "Payment gateway integration"]
  };

  const experiences = [
    {
      company: "MS UP",
      location: "Slovenia (Remote)",
      position: "Full Stack Developer",
      project: "ESM E-commerce platform",
      period: "January 2024 - Present",
      avatar: "MS",
      description: "As a Full Stack Developer at MS UP, I've been responsible for building and maintaining various components of the ESM E-commerce platform. My work involves both backend and frontend development, implementing robust solutions for order management, customer service, and analytics.",
      accomplishments: [
        "Built Order Management System with admin dashboard featuring Meilisearch integration for high-performance search across hundreds of thousands of orders, enabling real-time order tracking, instant customer lookup and delivery monitoring.",
        "Upgraded Complaints Management System from PHP/Laravel to modern stack (PHP/Laravel + React/Next.js), creating user-friendly return/exchange interface and admin dashboard for complaint tracking.",
        "Developed WooCommerce Surprise Product System with automated product creation, cross-store synchronization and MetaKocka integration, enabling seamless management of special promotional items.",
        "Built Package Delivery Analytics System with real-time reporting dashboards, featuring multi-dimensional data tables (by country, store, product) and caching system for efficient performance tracking of delivery statuses.",
        "Implemented Payment Management System with dynamic fee calculation engine, enabling flexible payment processing through percentage-based, fixed-fee, or metadata-driven fee structures.",
        "Implemented multi-platform Cache Management System integrating Cloudflare and other caching solutions, enabling automated cache purging across multiple zones for improved application performance.",
        "Implemented Real-time Notification System using Slack integration for automated alerts on order synchronization, system status changes and critical business events across multiple platforms."
      ]
    },
    {
      company: "Independent Project",
      location: "Self-directed",
      position: "Full Stack Developer",
      project: "E-commerce Platform",
      period: "2022 - 2023",
      avatar: "EP",
      description: "After transitioning to web development, I developed a comprehensive e-commerce platform providing users with a complete online shopping experience. This self-directed project showcased my ability to handle complex system architecture and integrate various e-commerce components.",
      accomplishments: [
        "Built core system using PHP Laravel framework with Blade templates, implementing essential e-commerce functionalities like product management and order processing.",
        "Created intuitive shopping interface with robust shopping cart system and secure checkout process for seamless user experience.",
        "Developed comprehensive inventory management system enabling efficient product tracking and order fulfillment based on real-time stock availability.",
        "Implemented secure payment processing integration with multiple payment gateways for diverse payment options.",
        "Designed responsive frontend ensuring optimal display across various devices and screen sizes."
      ]
    }
  ];

  const testimonials = [
    {
      quote: "During his time with our company, Mirza has demonstrated exceptional professionalism, technical expertise, and a remarkable ability to quickly adapt to new challenges. We would particularly like to highlight his capacity for independent work, as well as his excellent communication skills in a team environment.",
      author: "Omar Iriskic",
      position: "Lead Developer & Mentor at MS UP",
      avatar: "OI"
    },
    {
      quote: "Mirza has shown outstanding dedication to code quality and software development best practices, along with the ability to efficiently manage complex tasks and deadlines. His technical expertise, reliability, and professional approach to work make him a valuable asset to any development team.",
      author: "Ivan Savic",
      position: "Technical Director at MS UP",
      avatar: "IS"
    }
  ];

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
                Professional Experience
              </Typography>
              
              <ExperienceCardSection experiences={experiences} />

              <Divider 
                sx={{ 
                  my: 5,
                  '&::before, &::after': {
                    borderColor: 'rgba(0, 123, 255, 0.2)',
                  }
                }} 
              />
              
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  textAlign: 'center',
                  mt: 4,
                  mb: 4,
                  fontSize: '1.5rem',
                  position: 'relative',
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
                Professional Endorsements
              </Typography>
              
              <Grid container spacing={3}>
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box 
                      sx={{ 
                        p: { xs: 3, md: 4 }, 
                        bgcolor: 'rgba(33, 150, 243, 0.04)', 
                        borderRadius: theme.shape.borderRadius,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        border: '1px solid rgba(33, 150, 243, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)'
                        }
                      }}
                    >
                      <Box>
                        <FormatQuoteIcon 
                          sx={{ 
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            color: 'rgba(33, 150, 243, 0.2)',
                            fontSize: '2.2rem'
                          }} 
                        />
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontStyle: 'italic', 
                            mb: 3,
                            pl: 4,
                            fontSize: '1rem',
                            lineHeight: 1.7
                          }}
                        >
                          "{testimonial.quote}"
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mt: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: theme.palette.primary.main,
                            width: 44,
                            height: 44,
                            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
                          }}
                        >
                          {testimonial.avatar}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                          {testimonial.author}<br/>
                          <Typography component="span" variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {testimonial.position}
                          </Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider 
                sx={{ 
                  my: 5,
                  '&::before, &::after': {
                    borderColor: 'rgba(0, 123, 255, 0.2)',
                  }
                }} 
              />

              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  textAlign: 'center',
                  mt: 4,
                  mb: 4,
                  fontSize: '1.5rem',
                  position: 'relative',
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
                Technical Skills
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ExperienceSkillSection skills={skills} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}