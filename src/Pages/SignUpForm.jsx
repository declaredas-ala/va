import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpAsync } from '../Slices/userApiSlice';
import { setCredentials } from '../Slices/authSlice'; // Assuming setCredentials is defined here

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userinfo = useSelector(state => state.userinfo); // Assuming userinfo is stored in Redux state

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, password, email, role };
      const signUpAction = await dispatch(signUpAsync(userData));
      
      if (signUpAction.meta.requestStatus === 'fulfilled') {
        navigate('/login');
        console.log('Sign up successful');
      
      } else {
        console.error('Error signing up:', signUpAction.error.message);
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  
  useEffect(() => {
    if (userinfo) {
      navigate('/login');
    }
  }, [navigate, userinfo]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
