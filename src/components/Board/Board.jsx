import React from 'react';
import TicketCard from '../TicketCard/TicketCard';
import { 
  PRIORITY_LEVELS, 
  PRIORITY_ICONS, 
  STATUS_ICONS 
} from '../../utils/constants';
import './Board.css';
import { add, threeDots } from '../../assets';

const Board = ({ groupedTickets, users, groupBy }) => {
  // Define all possible statuses with consistent naming
  const ALL_STATUSES = {
    'Backlog': [],
    'Todo': [],
    'In Progress': [],
    'Done': [],
    'Cancelled': []
  };

  // Normalize status names when processing tickets
  const normalizeStatus = (status) => {
    const normalized = status.toLowerCase().trim();
    if (normalized === 'in progress' || normalized === 'inprogress') {
      return 'In Progress';
    }
    return status;
  };

  const renderColumns = () => {
    switch (groupBy) {
      case 'status':
        // Normalize and merge tickets
        const normalizedTickets = Object.entries(groupedTickets).reduce((acc, [status, tickets]) => {
          const normalizedStatus = normalizeStatus(status);
          acc[normalizedStatus] = tickets;
          return acc;
        }, {});

        // Merge with default statuses
        const allTickets = { ...ALL_STATUSES, ...normalizedTickets };
        
        return Object.entries(allTickets).map(([status, tickets]) => (
          <div key={status} className="column">
            <div className="column-header">
              <div className="header-left">
                <img src={STATUS_ICONS[status]} alt={status} />
                <span className="status-title">{status}</span>
                <span className="ticket-count">{tickets.length}</span>
              </div>
              <div className="header-actions">
                <button className="action-btn">
                  <img src={add} alt="Add" />
                </button>
                <button className="action-btn">
                  <img src={threeDots} alt="More options" />
                </button>
              </div>
            </div>
            <div className="tickets-container">
              {tickets.map(ticket => (
                <TicketCard
                  key={ticket.id}
                  ticket={{
                    ...ticket,
                    status: normalizeStatus(ticket.status) // Normalize status in ticket object
                  }}
                  user={users.find(user => user.id === ticket.userId)}
                  priorityIcon={PRIORITY_ICONS[ticket.priority]}
                />
              ))}
            </div>
          </div>
        ));

      case 'user':
        return Object.entries(groupedTickets).map(([userId, tickets]) => {
          const user = users.find(u => u.id === userId);
          return (
            <div key={userId} className="column">
              <div className="column-header">
                <div className="header-left">
                  <div className="user-avatar">
                    <img 
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                      alt={user?.name}
                      className="avatar-img"
                    />
                    <span className={`availability-status ${user?.available ? 'available' : ''}`}></span>
                  </div>
                  <span className="status-title">{user?.name}</span>
                  <span className="ticket-count">{tickets.length}</span>
                </div>
                <div className="header-actions">
                  <button className="action-btn">
                    <img src={add} alt="Add" />
                  </button>
                  <button className="action-btn">
                    <img src={threeDots} alt="More options" />
                  </button>
                </div>
              </div>
              <div className="tickets-container">
                {tickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    user={user}
                    priorityIcon={PRIORITY_ICONS[ticket.priority]}
                  />
                ))}
              </div>
            </div>
          );
        });

      case 'priority':
        return Object.entries(groupedTickets)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([priority, tickets]) => (
            <div key={priority} className="column">
              <div className="column-header">
                <div className="header-left">
                  <img 
                    src={PRIORITY_ICONS[priority]} 
                    alt={PRIORITY_LEVELS[priority]} 
                    className="priority-icon"
                  />
                  <span className="status-title">{PRIORITY_LEVELS[priority]}</span>
                  <span className="ticket-count">{tickets.length}</span>
                </div>
                <div className="header-actions">
                  <button className="action-btn">
                    <img src={add} alt="Add" />
                  </button>
                  <button className="action-btn">
                    <img src={threeDots} alt="More options" />
                  </button>
                </div>
              </div>
              <div className="tickets-container">
                {tickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    user={users.find(user => user.id === ticket.userId)}
                  />
                ))}
              </div>
            </div>
          ));

      default:
        return null;
    }
  };

  return (
    <div className="board">
      {renderColumns()}
    </div>
  );
};

export default Board; 