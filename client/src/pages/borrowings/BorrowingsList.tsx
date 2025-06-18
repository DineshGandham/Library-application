import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { borrowingService } from '../../services/api';

interface Borrowing {
  _id: string;
  book: {
    title: string;
    author: string;
  };
  member: {
    name: string;
    email: string;
  };
  borrowedDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Borrowed' | 'Returned' | 'Overdue';
  fine?: number;
}

const statusColors = {
  Borrowed: 'primary',
  Returned: 'success',
  Overdue: 'error',
} as const;

const BorrowingsList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = async () => {
    try {
      const response = await borrowingService.getAll();
      setBorrowings(response.data);
    } catch (err) {
      console.error('Failed to fetch borrowings:', err);
    }
  };

  const handleReturn = async (id: string) => {
    if (window.confirm('Are you sure you want to return this book?')) {
      try {
        await borrowingService.return(id);
        fetchBorrowings();
      } catch (err) {
        console.error('Failed to return book:', err);
      }
    }
  };

  const filteredBorrowings = borrowings.filter((borrowing) => {
    const matchesSearch =
      borrowing.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrowing.member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || borrowing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Book Borrowings</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/borrowings/issue')}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Issue New Book
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              select
              label="Status"
              variant="outlined"
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Borrowed">Borrowed</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
              <MenuItem value="Overdue">Overdue</MenuItem>
            </TextField>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book</TableCell>
                  <TableCell>Member</TableCell>
                  <TableCell>Borrowed Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Return Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Fine</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBorrowings.map((borrowing) => (
                  <TableRow key={borrowing._id}>
                    <TableCell>
                      <Typography variant="subtitle2">{borrowing.book.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {borrowing.book.author}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{borrowing.member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {borrowing.member.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(borrowing.borrowedDate)}</TableCell>
                    <TableCell>{formatDate(borrowing.dueDate)}</TableCell>
                    <TableCell>
                      {borrowing.returnDate ? formatDate(borrowing.returnDate) : '-'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={borrowing.status}
                        color={statusColors[borrowing.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {borrowing.fine ? `$${borrowing.fine.toFixed(2)}` : '-'}
                    </TableCell>
                    <TableCell>
                      {borrowing.status === 'Borrowed' && (
                        <IconButton
                          color="primary"
                          onClick={() => handleReturn(borrowing._id)}
                          title="Return Book"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      )}
                      {borrowing.status === 'Overdue' && (
                        <IconButton
                          color="error"
                          onClick={() => handleReturn(borrowing._id)}
                          title="Return Book (Overdue)"
                        >
                          <WarningIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BorrowingsList; 