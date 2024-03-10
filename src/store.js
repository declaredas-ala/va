import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import userApiReducer from './Slices/userApiSlice';


const store = configureStore({
  reducer: {
    userApi: userApiReducer,
    auth: authReducer,
  },
 


  devTools: true // Enable Redux DevTools only in non-production environment
});

export default store;
