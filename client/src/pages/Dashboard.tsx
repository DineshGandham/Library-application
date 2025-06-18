import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  useTheme,
  Button,
} from '@mui/material';
import {
  Book as BookIcon,
  Person as PersonIcon,
  LocalLibrary as LibraryIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Books',
      value: '1,234',
      icon: <BookIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Active Members',
      value: '456',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Books Issued',
      value: '89',
      icon: <LibraryIcon sx={{ fontSize: 40 }} />,
      color: '#2ECC71',
    },
    {
      title: 'Overdue Books',
      value: '12',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#E74C3C',
    },
  ];

  const recentActivity = [
    {
      title: 'New Book Added',
      description: 'The Great Gatsby by F. Scott Fitzgerald',
      time: '2 hours ago',
    },
    {
      title: 'Book Returned',
      description: 'To Kill a Mockingbird by Harper Lee',
      time: '3 hours ago',
    },
    {
      title: 'New Member Registered',
      description: 'John Doe joined the library',
      time: '5 hours ago',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Book',
      icon: <AddIcon />,
      action: () => navigate('/books/add'),
    },
    {
      title: 'Register Member',
      icon: <PersonAddIcon />,
      action: () => navigate('/members/add'),
    },
    {
      title: 'Issue Book',
      icon: <BookmarkIcon />,
      action: () => navigate('/borrowings/issue'),
    },
    {
      title: 'Return Book',
      icon: <BookmarkBorderIcon />,
      action: () => navigate('/borrowings/return'),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {stats.map((stat) => (
          <Box
            key={stat.title}
            sx={{
              flex: '1 1 200px',
              minWidth: { xs: '100%', sm: '45%', md: '22%' }
            }}
          >
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h5" component="div">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
        <Box sx={{ flex: '1 1 45%', minWidth: { xs: '100%', md: '45%' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.title}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {activity.title.includes('Book') ? (
                            <BookIcon />
                          ) : (
                            <PersonIcon />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {activity.description}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textSecondary"
                              sx={{ display: 'block' }}
                            >
                              {activity.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 45%', minWidth: { xs: '100%', md: '45%' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {quickActions.map((action) => (
                  <Box
                    key={action.title}
                    sx={{ flex: '1 1 200px', minWidth: { xs: '45%', sm: '200px' } }}
                  >
                    <Button
                      variant="contained"
                      startIcon={action.icon}
                      onClick={action.action}
                      fullWidth
                    >
                      {action.title}
                    </Button>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 