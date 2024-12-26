import React from 'react';
import { formatCountdown } from '../utils/dateUtils';

interface CountdownDisplayProps {
  timeRemaining: number | null;
  targetTime: string;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  timeRemaining,
  targetTime,
}) => {
  return (
    <div className="text-center space-y-6">
      <div>
        <span className="text-pink-200/70">Target Time: </span>
        <span className="text-2xl text-pink-100">{targetTime}</span>
      </div>
      <div className="text-6xl font-light tracking-wider font-mono text-pink-100">
        {timeRemaining !== null ? formatCountdown(timeRemaining) : '00:00:00'}
      </div>
    </div>
  );
};