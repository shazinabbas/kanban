import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, user, priorityIcon }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
              alt={user.name}
              className="avatar-img"
            />
            <span className={`availability-status ${user.available ? 'available' : ''}`}></span>
          </div>
        )}
      </div>
      
      <div className="ticket-title">
        <h3>{ticket.title}</h3>
      </div>
      
      <div className="ticket-footer">
        {priorityIcon && (
          <div className="tag priority-tag">
            <img src={priorityIcon} alt="priority" />
          </div>
        )}
        {ticket.tag && (
          <div className="tag feature-tag">
            <span className="tag-dot"></span>
            <span>{ticket.tag}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard; 