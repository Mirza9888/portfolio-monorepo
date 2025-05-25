import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Chip, CircularProgress } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ContentEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  technologies: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one technology is required'),
});

const initialValues = {
  title: '',
  description: '',
  technologies: [] as string[],
};

const ContentEditDialog = ({ open, onClose, onSave, isLoading }: ContentEditDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Memoize the form validation schema
  const memoizedValidationSchema = useMemo(() => validationSchema, []);

  // Cleanup function for preview URLs
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

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

    URL.revokeObjectURL(previewUrls[index]);
    
    const updatedUrls = [...previewUrls];
    updatedUrls.splice(index, 1);
    setPreviewUrls(updatedUrls);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('technologies', JSON.stringify(values.technologies));

    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleClose = () => {
    setFiles([]);
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setTechInput('');
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
        <Formik
          initialValues={initialValues}
          validationSchema={memoizedValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <DialogContent sx={{ mt: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="title"
                  label="Title"
                  margin="normal"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />

                <Field
                  as={TextField}
                  fullWidth
                  name="description"
                  label="Description"
                  margin="normal"
                  multiline
                  rows={4}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
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
                        if (techInput.trim()) {
                          setFieldValue('technologies', [...values.technologies, techInput.trim()]);
                          setTechInput('');
                        }
                      }
                    }}
                  />
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => {
                      if (techInput.trim()) {
                        setFieldValue('technologies', [...values.technologies, techInput.trim()]);
                        setTechInput('');
                      }
                    }}
                    sx={{ mt: 1 }}
                  >
                    Add Technology
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {values.technologies.map((tech, index) => (
                    <Chip 
                      key={index} 
                      label={tech} 
                      onDelete={() => {
                        const newTechs = [...values.technologies];
                        newTechs.splice(index, 1);
                        setFieldValue('technologies', newTechs);
                      }}
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
                  type="submit"
                  variant="contained" 
                  color="primary"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isLoading ? 'Saving...' : 'Save Project'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
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