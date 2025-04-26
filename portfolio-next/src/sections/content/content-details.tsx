

import {
  Typography,
  CardContent,
} from '@mui/material';

interface Props {
  project: any;
}

export default function ContentDetails({ project }: Props) {
  
  const formatTechnologies = (technologies:any) => {
    if (!technologies) return '';
    
  
    if (Array.isArray(technologies)) {
      return technologies.join(', ');
    }
    
    return technologies;
  };

  return (
    <CardContent sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {project?.title || "Select a project"}
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        {project?.description || "No project selected"}
      </Typography>
      
      {project?.technologies && (
        <Typography variant="body2" color="primary" fontWeight="500">
          Technologies: {formatTechnologies(project.technologies)}
        </Typography>
      )}
    </CardContent>
  );
}