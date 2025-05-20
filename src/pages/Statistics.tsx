import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import styled from 'styled-components';

export default function Statistics() {
  const { chartData, isLoading } = useContext(PriceContext);

  if (isLoading || !chartData) return <p>Loading statistics…</p>;

  const prices = chartData.map((p) => p.price);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <Wrapper>
      <h1>Statistics</h1>
      <StatList>
        <StatItem>
          <Label>High:</Label> {high.toFixed(2)}
        </StatItem>
        <StatItem>
          <Label>Low:</Label> {low.toFixed(2)}
        </StatItem>
        <StatItem>
          <Label>Average:</Label> {avg.toFixed(2)}
        </StatItem>
      </StatList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
`;

const StatList = styled.ul`
  list-style: none;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatItem = styled.li`
  font-size: 1.25rem;
  color: #1a243a;
`;

const Label = styled.span`
  color: #6f7177;
  margin-right: 0.25rem;
`;
