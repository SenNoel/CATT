import React from 'react';
import { AddExpense } from './AddExpense';
import './index.css';

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>CATT</h1>
        <p>Cash and Transaction Tracker</p>
      </header>
      
      <main style={{ padding: '20px' }}>
        <AddExpense />
      </main>
    </div>
  );
}

export default App;