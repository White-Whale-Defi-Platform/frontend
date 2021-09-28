import React, { FC } from "react";
import { Line } from "react-chartjs-2";

type Props = {
  data: any;
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        font: {
          size: 16,
        },
        color: "rgba(255,255,255,0.6)",
      },
    },
    y: {
      grace: 5,
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const LineChart: FC<Props> = ({ data }) => {
  const formattedData = {
    labels: data.map((data) => data.label),
    datasets: [
      {
        data: data.map((data) => data.value),
        fill: false,
        backgroundColor: "#3CCD64",
        borderColor: "#3CCD64",
      },
    ],
  };

  return <Line data={formattedData} options={options} />;
};

export default LineChart;
