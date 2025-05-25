import styled from 'styled-components';
export const ControlsWrapper = styled.div `
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0rem;
`;
export const Toolbar = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ isFull }) => (isFull ? '100%' : '80%')} !important;
   padding: ${({ isFull }) => (isFull ? '0 1rem' : '0')} !important;
`;
export const ToolbarRight = styled.div `
  display: flex;
  gap: 1.5rem;
`;
export const RangeButton = styled.button `
  background: ${({ active }) => (active ? '#4B40EE' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#555')};
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #4b40ee;
    color: #fff;
  }
`;
