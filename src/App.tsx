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
import { Label } from "@/components/ui/label";
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
import { Point, TempPoint } from "@/types";
import BezierCurveChart from "@/components/BezierCurveChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TempIteration = number | string;

function App() {
  const [iteration, setIteration] = useState<TempIteration>("");
  const [iterationLevel, setIterationLevel] = useState<number>(0);
  const [staticIteration, setStaticIteration] = useState(iterationLevel);
  const [algorithm, setAlgorithm] = useState<"brute" | "dnc">("brute");
  const [points, setPoints] = useState<TempPoint[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const deletePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const [finalPoints, setFinalPoints] = useState<Point[]>([]);

  const convertPoints = () => {
    if (!isValidInput()) {
      console.error("Invalid input");
      return;
    }
    const newFinalPoints: Point[] = points.map(({ x, y }) => ({
      x: Number(x),
      y: Number(y),
    }));
    setIterationLevel(Number(iteration));
    setFinalPoints(newFinalPoints);
    setStaticIteration(Number(iteration));
  };

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
    if (typeof iteration !== "number" || isNaN(iteration) || iteration < 1) {
      return false;
    }
    return true;
  };

  const handleInputChange = (
    index: number,
    field: "x" | "y",
    value: string
  ) => {
    const newPoints = [...points];
    newPoints[index][field] = value === "" ? "" : Number(value);
    setPoints(newPoints);
  };

  const handleIterationChange = (value: TempIteration) => {
    value = value === "" ? "" : Number(value);
    setIteration(value);
  };

  const addPoint = () => {
    setPoints([...points, { x: 0, y: 0 }]);
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="flex items-center justify-between p-6">
          <div className="text-black text-2xl">Tucil 2 Stima</div>
          <div className="flex space-x-4">
            <a
              className="hover:underline"
              href="https://github.com/satriadhikara"
              target="_blank"
            >
              13522125
            </a>
            <a
              className="hover:underline"
              href="https://github.com/ChrisCS50X"
              target="_blank"
            >
              13522135
            </a>
          </div>
        </nav>
        <div className="flex items-center justify-center flex-grow">
          <Card className="w-96">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Bézier curve</CardTitle>
              <CardDescription>
                <p>Input at least 3 points to create a Bézier curve</p>
                <p>
                  NOTE: The iteration is exponential (in dnc algorithm), so it
                  may take a while to load
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto max-h-96">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center text-center mb-2 mt-1"
                >
                  <div>
                    <p className="text-xl mr-4 pt-1.5">{index + 1}.</p>
                  </div>
                  <Label htmlFor={`x${index}`} className="text-2xl mr-4">
                    x
                  </Label>
                  <Input
                    type="number"
                    id={`x${index}`}
                    className="w-20 text-base"
                    value={point.x}
                    onChange={(e) =>
                      handleInputChange(index, "x", e.target.value)
                    }
                  />
                  <Label htmlFor={`y${index}`} className="text-2xl mr-4 ml-4">
                    y
                  </Label>
                  <Input
                    type="number"
                    id={`y${index}`}
                    className="w-20 text-base"
                    value={point.y}
                    onChange={(e) =>
                      handleInputChange(index, "y", e.target.value)
                    }
                  />
                  <button
                    onClick={() => deletePoint(index)}
                    disabled={points.length <= 3}
                    className="ml-4 text-red-500 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
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
                    <DropdownMenuTrigger>
                      <Button
                        disabled={!isValidInput()}
                        className="h-8 w-16 py-5 px-10 disabled:cursor-not-allowed"
                      >
                        Curve it!
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        Choose the Algorithm
                      </DropdownMenuLabel>
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
                          {algorithm === "brute" ? (
                            <BezierCurveChart
                              controlPoints={finalPoints}
                              iteration={iterationLevel + 1}
                            />
                          ) : (
                            <div>
                              <p className="font-bold">divide and conquer</p>
                              <p>coming soon</p>
                            </div>
                          )}
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
                        <p>??? ms</p>
                        <DrawerClose>Close</DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                )}
              </Drawer>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
