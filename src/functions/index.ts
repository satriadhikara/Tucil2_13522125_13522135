import { Point } from "@/types";

// Function for generate pascal triangle for brute force n points
const generatePascalTriangle = (numRows: number) => {
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
};

// Function for generate bezier curve for 3 points (using bezier quadratic formula)
const generateBezierCurve3Points = (
  controlPoints: Point[],
  iterationLevel: number
) => {
  const points = [];
  const steps = Math.pow(2, iterationLevel) + 1;

  for (let i = 0; i <= steps - 1; i++) {
    const t = i / (steps - 1);
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

// Function for generate bezier curve for n points (using pascal triangle)
const generateBezierCurveNPoints = (
  controlPoints: Point[],
  iterationLevel: number
) => {
  const points = [];
  const n = controlPoints.length - 1;
  const pascalTriangle = generatePascalTriangle(n + 1);
  const steps = Math.pow(2, iterationLevel) + 1;

  for (let i = 0; i <= steps - 1; i++) {
    const point = { x: 0, y: 0 };
    const t = i / (steps - 1);
    for (let j = 0; j <= n; j++) {
      const b = pascalTriangle[n][j] * Math.pow(1 - t, n - j) * Math.pow(t, j);
      point.x += b * controlPoints[j].x;
      point.y += b * controlPoints[j].y;
    }

    points.push(point);
  }

  return points;
};

// Fungsi untuk yang 3 titik doang
// Inggris-in chris biar sama semua
function divideConquerBezier3Points(
  control1: Point,
  control2: Point,
  control3: Point,
  banyakiterasi: number
) {
  const bezierPoints = [];
  bezierPoints.push(control1);
  isiTitikCurve(bezierPoints, control1, control2, control3, 0, banyakiterasi);
  bezierPoints.push(control3);
  return bezierPoints;
}

function isiTitikCurve(
  bezierPoints: Point[],
  control1: Point,
  control2: Point,
  control3: Point,
  iterasi: number,
  banyakiterasi: number
) {
  if (iterasi < banyakiterasi) {
    const titikTengah1 = cariTitikTengah(control1, control2);
    const titikTengah2 = cariTitikTengah(control2, control3);
    const titikTengah3 = cariTitikTengah(titikTengah1, titikTengah2);
    iterasi++;
    isiTitikCurve(
      bezierPoints,
      control1,
      titikTengah1,
      titikTengah3,
      iterasi,
      banyakiterasi
    );
    bezierPoints.push(titikTengah3);
    isiTitikCurve(
      bezierPoints,
      titikTengah3,
      titikTengah2,
      control3,
      iterasi,
      banyakiterasi
    );
  }
}

function cariTitikTengah(controlPoint1: Point, controlPoint2: Point) {
  return {
    x: (controlPoint1.x + controlPoint2.x) / 2,
    y: (controlPoint1.y + controlPoint2.y) / 2,
  };
}

function divideAndConquerBezier(points: Point[], t: number) {
  if (points.length === 1) {
    return points[0];
  }

  const newPoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    const x = (1 - t) * points[i].x + t * points[i + 1].x;
    const y = (1 - t) * points[i].y + t * points[i + 1].y;
    newPoints.push({ x, y });
  }

  return divideAndConquerBezier(newPoints, t);
}

const divideAndConquerBezierNPoints = (
  controlPoints: Point[],
  iteration: number
) => {
  const points = [];
  const stepSize = 1 / Math.pow(2, iteration);
  for (let t = 0; t <= 1; t += stepSize) {
    const point = divideAndConquerBezier(controlPoints, t);
    points.push({ x: point.x, y: point.y });
  }

  return points;
};

export {
  generateBezierCurve3Points,
  generateBezierCurveNPoints,
  divideAndConquerBezierNPoints,
  divideConquerBezier3Points,
};
