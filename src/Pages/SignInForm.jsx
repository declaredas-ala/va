import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync } from '../Slices/userApiSlice';
import { setCredentials } from '../Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import userApiSlice from '../Slices/userApiSlice';

const SignInForm = () => {
  const userinfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if userinfo exists and redirect if it does
    if (userinfo) {
      navigate('/');
    }
  }, [navigate, userinfo]); // Include navigate and userinfo in dependency array

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, password };
      // Dispatch signInAsync action to authenticate user
      const signInAction = await dispatch(signInAsync(userData));
      
      // Check if signInAsync is fulfilled
      if (signInAction.meta.requestStatus === 'fulfilled') {
        // Dispatch setCredentials if signInAsync is fulfilled
        dispatch(setCredentials(userData));
        console.log('Login successful');
        // Redirect or do any other action after successful login
        navigate('/');
      } else {
        console.error('Error signing in:', signInAction.error.message);
        // Handle other actions if needed for failed sign-in
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      // Handle other actions if needed for failed sign-in
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
