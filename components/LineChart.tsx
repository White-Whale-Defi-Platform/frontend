import React, { FC, useRef , useEffect, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: any;
};

const LineChart: FC<Props> = ({ data }) => {
  
  const [width, setWidth] = useState<number>(window.innerWidth);
  const tooltipRef = useRef();

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  const isMobile = width <= 768;

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

  const options = {
    tension: 0.3,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function ({ tooltip }) {
          let element: any = tooltipRef.current!;

          // Create element on first render
          if (tooltip.opacity === 0) {
            element.style.opacity = "0";
            return;
          }

          const value = element.querySelector(".value");

          if (value) {
            try {
              const item = tooltip.dataPoints[0];
              value.innerHTML = item.raw;
            } catch {}
          }

          element.style.opacity = "1";
          element.style.transform = `translate(${tooltip.caretX}px, ${tooltip.caretY}px)`;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          font: {
            size: 14,
          },
          color: "rgba(255,255,255,0.6)",
        },
      },
      y: {
        grace: "50%",
        display: true,
        ticks: {
          display: false,
        },
        grid: {
          drawTicks: false,
          display: true,
          drawBorder: false,
          color: "#252525",
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

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

  const formattedDataMobile = {
    labels: data.map((data) => data.label).slice(-5),
    datasets: [
      {
        data: data.map((data) => data.value).slice(-5),
        fill: false,
        backgroundColor: "#3CCD64",
        borderColor: "#3CCD64",
      },
    ],
  };
   

  return (
    <Box position="relative" h="full">
      <Line data={ isMobile ? formattedDataMobile : formattedData} options={options} />
      <Box
        ref={tooltipRef}
        position="absolute"
        pointerEvents="none"
        opacity="0"
        left="0"
        top="0"
        transition="opacity 0.1s ease-out, transform 0.2s ease-in-out"
      >
        <Box
          bg="blackAlpha.700"
          color="brand.500"
          px="4"
          py="2"
          borderRadius="full"
          transform="translate(-50%, -70px)"
        >
          <Box>
            <Text as="span" fontWeight="500" className="value" />{" "}
            <Text as="span" fontSize="xs">
              UST
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LineChart;
