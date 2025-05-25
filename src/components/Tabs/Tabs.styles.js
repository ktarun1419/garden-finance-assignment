import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const TabsContainer = styled.nav `
  display: flex;
  gap: 1.5rem;
  padding: 0 1rem;
  border-bottom: 1px solid #EFF1F3;
`;
export const TabLink = styled(NavLink) `
  position: relative;
  padding: 0.75rem 0;
  font-size: 18px;
  color: #6F7177;                     
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: #1A243A;
  }

  &[aria-current='page'] {
    color: #1A243A;                    
    border-color: #4B40EE;          
  }
`;
