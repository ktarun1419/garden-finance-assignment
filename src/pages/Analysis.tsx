import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import PriceChart from '@/components/Chart/PriceChart';
import styled from 'styled-components';

export default function Analysis() {
  const { chartData, isLoading } = useContext(PriceContext);

  if (isLoading || !chartData) return <p>Loading analysis…</p>;

  const first = chartData[0].price;
  const last = chartData[chartData.length - 1].price;
  const trend = last > first ? 'upward' : last < first ? 'downward' : 'flat';
  const changePct = ((last - first) / first) * 100;

  const color = trend === 'upward' ? '#67BF6B' : trend === 'downward' ? '#de5e60' : '#6f7177';

  return (
    <Wrapper>
      <Title>Analysis</Title>
      <PriceChart data={chartData} />
      <TrendText style={{ color }}>The overall trend for this period is {trend} with a {changePct.toFixed(2)}% change.</TrendText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const TrendText = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
`;
