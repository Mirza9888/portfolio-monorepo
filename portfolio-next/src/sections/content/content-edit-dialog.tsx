import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Chip, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

interface ContentEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

const ContentEditDialog = ({ open, onClose, onSave, isLoading }: ContentEditDialogProps) => {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [technologiesArray, setTechnologiesArray] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Reset form state when dialog is opened or closed
  useEffect(() => {
    if (!open) {
      // Reset all state when dialog closes
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setNewProject({
      title: '',
      description: '',
      technologies: '',
    });
    setFiles([]);
    // Clean up object URLs to prevent memory leaks
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setTechnologiesArray([]);
    setTechInput('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
      const newUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prevUrls => [...prevUrls, ...newUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    const updatedUrls = [...previewUrls];
    updatedUrls.splice(index, 1);
    setPreviewUrls(updatedUrls);
  };

  // Add the missing handleRemoveTechnology function
  const handleRemoveTechnology = (index: number) => {
    const updatedTech = [...technologiesArray];
    updatedTech.splice(index, 1);
    setTechnologiesArray(updatedTech);
  };

  const handleAddTechnology = () => {
    if (techInput.trim()) {
      setTechnologiesArray([...technologiesArray, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('description', newProject.description);
    formData.append('technologies', JSON.stringify(technologiesArray));

    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      await onSave(formData);
      // Reset form after successful save
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      // Don't reset form on error so user can try again
    }
  };

  const handleClose = () => {
    onClose();
  };

  const openImageDialog = (index: number) => {
    setSelectedImageIndex(index);
    setImageDialogOpen(true);
  };

  const closeImageDialog = () => {
    setImageDialogOpen(false);
    setSelectedImageIndex(null);
  };

  const handleImageNavigation = (direction: 'next' | 'prev') => {
    if (selectedImageIndex === null) return;
    const nextIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % previewUrls.length
      : (selectedImageIndex - 1 + previewUrls.length) % previewUrls.length;
    setSelectedImageIndex(nextIndex);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'primary.dark', color: 'primary.light', py: 2 }}>
          Add New Project
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            label="Title"
            fullWidth
            name="title"
            value={newProject.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            value={newProject.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          
          <Box sx={{ mt: 2, mb: 1 }}>
            <TextField
              label="Technologies"
              fullWidth
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              margin="normal"
              helperText="Type a technology and press Enter to add it"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTechnology();
                }
              }}
            />
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleAddTechnology} 
              sx={{ mt: 1 }}
            >
              Add Technology
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {technologiesArray.map((tech, index) => (
              <Chip 
                key={index} 
                label={tech} 
                onDelete={() => handleRemoveTechnology(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Upload Images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </Button>
          </Box>

          {previewUrls.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ fontWeight: 'bold', mb: 1 }}>Selected Images ({previewUrls.length})</Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {previewUrls.map((url, index) => (
                  <Box 
                    key={index} 
                    sx={{ position: 'relative' }}
                  >
                    <Box 
                      component="img" 
                      src={url} 
                      sx={{ 
                        width: 100, 
                        height: 100, 
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer'
                      }}
                      onClick={() => openImageDialog(index)}
                    />
                    <Button 
                      size="small" 
                      color="error" 
                      variant="contained"
                      onClick={() => handleRemoveImage(index)}
                      sx={{ 
                        position: 'absolute', 
                        top: -10, 
                        right: -10, 
                        minWidth: 'auto',
                        width: 24,
                        height: 24,
                        p: 0,
                        borderRadius: '50%'
                      }}
                    >
                      ×
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="primary" disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            disabled={!newProject.title || !newProject.description || isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? 'Saving...' : 'Save Project'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={imageDialogOpen} onClose={closeImageDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'primary.light', color: 'white', py: 2 }}>
          View Image
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          {selectedImageIndex !== null && (
            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Box 
                component="img"
                src={previewUrls[selectedImageIndex]}
                sx={{ width: '100%', maxHeight: 500, objectFit: 'contain', borderRadius: 1 }}
              />
              <Button
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  zIndex: 1
                }}
                onClick={() => handleImageNavigation('prev')}
              >
                Prev
              </Button>
              <Button
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  zIndex: 1
                }}
                onClick={() => handleImageNavigation('next')}
              >
                Next
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentEditDialog;