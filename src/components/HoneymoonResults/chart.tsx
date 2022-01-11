import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { COLORS } from "./helpers";
import styled from "styled-components";
import { HoneymoonResultsProps } from "./index";
const ChartContainer = styled(ResponsiveContainer)`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
const RADIAN = Math.PI / 180;

interface ICustomLabel {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  title: string;
  index: number;
  [key: string]: any;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  title,
  index,
  ...rest
}: ICustomLabel) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  console.log(rest);
  if (value === 0) {
    return null;
  }
  return (
    <>
      <text
        x={x}
        y={y-12}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {title}
      </text>
      <text
        x={x}
        y={y+10}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value}%
      </text>
      {}
    </>
  );
};

const HoneymoonResultsChart = ({ results, sumTotal }: HoneymoonResultsProps) => {
  const [chartSize, setChartSize] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setChartSize(window.innerWidth - 40);
      } else if (window.innerWidth < 1000) {
        setChartSize(window.innerWidth - 40);
      } else {
        setChartSize(600);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data = results.map((result) => {
    return {
      ...result,
      dollars: Math.round(result.totalPaymentValue / 100),
      percent: Math.round((result.totalPaymentValue / sumTotal) * 100),
    };
  });
  return (
    <ChartContainer height={400} >
      <PieChart width={280} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          nameKey="title"
          dataKey="percent"
        >
          {/* @ts-ignore */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default HoneymoonResultsChart;
