import React, { KeyboardEvent } from 'react';
import { Clock } from 'lucide-react';
import { normalizeTimeInput, validateTimeFormat } from '../utils/timeUtils';

interface TimeInputProps {
  targetTime: string;
  setTargetTime: (time: string) => void;
  onStart: () => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  targetTime,
  setTargetTime,
  onStart,
}) => {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const normalizedValue = normalizeTimeInput(rawValue);
    setTargetTime(normalizedValue);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && targetTime && validateTimeFormat(targetTime)) {
      onStart();
    }
  };

  const isValidTime = targetTime && validateTimeFormat(targetTime);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="time" className="block text-sm text-pink-200/70 mb-3">
          Target Time
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9０-９:：]*"
          id="time"
          value={targetTime}
          onChange={handleTimeChange}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 time-input rounded-xl text-pink-100 focus:outline-none transition-all duration-300"
          required
        />
      </div>
      <button
        onClick={onStart}
        disabled={!isValidTime}
        className="w-full py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-300/20 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Clock className="w-5 h-5" />
        Start
      </button>
    </div>
  );
};