import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
  Rectangle,
} from "recharts";

interface CustomLineChartProps {
  data: Array<{ name: string; [key: string]: number | string }>;
  dataKeys: { firstSeries: string; secondSeries: string };
}

const CustomizedRectangle = (props: any) => {
  const { formattedGraphicalItems } = props;

  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  const threshold = 300; // Define the threshold for color change

  return firstSeries?.props?.points.map((firstPoint: any, index: number) => {
    const secondPoint = secondSeries?.props?.points[index];

    if (!secondPoint) return null;

    const yDiff = firstPoint.y - secondPoint.y;
    const height = Math.abs(yDiff);
    const x = secondPoint.x - 5;
    const y = yDiff > 0 ? secondPoint.y : firstPoint.y;

    const valueDiff = Math.abs(firstPoint.value - secondPoint.value);

    const fill =
      valueDiff <= threshold
        ? "green"
        : "red";

    return (
      <Rectangle
        key={firstPoint.payload.name}
        width={10}
        height={height}
        x={x}
        y={y}
        fill={fill}
      />
    );
  });
};

const LineChartRectangle: React.FC<CustomLineChartProps> = ({ data, dataKeys }) => {
  const { firstSeries, secondSeries } = dataKeys;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={firstSeries} stroke="#8884d8" />
        <Line type="monotone" dataKey={secondSeries} stroke="#82ca9d" />
        <Customized component={CustomizedRectangle} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartRectangle;
