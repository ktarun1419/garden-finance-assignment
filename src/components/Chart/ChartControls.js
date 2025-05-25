import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import { ControlsWrapper, RangeButton } from './Chart.styles';
const ranges = ['1d', '1w', '1m'];
export default function ChartControls() {
    const { range, setRange } = useContext(PriceContext);
    return (_jsx(ControlsWrapper, { children: ranges.map((r) => (_jsx(RangeButton, { active: r === range, onClick: () => setRange(r), children: r }, r))) }));
}
