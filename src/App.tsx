import { useState } from "react";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [points, setPoints] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const handleInputChange = (
    index: number,
    field: "x" | "y",
    value: number
  ) => {
    const newPoints = [...points];
    newPoints[index][field] = value;
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
                  className="flex justify-center items-center text-center mb-2"
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
                      handleInputChange(index, "x", Number(e.target.value))
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
                      handleInputChange(index, "y", Number(e.target.value))
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
              <Button>Curve it!</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
