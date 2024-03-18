import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Point, TempPoint, TempIteration } from "@/types";
import BezierCurveChart from "@/components/BezierCurveChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InputPoints from "@/components/InputPoints";

const Main = () => {
  // For the input iteration value (using TempIteration to allow empty string when inputting)
  const [iteration, setIteration] = useState<TempIteration>("");

  // For the final iteration value (after validating and then converting the input iteration to number)
  const [iterationLevel, setIterationLevel] = useState<number>(0);

  // For max iteration value
  const [staticIteration, setStaticIteration] = useState(iterationLevel);

  // For the algorithm type
  const [algorithm, setAlgorithm] = useState<"brute" | "dnc">("brute");

  // For the input points (using TempPoint to allow empty string when inputting)
  // Set the initial value to 3 points with 0, 0
  const [points, setPoints] = useState<TempPoint[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  // For the final points (after validating and then converting the input points to number)
  const [finalPoints, setFinalPoints] = useState<Point[]>([]);

  const addPoint = () => {
    setPoints([...points, { x: 0, y: 0 }]);
  };
  const deletePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  // A function that used after validating the input points and iteration
  const convertPoints = () => {
    if (!isValidInput()) {
      console.error("Invalid input");
      // Throw error?
      return;
    }

    const newFinalPoints: Point[] = points.map(({ x, y }) => ({
      x: Number(x),
      y: Number(y),
    }));

    // Set all the final state for generating the curve
    setIterationLevel(Number(iteration));
    setFinalPoints(newFinalPoints);
    setStaticIteration(Number(iteration));
  };

  // Validate the input points and iteration
  const isValidInput = () => {
    for (const point of points) {
      if (
        typeof point.x !== "number" ||
        typeof point.y !== "number" ||
        isNaN(point.x) ||
        isNaN(point.y)
      ) {
        return false;
      }
    }
    // In this case, iteration must be a number and greater than 0
    if (typeof iteration !== "number" || isNaN(iteration) || iteration < 1) {
      return false;
    }
    return true;
  };

  // Handle input change for each point (can handle empty string for user experience)
  const handleInputChange = (
    index: number,
    field: "x" | "y",
    value: string
  ) => {
    const newPoints = [...points];
    newPoints[index][field] = value === "" ? "" : Number(value);
    setPoints(newPoints);
  };

  // Handle iteration change (can handle empty string for user experience)
  const handleIterationChange = (value: TempIteration) => {
    value = value === "" ? "" : Number(value);
    setIteration(value);
  };

  // TODO: Add the algorithm for divide and conquer
  // TODO: Add show the execution time

  return (
    <>
      <Card className="w-96">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>Bézier Curve</CardTitle>
          <CardDescription>
            <p>
              Input at least 3 points and the iteration to create bézier curve
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto max-h-96">
          {points.map((point, index) => (
            <InputPoints
              key={index}
              point={point}
              index={index}
              handleInputChange={handleInputChange}
              deletePoint={deletePoint}
              pointsLength={points.length}
            />
          ))}
          <div className="items-center flex justify-center">
            <div
              onClick={addPoint}
              className="cursor-pointer text-sm hover:underline"
            >
              Add more
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Drawer>
            <div className="flex justify-center items-center">
              <Input
                type="number"
                className="h-8 w-28 mr-2"
                placeholder="Iteration"
                value={iteration}
                onChange={(e) => handleIterationChange(e.target.value)}
              />

              <DropdownMenu>
                <DropdownMenuTrigger
                  disabled={!isValidInput()}
                  className="disabled:cursor-not-allowed"
                >
                  <Button
                    disabled={!isValidInput()}
                    className="h-8 w-16 py-5 px-10 disabled:cursor-not-allowed"
                  >
                    Curve it!
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Choose the Algorithm</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DrawerTrigger>
                    <DropdownMenuItem
                      onClick={() => {
                        convertPoints();
                        setAlgorithm("brute");
                      }}
                    >
                      Brute force
                    </DropdownMenuItem>
                  </DrawerTrigger>
                  <DrawerTrigger>
                    <DropdownMenuItem
                      onClick={() => {
                        convertPoints();
                        setAlgorithm("dnc");
                      }}
                    >
                      Divide and conquer
                    </DropdownMenuItem>
                  </DrawerTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {isValidInput() && (
              <DrawerContent className="h-5/6 flex items-center justify-center">
                <div className="w-3/4">
                  <DrawerHeader>
                    <DrawerTitle>
                      Bezier Curve Result (
                      {algorithm === "brute"
                        ? "Brute Force"
                        : "Divide and Conquer"}
                      )
                    </DrawerTitle>
                  </DrawerHeader>
                  <DrawerDescription>
                    <div className="w-full flex items-center justify-center">
                      <BezierCurveChart
                        controlPoints={finalPoints}
                        iteration={
                          algorithm === "brute"
                            ? iterationLevel + 1
                            : iterationLevel
                        }
                        algorithm={algorithm}
                      />
                    </div>
                  </DrawerDescription>
                  <DrawerFooter>
                    <Slider
                      defaultValue={[iterationLevel]}
                      max={staticIteration}
                      min={1}
                      step={1}
                      onValueChange={(value) => setIterationLevel(value[0])}
                    />
                    <span className="mb-4"></span>
                    {/* TODO: Add the execution time */}
                    <p>Execute time: ??? ms</p>
                    <DrawerClose>Close</DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            )}
          </Drawer>
        </CardFooter>
      </Card>
    </>
  );
};

export default Main;
