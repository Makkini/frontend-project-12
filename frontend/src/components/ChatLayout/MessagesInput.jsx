import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {filterProfanity} from "../../services/profanityFilter.js";

const MessageInput = ({ onSendMessage }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const filteredMessage = filterProfanity(trimmedMessage);
    onSendMessage(filteredMessage);
    setMessage('');
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={handleSubmit} className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            ref={inputRef}
            name="body"
            aria-label={t('messages.labelMessageInput')}
            placeholder={t('messages.newMessage')}
            className="border-0 p-0 ps-2 form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;