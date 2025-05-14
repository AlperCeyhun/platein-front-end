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

  return firstSeries?.props?.points.map((firstSeriesPoint: any, index: number) => {
    const secondSeriesPoint = secondSeries?.props?.points[index];
    const yDifference = firstSeriesPoint.y - secondSeriesPoint.y;

    return (
      <Rectangle
        key={firstSeriesPoint.payload.name}
        width={10}
        height={Math.abs(yDifference)}
        x={secondSeriesPoint.x - 5}
        y={yDifference > 0 ? secondSeriesPoint.y : firstSeriesPoint.y}
        fill={yDifference > 0 ? "red" : yDifference < 0 ? "green" : "none"}
      />
    );
  });
};

const LineChartRectangle: React.FC<CustomLineChartProps> = ({ data, dataKeys }) => {
  const { firstSeries, secondSeries } = dataKeys;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
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