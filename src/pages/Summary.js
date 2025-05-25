import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
export default function Summary() {
    return (_jsxs(Wrapper, { children: [_jsx(Title, { children: "\uD83D\uDCC4 Assignment Summary" }), _jsx(TrendText, { children: "GM! Here\u2019s my completed assignment for the Garden Finance frontend role \uD83D\uDE80" }), _jsx(TrendText, { children: "It was originally due Monday, but I had some last-minute responsibilities at my previous role over the weekend. I got started yesterday and focused fully to get it done." }), _jsx(TrendText, { children: "For the assignment, I built a Bitcoin price chart and added functionality + pages that I felt aligned well with the vision. Looking forward to feedback and hoping this meets expectations \uD83C\uDF3F" })] }));
}
const Wrapper = styled.div `
  padding: 1rem;
`;
const Title = styled.h1 `
  margin-bottom: 1rem;
`;
const TrendText = styled.p `
  font-size: 1rem;
`;
