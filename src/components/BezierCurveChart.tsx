import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { BezierCurveChartProps } from "@/types";
import {
  generateBezierCurve3Points,
  generateBezierCurveNPoints,
} from "@/functions";
import { ChartOptions } from "chart.js";

const BezierCurveChart = ({
  controlPoints,
  iteration,
}: BezierCurveChartProps) => {
  // Generate the curve points
  let curvePoints;
  if (controlPoints.length === 3) {
    curvePoints = generateBezierCurve3Points(controlPoints, iteration);
  } else {
    curvePoints = generateBezierCurveNPoints(controlPoints, iteration);
  }

  // Chart.js data and options
  const data = {
    datasets: [
      {
        label: "Bezier Curve",
        data: curvePoints,
        borderColor: "rgba(0,0,0,1)",
        tension: 0,
        fill: false,
        pointRadius: 3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
    animation: {
      easing: "linear",
    },
  };

  return <Line data={data} options={options} />;
};

export default BezierCurveChart;
