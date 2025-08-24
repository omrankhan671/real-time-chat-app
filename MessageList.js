import React, { useEffect, useRef } from 'react';
import './MessageList.css';

const MessageList = ({ messages, currentUser, typingUsers }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOwnMessage = (message) => {
    return message.sender._id === currentUser.id;
  };

  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>No messages yet</h3>
            <p>Be the first to start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`message ${isOwnMessage(message) ? 'own-message' : 'other-message'}`}
            >
              {!isOwnMessage(message) && (
                <div className="message-avatar">
                  {message.sender.username.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="message-content">
                {!isOwnMessage(message) && (
                  <div className="message-header">
                    <span className="message-sender">{message.sender.username}</span>
                    <span className="message-time">{formatTime(message.createdAt)}</span>
                  </div>
                )}
                
                <div className="message-bubble">
                  <p className="message-text">{message.content}</p>
                  {isOwnMessage(message) && (
                    <span className="message-time own-time">{formatTime(message.createdAt)}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            <div className="typing-avatar">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="typing-text">
              {typingUsers.length === 1
                ? `${typingUsers[0]} is typing...`
                : `${typingUsers.length} people are typing...`}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
