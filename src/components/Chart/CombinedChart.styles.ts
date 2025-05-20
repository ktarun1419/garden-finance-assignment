import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

export const ChartWrapper = styled.div`
  position: relative;
  padding: 1rem;
`;

export const FullscreenButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

// wrap Recharts’ ResponsiveContainer so it can live in styled-components
export const StyledResponsiveContainer = styled(ResponsiveContainer)`
  width: 100% !important;
  height: 450px !important;
`;
