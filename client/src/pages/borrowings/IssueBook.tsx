import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import { bookService, memberService, borrowingService } from '../../services/api';
import { Book } from '../../types';

const IssueBook: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, membersResponse] = await Promise.all([
          bookService.getAll(),
          memberService.getAll(),
        ]);
        setBooks(booksResponse.data);
        setMembers(membersResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await borrowingService.create(formData);
      navigate('/borrowings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to issue book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Issue Book
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 45%', minWidth: { xs: '100%', md: '45%' } }}>
                <FormControl fullWidth>
                  <InputLabel>Book</InputLabel>
                  <Select
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleSelectChange}
                    required
                  >
                    {books.map((book) => (
                      <option key={book._id} value={book._id}>
                        {book.title} by {book.author}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: '1 1 45%', minWidth: { xs: '100%', md: '45%' } }}>
                <FormControl fullWidth>
                  <InputLabel>Member</InputLabel>
                  <Select
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleSelectChange}
                    required
                  >
                    {members.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: '1 1 45%', minWidth: { xs: '100%', md: '45%' } }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Due Date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Box>

              <Box sx={{ flex: '1 1 100%' }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/borrowings')}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    {loading ? 'Issuing...' : 'Issue Book'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default IssueBook; 