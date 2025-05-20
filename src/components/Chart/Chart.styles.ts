import styled from 'styled-components';

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0rem;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


export const RangeButton = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? '#5c6bc0' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#555')};
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #5c6bc0;
    color: #fff;
  }
`;
