import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const { mode, toggleTheme } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Books', icon: <BookIcon />, path: '/books' },
    { text: 'Members', icon: <PersonIcon />, path: '/members' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: muiTheme.palette.primary.main }}>
          Library App
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setOpen(false);
            }}
            sx={{
              '&:hover': {
                backgroundColor: muiTheme.palette.primary.light,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: muiTheme.palette.common.white,
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: muiTheme.palette.primary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <ListItemButton
          onClick={() => {
            navigate('/login');
          }}
          sx={{
            marginTop: 'auto',
            '&:hover': {
              backgroundColor: muiTheme.palette.secondary.main,
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: muiTheme.palette.common.white,
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: muiTheme.palette.secondary.main }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: muiTheme.palette.background.paper,
          boxShadow: 'none',
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: muiTheme.palette.primary.main, flexGrow: 1 }}>
            Welcome to Library Management
          </Typography>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleTheme} color="primary">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? open : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: muiTheme.palette.background.paper,
              borderRight: `1px solid ${muiTheme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: muiTheme.palette.background.default,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 