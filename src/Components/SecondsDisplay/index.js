import React from 'react';

export default function SecondsDisplay({ seconds, cs }) {
  return (
    <div className="seconds-container">
      <div className="seconds number">{seconds.toString().padStart(2, '0')}</div>
      <span className="centiseconds">
        {cs.toString().padStart(2, '0')}
      </span>
      <div className="label seconds-label">seconds</div>
    </div>
  );
}