import { jsxs as _jsxs } from "react/jsx-runtime";
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
        const pricePoint = payload.find((p) => p.dataKey === 'price');
        if (!pricePoint)
            return null;
        return (_jsxs("div", { style: {
                backgroundColor: '#000',
                color: '#fff',
                padding: '6px 10px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 500,
            }, children: ["$", pricePoint.value.toFixed(2)] }));
    }
    return null;
};
export default CustomTooltip;
