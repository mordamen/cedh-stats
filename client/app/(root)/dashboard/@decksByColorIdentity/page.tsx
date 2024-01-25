'use client';

import { unstable_noStore as noStore } from 'next/cache';
import { useCallback, useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Sector } from 'recharts';

interface ChartDataItem {
	name: string;
	value: number;
}

const renderActiveShape = (props: any) => {
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor='middle' fill='#ffffff' className='text-xs'>
				[payload.name]
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill='#ffffff'>{`${value}`}</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='#ffffff'>
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

const decksByColorIdentity = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [chartData, setChartData] = useState<ChartDataItem[]>([]);

	const onPieEnter = useCallback(
		(_: any, index: any) => {
			setActiveIndex(index);
		},
		[setActiveIndex]
	);

	useEffect(() => {
		const fetchData = async () => {
			noStore(); // Assuming this is a custom function

			try {
				const response = await fetch(`http://localhost:8181/api/decks/decksByColorIdentity`);
				const data = await response.json();
				console.log('🚀 ~ fetchData ~ data:', data);

				const transformedData = [];
				for (const item of data) {
					for (const [key, value] of Object.entries(item)) {
						transformedData.push({ name: key, value: value as number });
					}
				}

				setChartData(transformedData as ChartDataItem[]);
				// Do something with transformedData here, e.g., set a state variable
				console.log(transformedData);
			} catch (error) {
				console.error(error);
				throw error; // Re-throw to handle in the component
			}
		};

		// Call the fetchData function within useEffect
		fetchData();
	}, []); // Empty dependency array to run only once on component mount

	return (
		// <ResponsiveContainer width={400} height={250}>
		<PieChart width={400} height={250}>
			<Pie
				activeIndex={activeIndex}
				activeShape={renderActiveShape}
				onMouseEnter={onPieEnter}
				dataKey='value'
				data={chartData}
				cx={200}
				cy={120}
				innerRadius={60}
				outerRadius={80}
				fill='#8884d8'
			/>
		</PieChart>
		// </ResponsiveContainer>
	);
};

export default decksByColorIdentity;
