import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { PriceProvider } from '@/context/PriceContext';
import Summary from '@/pages/Summary';
import ChartPage from '@/pages/ChartPage';
import Statistics from '@/pages/Statistics';
import Analysis from '@/pages/Analysis';
import Settings from '@/pages/Settings';
import Tabs from '@/components/Tabs/Tabs';
import PriceHeader from '@/components/Header/PriceHeader';
import GlobalStyles from './GlobalStyles';
export default function App() {
    return (_jsxs(PriceProvider, { children: [_jsx(GlobalStyles, {}), _jsxs("div", { children: [_jsx(PriceHeader, {}), _jsx(Tabs, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Summary, {}) }), _jsx(Route, { path: "/chart", element: _jsx(ChartPage, {}) }), _jsx(Route, { path: "/stats", element: _jsx(Statistics, {}) }), _jsx(Route, { path: "/analysis", element: _jsx(Analysis, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) })] })] })] }));
}
