import React from 'react';

export default function NumberDisplay({ label, amount }) {
  const transform = num => num.toString().padStart(2, '0');
  return (
    <div className="number-container">
      <div className="number">{transform(amount)}</div>
      <div className="label">{label}</div>
    </div>
  );
}