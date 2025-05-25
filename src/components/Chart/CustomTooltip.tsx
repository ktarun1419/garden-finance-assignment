// src/components/Chart/CustomTooltip.tsx
import React from 'react';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const pricePoint = payload.find((p) => p.dataKey === 'price');
    if (!pricePoint) return null;

    return (
      <div
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        ${pricePoint.value.toFixed(2)}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
