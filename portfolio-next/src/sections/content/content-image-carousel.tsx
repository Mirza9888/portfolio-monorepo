

import { useState } from 'react';
import {
  Box,
  CardMedia,
  IconButton,
  useTheme,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

interface ContentImageCarouselProps {
  project: any;
  onOpenImageViewer: (index: number) => void;
}

export default function ContentImageCarousel({ project, onOpenImageViewer }: ContentImageCarouselProps) {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  



  const nextImage = () => {
    if (project && Array.isArray(project.images)) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (project && Array.isArray(project.images)) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
      );
    }
  };

  const currentImage = 
    project?.images && 
    Array.isArray(project.images) && 
    project.images.length > 0 
      ? project.images[currentImageIndex] 
      : project?.image || "No image";

  return (
    <Box sx={{ position: 'relative', bgcolor: 'black' }}>
      <CardMedia
        component="img"
        height="400"
        image={currentImage}
        alt={project?.title || "Project image"}
        sx={{ 
          objectFit: "contain",
          bgcolor: '#f5f5f5',
          cursor: 'pointer',
        }}
        onClick={() => onOpenImageViewer(currentImageIndex)}
      />
      
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          }
        }}
        onClick={() => onOpenImageViewer(currentImageIndex)}
      >
        <ZoomInIcon />
      </IconButton>
      
      {project?.images && 
      Array.isArray(project.images) && 
      project.images.length > 1 && (
        <>
          <IconButton 
            onClick={prevImage}
            sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          
          <IconButton 
            onClick={nextImage}
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 10, 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1
            }}
          >
            {project.images.map((image:any, index:any) => (
              <Box 
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: index === currentImageIndex ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}