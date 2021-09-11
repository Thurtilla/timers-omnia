import React from 'react';
import Countdown from 'react-countdown';

export default function Timer({ time, overtime }) {
  const handleComplete = () => {};
  const autoStart = () => {
    if (time === undefined || time === 0) return false;
    return true;
  };
  return (
    <Countdown className="font-weight-bold h4"
      date={Date.now() + time || 0}
      overtime={overtime || false}
      onComplete={handleComplete}
      autoStart={autoStart}
    />
  );
}
