import React from 'react';
import './Card.css';
import { PRIORITY_MAP } from '../../utils/constants';

const Card = ({ ticket, user }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar">
            <img 
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} 
              alt={user.name}
            />
            <span className={`status-indicator ${user.available ? 'available' : ''}`} />
          </div>
        )}
      </div>
      
      <div className="card-title">
        <span className="priority-icon">
          {PRIORITY_MAP[ticket.priority].icon}
        </span>
        <p>{ticket.title}</p>
      </div>
      
      <div className="card-tags">
        <div className="tag">
          <span className="tag-icon">⭕</span>
          <span className="tag-text">{ticket.tag.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default Card; 