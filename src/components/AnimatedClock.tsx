import React from 'react';

interface AnimatedClockProps {
  time: string;
  className?: string;
}

export const AnimatedClock: React.FC<AnimatedClockProps> = ({ time, className = "" }) => {
  const [hours, minutes] = time.split(':');
  const hourDegrees = (parseInt(hours) % 12) * 30 + parseInt(minutes) * 0.5;
  const minuteDegrees = parseInt(minutes) * 6;

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Clock face */}
        <circle cx="12" cy="12" r="10" />
        
        {/* Hour hand */}
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="8"
          strokeLinecap="round"
          style={{
            transformOrigin: 'center',
            transform: `rotate(${hourDegrees}deg)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        />
        
        {/* Minute hand */}
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="6"
          strokeLinecap="round"
          style={{
            transformOrigin: 'center',
            transform: `rotate(${minuteDegrees}deg)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        />
      </svg>
    </div>
  );
};