import React, { FC } from "react";
import {
  LineChart as LineChartComponent,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  data: any;
  onValueChange?: (value: number) => void;
  onMouseLeave?: () => void;
};

const LineChart: FC<Props> = ({ data, onValueChange, onMouseLeave }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChartComponent
        data={data}
        onMouseMove={(props) => {
          if (props?.activePayload?.[0]) {
            onValueChange?.(props?.activePayload?.[0]?.value);
          }
        }}
        onMouseLeave={() => {
          onMouseLeave?.();
        }}
      >
        <CartesianGrid vertical={false} stroke="#252525" />
        <Line dataKey="value" stroke="#3CCD64" strokeWidth={2} dot={false} />
        <XAxis
          dataKey="name"
          padding={{ left: 35, right: 35 }}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "rgba(255, 255, 255, 0.6)" }}
        />
        <Tooltip cursor={false} content={() => null} />
      </LineChartComponent>
    </ResponsiveContainer>
  );
};

export default LineChart;
