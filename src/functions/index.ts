import { Point } from "../types";

function generatePascalTriangle(numRows: number) {
  const triangle = [];

  for (let i = 0; i < numRows; i++) {
    const row: number[] = [];
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
): Point[] => {
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
): Point[] => {
  const points = [];
  const n = controlPoints.length - 1;
  const pascalTriangle = generatePascalTriangle(n + 1); // Generate one more row

  for (let i = 0; i <= iteration; i++) {
    const point = { x: 0, y: 0 };
    const t = i / iteration;

    for (let j = 0; j <= n; j++) {
      const b = pascalTriangle[n][j] * Math.pow(1 - t, n - j) * Math.pow(t, j);
      point.x += b * controlPoints[j].x;
      point.y += b * controlPoints[j].y;
    }

    points.push(point);
  }

  return points;
};

export { generateBezierCurve3Points, generateBezierCurveNPoints };