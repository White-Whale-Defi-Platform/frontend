import React, { FC } from "react";
import {
  PieChart as PieChartComponent,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Props = {
  data: any;
};

const PieChart: FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChartComponent>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={85}
          outerRadius={95}
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
