import React, { useState } from 'react';
import './ChatSidebar.css';

const ChatSidebar = ({ currentRoom, onRoomChange, onlineUsers }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);

  const defaultRooms = ['general', 'random', 'tech', 'gaming', 'music'];

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      onRoomChange(newRoomName.trim().toLowerCase());
      setNewRoomName('');
      setShowNewRoomInput(false);
    }
  };

  return (
    <div className="chat-sidebar">
      <div className="sidebar-header">
        <h3>Chat Rooms</h3>
        <button 
          className="add-room-btn"
          onClick={() => setShowNewRoomInput(!showNewRoomInput)}
          title="Create new room"
        >
          +
        </button>
      </div>

      {showNewRoomInput && (
        <form onSubmit={handleCreateRoom} className="new-room-form">
          <input
            type="text"
            placeholder="Room name..."
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="new-room-input"
            autoFocus
          />
          <div className="new-room-actions">
            <button type="submit" className="create-btn">Create</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setShowNewRoomInput(false);
                setNewRoomName('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="rooms-list">
        {defaultRooms.map((room) => (
          <div
            key={room}
            className={`room-item ${currentRoom === room ? 'active' : ''}`}
            onClick={() => onRoomChange(room)}
          >
            <span className="room-hash">#</span>
            <span className="room-name">{room}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h4 className="section-title">Online Users ({onlineUsers.length})</h4>
        <div className="users-list">
          {onlineUsers.map((username, index) => (
            <div key={index} className="user-item">
              <div className="user-status online"></div>
              <span className="user-name">{username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
