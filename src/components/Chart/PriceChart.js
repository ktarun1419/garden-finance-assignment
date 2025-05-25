import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function PriceChart({ data }) {
    return (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: data, children: [_jsx(XAxis, { dataKey: "timestamp", tickFormatter: (ts) => new Date(ts).toLocaleDateString() }), _jsx(YAxis, { domain: ['auto', 'auto'] }), _jsx(Tooltip, { labelFormatter: (label) => new Date(label).toLocaleString(), formatter: (value) => `$${value.toFixed(2)}` }), _jsx(Line, { type: "monotone", dataKey: "price", stroke: "#5c6bc0", dot: false })] }) }));
}
