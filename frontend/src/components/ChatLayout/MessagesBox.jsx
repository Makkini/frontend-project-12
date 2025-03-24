import React from 'react';
import MessageInput from "./MessagesInput.jsx";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const MessagesBox = ({ messages, onSendMessage }) => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.chat);

  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const channelName = currentChannel ? currentChannel.name : '';

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {channelName}</b></p>
          <span className="text-muted">
              {t('channels.messagesCount', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((msg) => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username}</b>: {msg.body}
            </div>
          ))}
        </div>
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default MessagesBox;