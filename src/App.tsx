import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { getCurrentDateTime, formatCountdown } from './utils/dateUtils';
import { FlashOverlay } from './components/FlashOverlay';
import { TimeInput } from './components/TimeInput';
import { CurrentDateTime } from './components/CurrentDateTime';
import { CountdownDisplay } from './components/CountdownDisplay';
import { AnimatedClock } from './components/AnimatedClock';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
  const [targetTime, setTargetTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    
    if (isRunning && timeRemaining !== null) {
      if (timeRemaining <= 0) {
        setShowFlash(true);
        setCompletionTime(Date.now());
        return;
      }

      countdown = setInterval(() => {
        setTimeRemaining(prev => prev !== null ? prev - 1 : null);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isRunning, timeRemaining]);

  useEffect(() => {
    if (completionTime && Date.now() - completionTime >= 60000) {
      handleReset();
    }
  }, [currentDateTime, completionTime]);

  const handleStart = () => {
    if (!targetTime) return;

    const [hours, minutes] = targetTime.split(':').map(Number);
    const now = new Date();
    const target = new Date(now);
    target.setHours(hours, minutes, 0, 0);

    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const remainingSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);
    setTimeRemaining(remainingSeconds);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(null);
    setTargetTime('');
    setShowFlash(false);
    setCompletionTime(null);
  };

  return (
    <div className="min-h-screen gradient-bg text-white flex items-center justify-center relative">
      <div className="w-full max-w-md p-8 glass-effect rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-10">
          <AnimatedClock time={currentDateTime.time} className="w-10 h-10 text-pink-300" />
          <h1 className="text-3xl font-light tracking-wide text-pink-100">Timer</h1>
        </div>

        <CurrentDateTime currentDateTime={currentDateTime} />

        <div className="mt-10">
          {!isRunning ? (
            <TimeInput
              targetTime={targetTime}
              setTargetTime={setTargetTime}
              onStart={handleStart}
            />
          ) : (
            <CountdownDisplay
              timeRemaining={timeRemaining}
              targetTime={targetTime}
            />
          )}

          {isRunning && (
            <button
              onClick={handleReset}
              className="mt-8 w-full py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-300/20 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {showFlash && <FlashOverlay />}
    </div>
  );
}

export default App;