import styled, { keyframes } from 'styled-components';
const pulse = keyframes `
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;
const Skeleton = styled.div `
  background-color: #e0e0e0;
  border-radius: 4px;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '1em'};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;
export default Skeleton;
