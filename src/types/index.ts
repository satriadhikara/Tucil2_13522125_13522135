export type Point = {
  x: number;
  y: number;
};

export type TempPoint = {
  x: number | "";
  y: number | "";
};

export type TempIteration = number | string;

export type BezierCurveChartProps = {
  controlPoints: Point[];
  iteration: number;
};
