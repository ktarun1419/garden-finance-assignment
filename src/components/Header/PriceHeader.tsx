import React from 'react';
import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import Skeleton from '@/components/Skeleton';
import { HeaderWrapper, Price, Change, PriceWithSymbol, Symbol } from './PriceHeader.styles';

export default function PriceHeader() {
  const { summary, isLoading } = useContext(PriceContext);

  if (isLoading || !summary)
    return (
      <HeaderWrapper>
        <PriceWithSymbol>
          <Skeleton width="200px" height="70px" />
        </PriceWithSymbol>
        <Skeleton width="120px" height="24px" />
      </HeaderWrapper>
    );

  return (
    <HeaderWrapper>
        <PriceWithSymbol>
        <Price>{summary.current.toLocaleString()}</Price>
        <Symbol>USD</Symbol>
        </PriceWithSymbol>
     
      <Change positive={summary.change >= 0}>
        {summary.change >= 0 ? '+' : ''}
        {summary.change.toFixed(2)} ({summary.changePct.toFixed(2)}%)
      </Change>
    </HeaderWrapper>
  );
}
