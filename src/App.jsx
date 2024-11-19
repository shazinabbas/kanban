import React from 'react';
import './App.css';
import DisplayButton from './components/DisplayButton/DisplayButton';
import Board from './components/Board/Board';
import { useKanban } from './hooks/useKanban';

function App() {
  const {
    users,
    groupBy,
    setGroupBy,
    sortBy,
    setSortBy,
    groupedAndSortedTickets,
    priorityLevels
  } = useKanban();

  return (
    <div className="app">
      <nav className="navbar">
        <DisplayButton
          groupBy={groupBy}
          sortBy={sortBy}
          onGroupChange={setGroupBy}
          onSortChange={setSortBy}
        />
      </nav>
      
      <main className="main-content">
        <Board 
          groupedTickets={groupedAndSortedTickets()}
          users={users}
          groupBy={groupBy}
          priorityLevels={priorityLevels}
        />
      </main>
    </div>
  );
}

export default App; 