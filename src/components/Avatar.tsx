import React from 'react';
import { Color } from '../types';

interface AvatarProps {
  color: Color;
  seed: string;
}

const Avatar: React.FC<AvatarProps> = ({ color, seed }) => {
  const colorClass = color === Color.RED ? 'bg-avatar-red' : color === Color.GREEN ? 'bg-avatar-green' : 'bg-avatar-blue';
  
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = hash % 6;

  return (
    <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ${colorClass}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="40" r="18" fill="#2a2a2a" />
        <ellipse cx="50" cy="75" rx="25" ry="20" fill="#2a2a2a" />
        
        {variant === 0 && (
          <>
            <circle cx="45" cy="38" r="2" fill="white" />
            <circle cx="55" cy="38" r="2" fill="white" />
            <path d="M 45 46 Q 50 48 55 46" stroke="#fff" strokeWidth="1.5" fill="none" />
          </>
        )}
        
        {variant === 1 && (
          <>
            <circle cx="45" cy="38" r="2" fill="white" />
            <circle cx="55" cy="38" r="2" fill="white" />
            <circle cx="50" cy="44" r="2" fill="white" />
          </>
        )}
        
        {variant === 2 && (
          <>
            <line x1="43" y1="38" x2="47" y2="38" stroke="white" strokeWidth="2" />
            <line x1="53" y1="38" x2="57" y2="38" stroke="white" strokeWidth="2" />
            <path d="M 45 46 Q 50 44 55 46" stroke="#fff" strokeWidth="1.5" fill="none" />
          </>
        )}
        
        {variant === 3 && (
          <>
            <circle cx="45" cy="38" r="2" fill="white" />
            <circle cx="55" cy="38" r="2" fill="white" />
            <ellipse cx="50" cy="46" rx="3" ry="2" fill="white" />
          </>
        )}
        
        {variant === 4 && (
          <>
            <circle cx="45" cy="38" r="1.5" fill="white" />
            <circle cx="55" cy="38" r="1.5" fill="white" />
            <path d="M 44 46 Q 50 50 56 46" stroke="#fff" strokeWidth="1.5" fill="none" />
          </>
        )}
        
        {variant >= 5 && (
          <>
            <circle cx="45" cy="38" r="2" fill="white" />
            <circle cx="55" cy="38" r="2" fill="white" />
            <line x1="45" y1="46" x2="55" y2="46" stroke="white" strokeWidth="1.5" />
          </>
        )}
        
        {(hash % 3 === 0) && (
          <>
            <circle cx="42" cy="72" r="2" fill="white" opacity="0.3" />
            <circle cx="50" cy="75" r="2" fill="white" opacity="0.3" />
            <circle cx="58" cy="72" r="2" fill="white" opacity="0.3" />
          </>
        )}
        
        {(hash % 3 === 1) && (
          <>
            <line x1="40" y1="70" x2="44" y2="74" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="44" y1="70" x2="48" y2="74" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="52" y1="70" x2="56" y2="74" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="56" y1="70" x2="60" y2="74" stroke="white" strokeWidth="1" opacity="0.3" />
          </>
        )}
      </svg>
    </div>
  );
};

export default Avatar;
