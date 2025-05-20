import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
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
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title} component="div">
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} component="div">
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
        </Grid>

        <Grid item xs={12} md={6} component="div">
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action) => (
                  <Grid item xs={6} key={action.title} component="div">
                    <Card
                      onClick={action.action}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.common.white,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {action.icon}
                          <Typography variant="body1" align="center">
                            {action.title}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 