import { useState } from "react";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
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
import { Point, TempPoint } from "./types";
import BezierCurveChart from "./components/BezierCurveChart";

function App() {
  const [iteration, setIteration] = useState(99);

  const [points, setPoints] = useState<TempPoint[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const [finalPoints, setFinalPoints] = useState<Point[]>([]);

  const convertPoints = () => {
    if (!isValidInput()) {
      console.error("Invalid input");
      return;
    }
    // Conversion logic here
    const newFinalPoints: Point[] = points.map(({ x, y }) => ({
      x: Number(x),
      y: Number(y),
    }));
    setFinalPoints(newFinalPoints);
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

  const addPoint = () => {
    setPoints([...points, { x: 0, y: 0 }]);
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="flex items-center justify-between p-6">
          <div className="text-black text-2xl">Tucil 2 Stima</div>
          <div className="flex space-x-4">
            <p>13522125 13522135</p>
          </div>
        </nav>
        <div className="flex items-center justify-center flex-grow">
          <Card className="w-96">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Bézier curve</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent className="overflow-auto max-h-96">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center text-center mb-2 mt-1"
                >
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
                <DrawerTrigger>
                  <Button onClick={convertPoints} disabled={!isValidInput()}>
                    Curve it!
                  </Button>
                </DrawerTrigger>
                {isValidInput() && (
                  <DrawerContent className="h-5/6 flex items-center justify-center">
                    <div className="w-3/4">
                      <DrawerHeader>
                        <DrawerTitle>Bezier Curve Result</DrawerTitle>
                      </DrawerHeader>
                      <DrawerDescription>
                        <div className="w-full flex items-center justify-center">
                          <BezierCurveChart
                            controlPoints={finalPoints}
                            iteration={iteration}
                          />
                        </div>
                      </DrawerDescription>
                      <DrawerFooter>
                        <Slider
                          defaultValue={[iteration]}
                          max={100}
                          min={1}
                          step={1}
                          onValueChange={(value) => setIteration(value[0])}
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
