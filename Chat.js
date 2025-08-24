import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import ChatSidebar from '../components/ChatSidebar';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import './Chat.css';

const Chat = () => {
  const { user, logout } = useAuth();
  const [currentRoom, setCurrentRoom] = useState('general');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      // Join initial room
      socket.emit('join_room', currentRoom);

      // Socket event listeners
      socket.on('room_messages', (roomMessages) => {
        setMessages(roomMessages);
      });

      socket.on('new_message', (message) => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('user_joined', (data) => {
        console.log(data.message);
      });

      socket.on('user_left', (data) => {
        console.log(data.message);
      });

      socket.on('room_users', (users) => {
        setOnlineUsers(users);
      });

      socket.on('user_typing', (data) => {
        if (data.isTyping) {
          setTypingUsers(prev => [...prev.filter(u => u !== data.username), data.username]);
        } else {
          setTypingUsers(prev => prev.filter(u => u !== data.username));
        }
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      return () => {
        socket.off('room_messages');
        socket.off('new_message');
        socket.off('user_joined');
        socket.off('user_left');
        socket.off('room_users');
        socket.off('user_typing');
        socket.off('error');
      };
    }
  }, [socket, currentRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRoomChange = (roomName) => {
    if (socket && roomName !== currentRoom) {
      socket.emit('leave_room', currentRoom);
      socket.emit('join_room', roomName);
      setCurrentRoom(roomName);
      setMessages([]);
      setTypingUsers([]);
    }
  };

  const handleSendMessage = (content) => {
    if (socket && content.trim()) {
      socket.emit('send_message', {
        content: content.trim(),
        room: currentRoom
      });
    }
  };

  const handleTypingStart = () => {
    if (socket) {
      socket.emit('typing_start', { room: currentRoom });
    }
  };

  const handleTypingStop = () => {
    if (socket) {
      socket.emit('typing_stop', { room: currentRoom });
    }
  };

  const handleLogout = async () => {
    if (socket) {
      socket.disconnect();
    }
    await logout();
  };

  if (!socket) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Connecting to chat...</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatSidebar
        currentRoom={currentRoom}
        onRoomChange={handleRoomChange}
        onlineUsers={onlineUsers}
      />
      
      <div className="chat-main">
        <div className="chat-header">
          <div>
            <h2 className="chat-title">#{currentRoom}</h2>
            <p className="chat-subtitle">
              {onlineUsers.length} user{onlineUsers.length !== 1 ? 's' : ''} online
            </p>
          </div>
          
          <div className="user-info">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="username">{user?.username}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        <MessageList
          messages={messages}
          currentUser={user}
          typingUsers={typingUsers}
        />
        
        <MessageInput
          onSendMessage={handleSendMessage}
          onTypingStart={handleTypingStart}
          onTypingStop={handleTypingStop}
        />
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chat;
