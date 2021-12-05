import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { COLORS } from "./helpers";
import styled from "styled-components";
import { HoneymoonResultsProps } from "./index";
const ChartContainer = styled(ResponsiveContainer)`
  width: 100%;
  min-width: 300px;
  min-height: 400px;
  height: 100%;
  margin: 0 auto;
`;

const HoneymoonResultsChart = ({ results, sumTotal }: HoneymoonResultsProps) => {
  const data = results.map((result) => {
    return {
      ...result,
      dollars: Math.round(result.totalPaymentValue / 100),
      percent: Math.round((result.totalPaymentValue / sumTotal) * 100),
    };
  });
  return (
    <ChartContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ value, name }) => `${name} - ${value}%`}
          outerRadius={80}
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
