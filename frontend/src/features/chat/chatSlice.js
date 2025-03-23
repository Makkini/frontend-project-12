import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
  'chat/fetchChannels',
  async (_, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.post('/api/v1/messages', message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const addChannel = createAsyncThunk(
  'chat/addChannel',
  async (name, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.post('/api/v1/channels', { name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const removeChannel = createAsyncThunk(
  'chat/removeChannel',
  async (id, { getState }) => {
    const { token } = getState().auth;
    await axios.delete(`/api/v1/channels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  },
);

export const renameChannel = createAsyncThunk(
  'chat/renameChannel',
  async ({ id, name }, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.patch(`/api/v1/channels/${id}`, { name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: '1',
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload);
        state.currentChannelId = action.payload.id;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.channels = state.channels.filter((channel) => channel.id !== action.payload);
        if (state.currentChannelId === action.payload) {
          state.currentChannelId = '1';
        }
      })
      .addCase(renameChannel.fulfilled, (state, action) => {
        const channel = state.channels.find((ch) => ch.id === action.payload.id);
        if (channel) {
          channel.name = action.payload.name;
        }
      });
  },
});

export const { setCurrentChannel, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
