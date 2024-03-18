import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { BezierCurveChartProps } from "@/types";
import {
  generateBezierCurve3Points,
  generateBezierCurveNPoints,
  divideConquerBezier3Points,
  divideAndConquerBezierNPoints,
} from "@/functions";
import { ChartOptions } from "chart.js";

const BezierCurveChart = ({
  controlPoints,
  iteration,
  algorithm,
}: BezierCurveChartProps) => {
  let curvePoints;
  if (algorithm === "brute") {
    // Generate the curve points using brute force algorithm
    if (controlPoints.length === 3) {
      curvePoints = generateBezierCurve3Points(controlPoints, iteration);
    } else {
      curvePoints = generateBezierCurveNPoints(controlPoints, iteration);
    }
  } else {
    // Generate the curve points using divide and conquer algorithm
    if (controlPoints.length === 3) {
      curvePoints = divideConquerBezier3Points(
        controlPoints[0],
        controlPoints[1],
        controlPoints[2],
        iteration
      );
    } else {
      curvePoints = divideAndConquerBezierNPoints(controlPoints, iteration);
    }
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
      {
        label: "Control Points",
        data: controlPoints,
        borderColor: "rgba(170,170,170,0.5)",
        backgroundColor: "rgba(170,170,170,0.3)",
        pointRadius: 5,
        fill: false,
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
    animation: false,
  };

  return <Line data={data} options={options} />;
};

export default BezierCurveChart;
