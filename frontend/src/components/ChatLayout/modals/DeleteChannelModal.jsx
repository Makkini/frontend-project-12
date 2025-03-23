import React from 'react';
import { useDispatch } from 'react-redux';
import { removeChannel } from '../../../features/chat/chatSlice.js';

const DeleteChannelModal = ({ channelId, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeChannel(channelId));
    onClose();
  };

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Удалить канал</div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={onClose}
              >
                Отменить
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteChannelModal;