import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`;

export const Price = styled.h1`
  font-size: 70px;
  display: flex;
  color: #1A243A;
  align-items:flex-start;
  font-weight: 400;
  margin: 0;
  padding: 0;
  line-height: 100%;
`;

export const Change = styled.span<{ positive: boolean }>`
  margin-left: 1rem;
  color: ${({ positive }) => (positive ? '#67BF6B' : 'red')};
  font-size: 18px;
  font-weight: 400;
`;

export const PriceWithSymbol = styled.div`
   display: flex;
   align-items: flex-start;

`

export const Symbol = styled.h4`
color:#BDBEBF;
font-weight: 400;
font-size: 1.25rem;
line-height: 100%;
`
