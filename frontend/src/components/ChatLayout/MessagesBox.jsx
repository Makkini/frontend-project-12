import React from 'react';
import MessageInput from "./MessagesInput.jsx";

const MessagesBox = ({ messages, onSendMessage }) => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># general</b></p>
          <span className="text-muted">{messages.length} сообщений</span>
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