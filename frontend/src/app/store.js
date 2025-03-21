import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice.js';
import authReducer from '../features/auth/authSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
