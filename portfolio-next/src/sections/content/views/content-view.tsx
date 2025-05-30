'use client';

import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CircularProgress,
  Fab,
  Button,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContentEditDialog from '../content-edit-dialog';
import { useContents } from '@/hooks/use-content';
import { useContentMutation } from '@/hooks/use-content-mutation';
import ContentImageViewer from '../content-image-viewer';
import ContentList from '../content-list';
import ContentImageCarousel from '../content-image-carousel';
import ContentDetails from '../content-details';
import ContentNotification from '../content-notification';
import SectionWrapper from '@/components/section-wrapper';
import { Content } from '@/types/content';

export default function ContentView() {
  const theme = useTheme();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  const { data: projects = [], isLoading, error: queryError } = useContents();
  const { createContent } = useContentMutation();

  // Memoize current project to prevent unnecessary re-renders
  const currentProject = useMemo(() => 
    projects[selectedProjectIndex] || {}, 
    [projects, selectedProjectIndex]
  );

  // Memoize project images
  const projectImages = useMemo(() => 
    currentProject.images || [], 
    [currentProject.images]
  );

  // SEO metadata
  const seoTitle = useMemo(() => 
    currentProject.title 
      ? `${currentProject.title} - Portfolio Projects` 
      : 'Portfolio Projects',
    [currentProject.title]
  );

  const seoDescription = useMemo(() => 
    currentProject.description 
      ? currentProject.description.substring(0, 160) 
      : 'View my portfolio projects showcasing my work and experience in web development.',
    [currentProject.description]
  );

  const handleProjectSelect = (index: number) => {
    setSelectedProjectIndex(index);
  };

  const openImageViewer = (index:number) => {
    setViewerImageIndex(index);
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };
  

  const handleSaveProject = async (formData:any) => {
    try {
      setSaveLoading(true);
      await createContent.mutateAsync(formData);
      setDialogOpen(false);
      setNotification({
        open: true,
        message: 'Project saved successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error saving project:', err);
      setNotification({
        open: true,
        message: 'Failed to save project. Please try again.',
        severity: 'error'
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (isLoading) {
    return (

      <SectionWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress color="primary" />
            <Typography variant="h6" sx={{ mt: 2 }}>Loading projects...</Typography>
          </Box>
        </Box>
      </SectionWrapper>

    );
  }

  if (queryError) {
    return (

      <SectionWrapper>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Failed to load projects. Please try again later.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Paper>
      </SectionWrapper>

    );
  }

  if (!projects || projects.length === 0) {
    return (
      <>
        <Head>
          <title>No Projects - Portfolio</title>
          <meta name="description" content="No projects available in the portfolio" />
        </Head>
        <Container maxWidth="lg" sx={{ py: 4, mt: 15 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No Projects Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start by adding your first project
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={() => setDialogOpen(true)}
            >
              Add Project
            </Button>
          </Paper>
        </Container>
      </>
    );
  }

  return (

    <SectionWrapper maxWidth="lg">
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: '12px', 
          overflow: 'hidden',
          mb: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
          <Box 
            sx={{ 
              height: '6px', 
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
            }} 
          />
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ 
                color: theme.palette.primary.main,
                textAlign: "center",
                position: 'relative',
                mb: 5,
                fontSize: { xs: '1.8rem', md: '2rem' },
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
              My Projects
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                {projects.length > 0 ? (
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <ContentImageCarousel 
                      project={currentProject} 
                      onOpenImageViewer={openImageViewer}
                    />
                    <ContentDetails project={currentProject} />
                  </Card>
                ) : (
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '12px',
                      p: 4,
                      bgcolor: 'rgba(33, 150, 243, 0.05)'
                    }}
                  >
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                      No projects available yet
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={() => setDialogOpen(true)}
                    >
                      Add Your First Project
                    </Button>
                  </Card>
                )}
              </Grid>

              <Grid item xs={12} md={5}>
                <ContentList 
                  projects={projects}
                  selectedProjectIndex={selectedProjectIndex}
                  onProjectSelect={handleProjectSelect}
                  onAddProject={() => setDialogOpen(true)}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            display: { xs: 'block', md: 'none' }
          }}
        >
          <Fab color="primary" aria-label="add" onClick={() => setDialogOpen(true)}>
            <AddIcon />
          </Fab>
        </Box>


      <ContentEditDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveProject}
        isLoading={saveLoading}
      />
      
      <ContentImageViewer 
        open={imageViewerOpen}
        onClose={closeImageViewer}
        images={Array.isArray(projectImages) ? projectImages : []}
        initialIndex={viewerImageIndex} 
        projectTitle={''} 
      />
      
      <ContentNotification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </SectionWrapper>

  );
}
