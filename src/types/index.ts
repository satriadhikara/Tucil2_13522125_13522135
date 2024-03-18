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
  algorithm: "brute" | "dnc";
};

export type PointInputProps = {
  point: TempPoint;
  index: number;
  handleInputChange: (index: number, field: "x" | "y", value: string) => void;
  deletePoint: (index: number) => void;
  pointsLength: number;
};
