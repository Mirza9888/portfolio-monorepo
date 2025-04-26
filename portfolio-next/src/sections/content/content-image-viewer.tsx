

import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  useTheme,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

interface ContentImageViewerProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
  projectTitle: string;
}

export default function ContentImageViewer({ 
  open, 
  onClose, 
  images, 
  initialIndex, 
  projectTitle 
}: ContentImageViewerProps) {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  
  // Reset index when component opens with new initialIndex
  useEffect(() => {
    setCurrentImageIndex(initialIndex);
  }, [initialIndex, open]);

  const nextImage = () => {
    if (Array.isArray(images) && images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (Array.isArray(images) && images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  // Get current image
  const currentImage = Array.isArray(images) && images.length > 0 
    ? images[currentImageIndex] 
    : "/api/placeholder/800/500";

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <DialogContent 
        sx={{ 
          p: 0, 
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(250, 250, 250, 0.98)'
        }}
      >
        {/* Close button */}
        <IconButton 
          onClick={onClose}
          sx={{ 
            position: 'absolute',
            top: 16,
            right: 16,
            color: theme.palette.primary.main,
            bgcolor: 'rgba(227, 242, 253, 0.7)',
            '&:hover': {
              bgcolor: 'rgba(227, 242, 253, 0.9)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Box 
          component="img"
          src={currentImage}
          alt={`${projectTitle || "Project"} image`}
          sx={{ 
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
        
        {Array.isArray(images) && images.length > 1 && (
          <>
            {/* Navigation arrows with improved styling */}
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(227, 242, 253, 0.4)',
                }
              }}
              onClick={prevImage}
            >
              <IconButton 
                sx={{
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(33, 150, 243, 0.2)',
                  },
                  color: theme.palette.primary.main
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
            
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(227, 242, 253, 0.4)',
                }
              }}
              onClick={nextImage}
            >
              <IconButton 
                sx={{
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(33, 150, 243, 0.2)',
                  },
                  color: theme.palette.primary.main
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            
            {/* Modern image indicator/pagination */}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 24, 
                left: '50%', 
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1.5,
                p: 1.5,
                borderRadius: 4,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              {images.map((_, index) => (
                <Box 
                  key={index}
                  sx={{
                    width: index === currentImageIndex ? 24 : 12,
                    height: 12,
                    borderRadius: 6,
                    bgcolor: index === currentImageIndex ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: index === currentImageIndex ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.3)',
                    }
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Box>
            
            {/* Clean minimal image counter */}
            <Typography 
              variant="body2"
              sx={{ 
                position: 'absolute', 
                top: 16, 
                left: 16,
                color: theme.palette.primary.main,
                backgroundColor: 'rgba(227, 242, 253, 0.8)',
                px: 1.5,
                py: 0.75,
                borderRadius: 4,
                fontWeight: 500,
                letterSpacing: 0.5,
                fontSize: '0.875rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              {currentImageIndex + 1} / {images.length}
            </Typography>
            
            {/* Project title at the top */}
            <Typography 
              variant="subtitle1"
              sx={{ 
                position: 'absolute',
                top: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                color: theme.palette.primary.dark,
                textAlign: 'center',
                fontWeight: 500,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                px: 3,
                py: 1,
                borderRadius: 2,
                maxWidth: '80%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              {projectTitle || "Project"}
            </Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}