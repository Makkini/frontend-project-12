import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addMessage, fetchMessages, sendMessage, fetchChannels } from '../../features/chat/chatSlice';
import ChannelsList from '../../components/ChatLayout/ChannelsList.jsx';
import MessagesBox from '../../components/ChatLayout/MessagesBox.jsx';
import socket from '../../services/socket.js';
import {useTranslation} from "react-i18next";

const ChatPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { messages, channels, currentChannelId, loading, error } = useSelector((state) => state.chat);
  const { username } = useSelector((state) => state.auth)
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
      username: username,
    };
    dispatch(sendMessage(message));
  };

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('error', {error})}</div>;
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