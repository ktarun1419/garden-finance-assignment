import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import Skeleton from '@/components/Skeleton';
import { HeaderWrapper, Price, Change, PriceWithSymbol, Symbol } from './PriceHeader.styles';
export default function PriceHeader() {
    const { summary, isLoading } = useContext(PriceContext);
    if (isLoading || !summary)
        return (_jsxs(HeaderWrapper, { children: [_jsx(PriceWithSymbol, { children: _jsx(Skeleton, { width: "200px", height: "70px" }) }), _jsx(Skeleton, { width: "120px", height: "24px" })] }));
    return (_jsxs(HeaderWrapper, { children: [_jsxs(PriceWithSymbol, { children: [_jsx(Price, { children: summary.current.toLocaleString() }), _jsx(Symbol, { children: "USD" })] }), _jsxs(Change, { positive: summary.change >= 0, children: [summary.change >= 0 ? '+' : '', summary.change.toFixed(2), " (", summary.changePct.toFixed(2), "%)"] })] }));
}
