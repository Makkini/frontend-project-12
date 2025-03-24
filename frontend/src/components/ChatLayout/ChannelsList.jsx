import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannel } from '../../features/chat/chatSlice';
import AddChannelModal from './modals/AddChannelModal.jsx';
import RenameChannelModal from './modals/RenameChannelModal.jsx';
import DeleteChannelModal from './modals/DeleteChannelModal.jsx';
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

const ChannelsList = ({ channels, currentChannelId }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChannelClick = (id) => {
    dispatch(setCurrentChannel(id));
    setOpenDropdownId(null);
  };

  const handleOpenRenameModal = (channel) => {
    setSelectedChannel(channel);
    setIsRenameModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleOpenDeleteModal = (channel) => {
    setSelectedChannel(channel);
    setIsDeleteModalOpen(true);
    setOpenDropdownId(null);
  };

  const toggleDropdown = (channelId) => {
    setOpenDropdownId(openDropdownId === channelId ? null : channelId);
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => setIsAddModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <div role="group" className="d-flex dropdown btn-group" ref={dropdownRef}>
              <button
                type="button"
                className={`w-100 rounded-0 text-start text-truncate btn ${
                  channel.id === currentChannelId ? 'btn-secondary' : ''
                }`}
                onClick={() => handleChannelClick(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
              {channel.removable && (
                <>
                  <button
                    type="button"
                    className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${
                      channel.id === currentChannelId ? 'btn-secondary' : ''
                    }`}
                    onClick={() => toggleDropdown(channel.id)}
                  >
                    <span className="visually-hidden">{t('channels.manage')}</span>
                  </button>
                  {openDropdownId === channel.id && (
                    <div className="dropdown-menu show">
                      <button
                        className="dropdown-item"
                        onClick={() => handleOpenRenameModal(channel)}
                      >
                        {t('channels.renameAction')}
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => handleOpenDeleteModal(channel)}
                      >
                        {t('channels.deleteAction')}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {isAddModalOpen && (
        <AddChannelModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => toast.success(t('notifications.channelCreated'))}
          onError={(error) => toast.error(error || t('notifications.networkError'))}
        />
      )}
      {isRenameModalOpen && (
        <RenameChannelModal
          channelId={selectedChannel?.id}
          currentName={selectedChannel?.name}
          onClose={() => setIsRenameModalOpen(false)}
          onSuccess={() => toast.success(t('notifications.channelRenamed'))}
          onError={(error) => toast.error(error || t('notifications.networkError'))}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteChannelModal
          channelId={selectedChannel?.id}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={() => toast.success(t('notifications.channelRemoved'))}
          onError={(error) => toast.error(error || t('notifications.networkError'))}
        />
      )}
    </div>
  );
};

export default ChannelsList;