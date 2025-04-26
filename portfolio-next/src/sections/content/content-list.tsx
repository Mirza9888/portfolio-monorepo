
import {
  Box,
  Typography,
  Card,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  projects: any[];
  selectedProjectIndex: number;
  onProjectSelect: (index: number) => void;
  onAddProject: () => void;
}

export default function ContentList({ 
  projects, 
  selectedProjectIndex, 
  onProjectSelect, 
  onAddProject 
}: Props) {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Projects List
        </Typography>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<AddIcon />}
          onClick={onAddProject}
        >
          Add Project
        </Button>
      </Box>
      
      <Box sx={{ height: '515px', overflow: 'auto', p: 2 }}>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <Paper
              key={project.id}
              elevation={selectedProjectIndex === index ? 6 : 1}
              sx={{
                p: 2,
                mb: 2,
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.2s ease-in-out',
                bgcolor: selectedProjectIndex === index 
                  ? 'rgba(33, 150, 243, 0.08)'
                  : 'white',
                border: selectedProjectIndex === index 
                  ? `1px solid ${theme.palette.primary.light}` 
                  : '1px solid rgba(0, 0, 0, 0.06)',
                '&:hover': {
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
              onClick={() => onProjectSelect(index)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    bgcolor: selectedProjectIndex === index 
                      ? theme.palette.primary.main 
                      : 'rgba(33, 150, 243, 0.2)',
                    color: selectedProjectIndex === index 
                      ? 'white' 
                      : theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  fontWeight={selectedProjectIndex === index ? 'bold' : 'medium'}
                >
                  {project.title}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 1,
                  pl: 5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {project.description}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pl: 5 }}>
                <Typography variant="caption" color="primary" fontWeight="500">
                  {project.images && Array.isArray(project.images) ? project.images.length : 0} 
                  {project.images && Array.isArray(project.images) && project.images.length === 1 ? ' image' : ' images'}
                </Typography>
                
                <Button
                  size="small"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProjectSelect(index);
                  }}
                  sx={{
                    visibility: selectedProjectIndex === index ? 'hidden' : 'visible',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.8rem'
                  }}
                >
                  View Details
                </Button>
              </Box>
            </Paper>
          ))
        ) : (
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            color: 'text.secondary',
            p: 4
          }}>
            <Typography textAlign="center" sx={{ mb: 2 }}>
              No projects available. Add your first project to get started.
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
}