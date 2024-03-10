import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../Slices/authSlice';
import { UpdateProfile } from '../Slices/userApiSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [formData, setFormData] = useState({
    username: userInfo.username,
    email: userInfo.email,
    password: '',
  });
  const [success, setSuccess] = useState(false); // State to track success

  // useEffect to update formData when userInfo changes
  useEffect(() => {
    setFormData({
      username: userInfo.username,
      email: userInfo.email,
      password: '', // Reset password field when userInfo changes
    });
  }, [userInfo]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateProfile(formData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {

        dispatch(setCredentials({username : formData.username, email : formData.email})); // Update credentials in Redux state
        setSuccess(true); // Set success state to true
      


        setSuccess(true); // Set success state to true
      }
    });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {success && <p>User updated successfully!</p>} {/* Conditional rendering of success message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
