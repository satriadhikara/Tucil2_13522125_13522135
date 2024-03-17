import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Point } from "@/types";

import { ChartOptions } from "chart.js";

type BezierCurveChartProps = {
  controlPoints: Point[];
  iteration: number;
};

const BezierCurveChart = ({
  controlPoints,
  iteration,
}: BezierCurveChartProps) => {
  function generatePascalTriangle(numRows: number) {
    const triangle: number[][] = [];

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j <= i; j++) {
        if (j === 0 || j === i) {
          row.push(1);
        } else {
          row.push(triangle[i - 1][j - 1] + triangle[i - 1][j]);
        }
      }
      triangle.push(row);
    }

    return triangle;
  }

  const generateBezierCurve3Points = (
    controlPoints: Point[],
    iteration: number
  ) => {
    const points = [];

    for (let i = 0; i <= iteration; i++) {
      const t = i / iteration;
      const x =
        Math.pow(1 - t, 2) * controlPoints[0].x +
        2 * (1 - t) * t * controlPoints[1].x +
        Math.pow(t, 2) * controlPoints[2].x;
      const y =
        Math.pow(1 - t, 2) * controlPoints[0].y +
        2 * (1 - t) * t * controlPoints[1].y +
        Math.pow(t, 2) * controlPoints[2].y;
      points.push({ x, y });
    }

    return points;
  };

  const generateBezierCurveNPoints = (
    controlPoints: Point[],
    iteration: number
  ) => {
    const points = [];
    const n = controlPoints.length - 1;
    const pascalTriangle = generatePascalTriangle(n + 1); // Generate one more row

    for (let i = 0; i <= iteration; i++) {
      const point = { x: 0, y: 0 };
      const t = i / iteration;

      for (let j = 0; j <= n; j++) {
        const b =
          pascalTriangle[n][j] * Math.pow(1 - t, n - j) * Math.pow(t, j);
        point.x += b * controlPoints[j].x;
        point.y += b * controlPoints[j].y;
      }

      points.push(point);
    }

    return points;
  };

  let curvePoints;
  if (controlPoints.length === 3) {
    curvePoints = generateBezierCurve3Points(controlPoints, iteration);
  } else {
    curvePoints = generateBezierCurveNPoints(controlPoints, iteration);
  }

  const data = {
    datasets: [
      {
        label: "Bezier Curve",
        data: curvePoints,
        borderColor: "rgba(0,0,0,1)",
        tension: 0,
        fill: false,
        pointRadius: 3, // Hide points
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
  };

  return <Line data={data} options={options} />;
};

export default BezierCurveChart;
