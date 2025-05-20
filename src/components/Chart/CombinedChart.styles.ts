import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

export const ChartWrapper = styled.div<{ isFull: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: ${({ isFull }) => (isFull ? '#fff' : 'transparent')};
  height: ${({ isFull }) => (isFull ? '100vh' : 'auto')};
`;

export const FullscreenButton = styled.button`
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

// wrap Recharts’ ResponsiveContainer so it can live in styled-components
export const StyledResponsiveContainer = styled(ResponsiveContainer)<{ isFull: boolean }>`
  width: 100% !important;
  flex: 1 1 auto;
  height: ${({ isFull }) => (isFull ? '100%' : '450px')} !important;
`;
