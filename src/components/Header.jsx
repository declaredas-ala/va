import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAsync } from '../Slices/userApiSlice';
import { logout } from '../Slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logoutAsync(); // Wait for async logout
    dispatch(logout());
    navigate('/'); // Redirect to home after logout
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
           Vivia Hr 
          </Link>
          {userInfo && (
            <Typography variant="body1" component="span" sx={{ ml: 2 }}>
            {`Hi  ${userInfo.username}`} {/* Concatenate strings */}
          </Typography>
          
          )}
        </Typography>
        <div>
          {userInfo ? (
            <>
              <IconButton
                color="inherit"
                aria-label="user profile"
                onClick={handleMenu}
              >
                <Avatar src={userInfo.avatarUrl} /> {/* Pass user's avatar URL */}
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                {userInfo.username} 
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Sign In
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
