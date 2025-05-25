import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TabsContainer, TabLink } from './Tabs.styles';
export default function Tabs() {
    return (_jsxs(TabsContainer, { children: [_jsx(TabLink, { to: '/', end: true, children: "Summary" }), _jsx(TabLink, { to: '/chart', children: "Chart" }), _jsx(TabLink, { to: '/stats', children: "Statistics" }), _jsx(TabLink, { to: '/analysis', children: "Analysis" }), _jsx(TabLink, { to: '/settings', children: "Settings" })] }));
}
