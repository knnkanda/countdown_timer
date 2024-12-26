import React from 'react';
import { DateTimeInfo } from '../types';

interface CurrentDateTimeProps {
  currentDateTime: DateTimeInfo;
}

export const CurrentDateTime: React.FC<CurrentDateTimeProps> = ({ currentDateTime }) => {
  const { year, month, day, dayOfWeek, time } = currentDateTime;
  
  return (
    <div className="text-center space-y-3">
      <div className="text-xl font-light">
        <span className="text-pink-200/70">Date: </span>
        <span className="text-pink-100">{`${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')} ${dayOfWeek}`}</span>
      </div>
      <div className="text-2xl font-light">
        <span className="text-pink-200/70">Time: </span>
        <span className="text-pink-100">{time}</span>
      </div>
    </div>
  );
};