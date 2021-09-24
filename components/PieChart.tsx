import React, { FC } from "react";
import {
  PieChart as PieChartComponent,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Props = {
  data: any;
  innerRadius?: number;
  outerRadius?: number;
};

const PieChart: FC<Props> = ({ data, innerRadius = 60, outerRadius = 80 }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChartComponent>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          // cx="50%"
          // cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        >
          {data.map((entry, index) => {
            return (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            );
          })}
        </Pie>
      </PieChartComponent>
    </ResponsiveContainer>
  );
};

export default PieChart;
