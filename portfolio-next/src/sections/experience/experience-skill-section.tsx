'use client';

import { Box, Typography, Stack, Chip, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

type SkillsData = {
  frontend: string[];
  backend: string[];
  database: string[];
  devops: string[];
  ecommerce: string[];
};

type Props = {
  skills: SkillsData;
};

export default function ExperienceSkillSection({ skills }: Props) {
  const theme = useTheme();

  const SkillCategory = ({ title, skills, icon }: { title: string, skills: string[], icon: React.ReactNode }) => (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 2,
          color: theme.palette.text.primary,
          fontWeight: 600
        }}
      >
        {icon}
        {title}
      </Typography>
      <Stack 
        direction="row" 
        flexWrap="wrap" 
        sx={{ gap: 1 }}
      >
        {skills.map((skill, index) => (
          <Chip 
            key={index} 
            label={skill} 
            sx={{ 
              borderColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
              bgcolor: 'rgba(33, 150, 243, 0.05)',
              fontWeight: 500,
              px: 1,
              py: 2.5,
              mb: 1,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
              }
            }} 
          />
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box>
      <SkillCategory 
        title="Frontend Technologies" 
        skills={skills.frontend} 
        icon={<CodeIcon sx={{ color: theme.palette.primary.main }} />} 
      />
      <SkillCategory 
        title="Backend Technologies" 
        skills={skills.backend} 
        icon={<CodeIcon sx={{ color: theme.palette.primary.main }} />} 
      />
      <SkillCategory 
        title="Database & Storage" 
        skills={skills.database} 
        icon={<StorageIcon sx={{ color: theme.palette.primary.main }} />} 
      />
      <SkillCategory 
        title="DevOps & Tools" 
        skills={skills.devops} 
        icon={<BuildIcon sx={{ color: theme.palette.primary.main }} />} 
      />
      <SkillCategory 
        title="E-commerce Solutions" 
        skills={skills.ecommerce} 
        icon={<ShoppingCartIcon sx={{ color: theme.palette.primary.main }} />} 
      />
    </Box>
  );
}