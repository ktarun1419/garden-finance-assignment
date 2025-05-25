"use strict";
// // src/components/Chart/CombinedChart.tsx
// import React, { useRef, useState, useEffect } from 'react';
// import screenfull from 'screenfull';
// import {
//   ComposedChart,
//   Area,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ReferenceDot,
//   ReferenceLine,
//   Customized,
// } from 'recharts';
// import type { PricePoint } from '@/types/price';
// import {
//   ChartWrapper,
//   FullscreenButton,
//   StyledResponsiveContainer as Container,
//   CompareButton,
// } from './CombinedChart.styles';
// import ChartControls from './ChartControls';
// import { Toolbar, ToolbarRight } from './Chart.styles';
// import { FullscreenIcon } from '@/assets/fullscreen';
// import { CompareIcon } from '@/assets/compare';
// import CustomTooltip from './CustomTooltip';
// interface Props {
//   data: PricePoint[];
// }
// export default function CombinedChart({ data }: Props) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [isFull, setIsFull] = useState(false);
//   console.log({ data });
//   useEffect(() => {
//     if (!screenfull.isEnabled) return;
//     const onChange = () => setIsFull(screenfull.isFullscreen);
//     screenfull.on('change', onChange);
//     return () => void screenfull.off('change', onChange);
//   }, []);
//   const toggleFull = () => {
//     if (ref.current && screenfull.isEnabled) {
//       screenfull.toggle(ref.current);
//     }
//   };
//   const last = data[data.length - 1];
//   return (
//     <ChartWrapper ref={ref} isFull={isFull}>
//       <Toolbar>
//         <ToolbarRight>
//           <FullscreenButton onClick={toggleFull}>
//             <FullscreenIcon />
//             {isFull ? 'Exit Fullscreen' : 'Fullscreen'}
//           </FullscreenButton>
//           <CompareButton>
//             <CompareIcon />
//             Compare
//           </CompareButton>
//         </ToolbarRight>
//         <ChartControls />
//       </Toolbar>
//       <Container isFull={isFull}>
//         <ComposedChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barCategoryGap="0%"  barGap="0"        >
//           {/* gradient for area */}
//           <defs>
//             <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#5c6bc0" stopOpacity={0.6} />
//               <stop offset="95%" stopColor="#5c6bc0" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid stroke="#E2E4E7" vertical={false} />
//           <XAxis
//             dataKey="timestamp"
//             axisLine={{ stroke: '#E2E4E7' }}
//             tickLine={{ stroke: '#E2E4E7', strokeWidth: 1 }}
//             tick={isFull}
//             scale="time"
//             tickCount={5}
//             tickFormatter={isFull ? (ts) => new Date(ts).toLocaleTimeString() : undefined}
//             padding={{ left: 0, right: 0 }}
//             interval="preserveStartEnd"
//             // domain={['dataMin','dataMax']}  
//           />
//           <YAxis
//             yAxisId="price"
//             axisLine={{ stroke: '#E2E4E7' }}
//             tickLine={{ stroke: '#E2E4E7' }}
//             tick={isFull}
//             tickFormatter={isFull ? (n) => `$${n.toFixed(0)}` : undefined}
//             domain={['auto', 'auto']}
//             interval="preserveStartEnd"
//             // domain={['dataMin','dataMax']}    
//           />
//           <YAxis
//             yAxisId="volume"
//             orientation="right"
//             axisLine={{ stroke: '#E2E4E7' }}
//             tick={false}
//             height={10}
//             interval="preserveStartEnd"
//             domain={['dataMin','dataMax']}    
//             // domain={[0, (dataMax: number) => Math.max(dataMax, 1)]}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Bar
//             yAxisId="volume"
//             dataKey={(entry) => entry.volume / 10000000}
//             barSize={2}
//             fill="#E2E4E7"
//             radius={[2, 2, 0, 0]}
//             layout="horizontal"
//           />
//           <Area
//             yAxisId="price"
//             type="monotone"
//             dataKey="price"
//             stroke="none"
//             fill="url(#priceGrad)"
//           />
//           <Line
//             yAxisId="price"
//             type="monotone"
//             dataKey="price"
//             stroke="#4B40EE"
//             dot={false}
//             strokeWidth={2}
//           />
//           <ReferenceLine yAxisId="price" y={last.price} stroke="#888" strokeDasharray="3 3" />
//           <Customized
//             component={(({ width, height, xAxisMap, yAxisMap, data } ) => {
//               const priceAxis = yAxisMap['price'];
//               const xAxis = xAxisMap[0]; // assuming default X axis
//               const lastPoint = data[data.length - 1];
//               if (!lastPoint) return null;
//               const x = xAxis.scale(lastPoint.timestamp);
//               const y = priceAxis.scale(lastPoint.price);
//               console.log({ x, y });
//               const text = `$${lastPoint.price.toFixed(2)}`;
//               const fontSize = 14;
//               const padX = 8;
//               const padY = 4;
//               const textWidth = text.length * fontSize * 0.6 + padX * 2;
//               const chipHeight = fontSize + padY * 4;
//               return (
//                 <g transform={`translate(${x - textWidth / 2}, ${y - chipHeight / 2})`}>
//                   <rect width={textWidth} height={chipHeight} rx={4} ry={4} fill="#4B40EE" />
//                   <text
//                     x={padX}
//                     y={chipHeight / 2}
//                     dominantBaseline="middle"
//                     fill="#fff"
//                     fontSize={fontSize}
//                   >
//                     {text}
//                   </text>
//                 </g>
//               );
//             }) as any}
//           />
//         </ComposedChart>
//       </Container>
//     </ChartWrapper>
//   );
// }
