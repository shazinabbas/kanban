import React, { useState } from 'react';
import './DisplayButton.css';
import { display, down } from '../../assets';

const DisplayButton = ({ groupBy, sortBy, onGroupChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="display-button-container">
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
      <img src={display} alt="Display" className="display-icon" />
      <span>Display</span>
      <img src={down} alt="Down" className="display-icon" />
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <span className="label">Grouping</span>
            <select 
              value={groupBy} 
              onChange={(e) => onGroupChange(e.target.value)}
              className="select-input"
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          
          <div className="dropdown-item">
            <span className="label">Ordering</span>
            <select 
              value={sortBy} 
              onChange={(e) => onSortChange(e.target.value)}
              className="select-input"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayButton; 