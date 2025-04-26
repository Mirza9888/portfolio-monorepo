import React from 'react';
import { 
  Snackbar, 
  Alert, 
  AlertColor, 
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ContentNotificationProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

const ContentNotification: React.FC<ContentNotificationProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 6000
}) => {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={severity}
        sx={{
          width: '100%',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          // Customize colors based on severity
          backgroundColor: 
            severity === 'success' ? theme.palette.success.main :
            severity === 'error' ? theme.palette.error.main :
            severity === 'warning' ? theme.palette.warning.main :
            theme.palette.info.main,
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ContentNotification;