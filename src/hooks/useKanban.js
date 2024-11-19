import { useState, useEffect } from 'react';

export const useKanban = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem('groupBy') || 'status'
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem('sortBy') || 'priority'
  );
  const [priorityLevels, setPriorityLevels] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        
        const uniqueStatuses = [...new Set(data.tickets.map(ticket => ticket.status))];
        console.log("Available Status Types:", uniqueStatuses);
        
        const uniquePriorities = [...new Set(data.tickets.map(ticket => ticket.priority))];
        console.log("Available Priority Levels:", uniquePriorities);

        const priorityMap = {
          4: "Urgent",
          3: "High",
          2: "Medium",
          1: "Low",
          0: "No priority"
        };

        setPriorityLevels(priorityMap);
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  const groupedAndSortedTickets = () => {
    let grouped = {};
    
    switch (groupBy) {
      case 'status':
        grouped = tickets.reduce((acc, ticket) => {
          acc[ticket.status] = [...(acc[ticket.status] || []), ticket];
          return acc;
        }, {});
        break;
        
      case 'user':
        grouped = tickets.reduce((acc, ticket) => {
          const user = users.find(u => u.id === ticket.userId);
          const userName = user ? user.name : 'Unassigned';
          acc[userName] = [...(acc[userName] || []), ticket];
          return acc;
        }, {});
        break;
        
      case 'priority':
        grouped = tickets.reduce((acc, ticket) => {
          const priority = ticket.priority;
          acc[priority] = [...(acc[priority] || []), ticket];
          return acc;
        }, {});
        break;
        
      default:
        break;
    }

    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });

    return grouped;
  };

  return {
    tickets,
    users,
    groupBy,
    setGroupBy,
    sortBy,
    setSortBy,
    groupedAndSortedTickets,
    priorityLevels
  };
}; 