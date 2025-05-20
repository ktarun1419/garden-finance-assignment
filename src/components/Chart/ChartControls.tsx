import React from 'react';
import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import { ControlsWrapper, RangeButton } from './Chart.styles';

const ranges = ['1d', '1w', '1m'] as const;

export default function ChartControls() {
  const { range, setRange } = useContext(PriceContext);
  return (
    <ControlsWrapper>
      {ranges.map((r) => (
        <RangeButton
          key={r}
          active={r === range}
          onClick={() => setRange(r)}
        >
          {r}
        </RangeButton>
      ))}
    </ControlsWrapper>
  );
}
