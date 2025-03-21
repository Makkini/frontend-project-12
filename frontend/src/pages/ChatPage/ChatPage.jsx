import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, fetchMessages, sendMessage, fetchChannels } from '../../features/chat/chatSlice';
import ChannelsList from '../../components/ChatLayout/ChannelsList.jsx';
import MessagesBox from '../../components/ChatLayout/MessagesBox.jsx';
import socket from '../../services/socket.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, channels, currentChannelId, loading, error } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    socket.connect();

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [dispatch]);

  const handleSendMessage = (messageBody) => {
    const message = {
      body: messageBody,
      channelId: currentChannelId,
      username: 'admin',
    };
    dispatch(sendMessage(message));
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="container my-4 overflow-hidden rounded shadow" style={{ height: '85vh' }}>
      <div className="row bg-white flex-md-row" style={{ height: '100%' }}>
        <ChannelsList channels={channels} currentChannelId={currentChannelId} />
        <MessagesBox
          messages={messages.filter((msg) => msg.channelId === currentChannelId)}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;