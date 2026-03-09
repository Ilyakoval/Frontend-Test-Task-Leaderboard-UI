import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
        <Header />
        <Leaderboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
