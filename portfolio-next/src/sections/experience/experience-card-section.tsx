'use client';

import { Box, Typography, Avatar, Tooltip, useTheme, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState, useEffect } from 'react';

type Experience = {
  company: string;
  location: string;
  position: string;
  project: string;
  period: string;
  avatar: string;
  description: string;
  accomplishments: string[];
};

type Props = {
  experiences: Experience[];
};

export default function ExperienceCardSection({ experiences }: Props) {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setMounted(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    }
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          Error loading experience section. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No experience data available.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {experiences.map((experience, index) => (
        <Box
          key={index}
          sx={{
            mb: 6,
            position: 'relative',
            '&:after': index < experiences.length - 1 ? {
              content: '""',
              position: 'absolute',
              bottom: '-30px',
              left: '30px',
              width: '1px',
              height: '30px',
              background: 'rgba(33, 150, 243, 0.2)',
            } : {}
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, gap: 2 }}>
            <Tooltip title={experience.company}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                  width: 60,
                  height: 60,
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 10px rgba(33, 150, 243, 0.2)'
                }}
              >
                {experience.avatar}
              </Avatar>
            </Tooltip>
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ color: theme.palette.text.primary, mb: 0.5, fontSize: '1.4rem' }}>
                {experience.company}, {experience.location}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 0, fontSize: '1.1rem' }}>
                {experience.position} • {experience.project} • {experience.period}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" paragraph sx={{ mt: 3, fontSize: '1.1rem', lineHeight: 1.7, color: theme.palette.text.primary }}>
            {experience.description}
          </Typography>

          <Typography variant="h6" fontWeight="600" sx={{ mt: 4, mb: 3, color: theme.palette.primary.main, display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.3rem' }}>
            Key Accomplishments:
          </Typography>

          <Box sx={{ pl: 0 }}>
            {experience.accomplishments.map((accomplishment, index) => (
              <Box key={index} sx={{ display: 'flex', mb: 2.5, gap: 2, alignItems: 'flex-start' }}>
                <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main, mt: 0.5, flexShrink: 0, fontSize: '1.4rem' }} />
                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.6, color: theme.palette.text.primary }}>
                  {accomplishment}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
}
