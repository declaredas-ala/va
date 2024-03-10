// Remove unused imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Link } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Header from './components/Header.jsx';
import SignInForm from './Pages/SignInForm.jsx';
import SignUpForm from './Pages/SignUpForm.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import Profile from './Pages/Profile.jsx';

// ... rest of the code


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<SignInForm />} />
      <Route path="/register" element={<SignUpForm />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
  </Provider>
);
