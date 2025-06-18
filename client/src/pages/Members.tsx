import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { memberService } from '../services/api';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: 'Regular' | 'Premium' | 'Student';
  booksIssued: number;
  joinDate: string;
}

const Members: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await memberService.getAll();
      setMembers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch members. Please try again later.');
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleDelete = async (id: string) => {
    try {
      await memberService.delete(id);
      setMembers(members.filter((member) => member.id !== id));
      setSnackbar({
        open: true,
        message: 'Member deleted successfully',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to delete member',
        severity: 'error',
      });
      console.error('Error deleting member:', err);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery) ||
      member.email.toLowerCase().includes(searchQuery) ||
      member.phone.includes(searchQuery)
  );

  const getMembershipColor = (type: Member['membershipType']) => {
    switch (type) {
      case 'Premium':
        return theme.palette.primary.main;
      case 'Regular':
        return theme.palette.success.main;
      case 'Student':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
        <Typography variant="h4">Members</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Add New Member
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search members by name, email, or phone"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Membership Type</TableCell>
              <TableCell>Books Issued</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="body1">{member.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.email}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={member.membershipType}
                    sx={{
                      backgroundColor: getMembershipColor(member.membershipType),
                      color: theme.palette.common.white,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        member.booksIssued > 2
                          ? theme.palette.error.main
                          : theme.palette.success.main,
                    }}
                  >
                    {member.booksIssued}
                  </Typography>
                </TableCell>
                <TableCell>{member.joinDate}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: theme.palette.error.main }}
                    onClick={() => handleDelete(member.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Members; 