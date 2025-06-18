import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  Snackbar,
  useTheme,
  Autocomplete,
} from '@mui/material';
import { borrowingService, bookService, memberService } from '../../services/api';

interface Book {
  _id: string;
  title: string;
  author: string;
  status: string;
}

interface Member {
  _id: string;
  name: string;
  email: string;
  booksIssued: number;
}

const IssueBook: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, membersRes] = await Promise.all([
          bookService.getAll(),
          memberService.getAll(),
        ]);
        setBooks(booksRes.data.filter((book: Book) => book.status === 'Available'));
        setMembers(membersRes.data.filter((member: Member) => member.booksIssued < 3));
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await borrowingService.borrowBook(formData);
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} component="div">
                <Autocomplete
                  options={books}
                  getOptionLabel={(option) => `${option.title} by ${option.author}`}
                  onChange={(_, value) => {
                    setFormData((prev) => ({
                      ...prev,
                      bookId: value?._id || '',
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Select Book"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} component="div">
                <Autocomplete
                  options={members}
                  getOptionLabel={(option) => `${option.name} (${option.email})`}
                  onChange={(_, value) => {
                    setFormData((prev) => ({
                      ...prev,
                      memberId: value?._id || '',
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Select Member"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} component="div">
                <TextField
                  fullWidth
                  type="date"
                  label="Due Date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  inputProps={{
                    min: new Date().toISOString().split('T')[0],
                  }}
                />
              </Grid>
              <Grid item xs={12} component="div">
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
              </Grid>
            </Grid>
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