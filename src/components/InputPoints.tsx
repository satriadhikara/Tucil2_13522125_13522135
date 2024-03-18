import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PointInputProps } from "@/types";

const InputPoints = ({
  point,
  index,
  handleInputChange,
  deletePoint,
  pointsLength,
}: PointInputProps) => (
  <div className="flex justify-center items-center text-center mb-2 mt-1">
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
      onChange={(e) => handleInputChange(index, "x", e.target.value)}
    />
    <Label htmlFor={`y${index}`} className="text-2xl mr-4 ml-4">
      y
    </Label>
    <Input
      type="number"
      id={`y${index}`}
      className="w-20 text-base"
      value={point.y}
      onChange={(e) => handleInputChange(index, "y", e.target.value)}
    />
    <button
      onClick={() => deletePoint(index)}
      disabled={pointsLength <= 3}
      className="ml-4 text-red-500 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
      Delete
    </button>
  </div>
);

export default InputPoints;
