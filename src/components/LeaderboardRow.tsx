import React from 'react';
import { User } from '../types';
import Avatar from './Avatar';

interface LeaderboardRowProps {
  user: User;
  rank: number;
  isSelected: boolean;
  onSelect: () => void;
  rankWidth: number;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  user,
  rank,
  isSelected,
  onSelect,
  rankWidth
}) => {
  // Format time as MM:SS.mmm
  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  return (
    <div 
      className={`flex items-center p-3 sm:p-4 gap-3 cursor-pointer transition-colors duration-200 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 ${
        isSelected ? 'bg-purple-selected dark:bg-purple-selected-dark' : ''
      }`}
      onClick={onSelect}
    >
      <div 
        className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 text-right flex-shrink-0 transition-[width] duration-300 ease-in-out"
        style={{ width: `${rankWidth}px` }}
      >
        {rank}
      </div>
      <Avatar color={user.color} seed={user.name} />
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="text-[15px] sm:text-base font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap overflow-hidden text-ellipsis">
          {user.name}
        </div>
        <div className="text-[13px] sm:text-sm text-gray-600 dark:text-gray-400">
          <span className="text-race-blue dark:text-indigo-400 font-medium">{formatTime(user.time)}</span>
          <span> | {user.speed} км/ч</span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500">штрафний час 00:00.00</div>
      </div>
    </div>
  );
};

export default LeaderboardRow;
