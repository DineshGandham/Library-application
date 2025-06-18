import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Container,
  Paper,
} from '@mui/material';
import { bookService } from '../../services/api';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    description: '',
    quantity: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      if (coverImage) {
        formData.append('coverImage', coverImage);
      }

      await bookService.create(formData);
      navigate('/books');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Book
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '1 1 45%' }}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                autoFocus
              />
            </Box>
            <Box sx={{ flex: '1 1 45%' }}>
              <TextField
                required
                fullWidth
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ flex: '1 1 45%' }}>
              <TextField
                required
                fullWidth
                label="ISBN"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ flex: '1 1 45%' }}>
              <TextField
                required
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ flex: '1 1 45%' }}>
              <TextField
                fullWidth
                label="Publisher"
                name="publisher"
              />
            </Box>
            <Box sx={{ flex: '1 1 45%' }}>
              <TextField
                fullWidth
                label="Published Year"
                name="publishedYear"
                type="number"
              />
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <Box sx={{ mb: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="cover-image"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="cover-image">
                  <Button variant="outlined" component="span">
                    Upload Cover Image
                  </Button>
                </label>
              </Box>
              {previewUrl && (
                <Box sx={{ mt: 2, maxWidth: 200 }}>
                  <img
                    src={previewUrl}
                    alt="Cover preview"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
              )}
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mr: 2 }}
              >
                {loading ? 'Adding...' : 'Add Book'}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/books')}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
        {error && (
          <Snackbar open={!!error} autoHideDuration={6000}>
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        )}
      </Paper>
    </Container>
  );
};

export default AddBook; 