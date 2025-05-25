import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

export const ChartWrapper = styled.div<{ isFull: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  padding: 1rem;
  padding-top: 2rem;
  height: ${({ isFull }) => (isFull ? '100vh' : 'auto')};
  box-sizing: border-box;
`;

export const FullscreenButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
  padding: 0.25rem;
  font-size: 0.85rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6f7177;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const CompareButton = styled(FullscreenButton)``;

export const StyledResponsiveContainer = styled(ResponsiveContainer)<{ isFull: boolean }>`
  width:${({ isFull }) => (isFull ? '100%' : '80%')} !important;
  height: ${({ isFull }) => (isFull ? '100%' : '450px')} !important;
  padding: ${({ isFull }) => (isFull ? '0rem' : '0')}
`;
