import BezierCurveChart from "./components/BezierCurveChart";

function App() {
  const controlPoints = [
    { x: 0, y: 0 }, // P0
    { x: 1, y: 3 }, // P1 Control
    { x: 4, y: 0 }, // P2
    // { x: 2, y: 2 },
  ];

  return (
    <div className="h-screen w-auto bg-slate-900">
      <section className="w-1/2 h-3/4">
        <BezierCurveChart controlPoints={controlPoints} numPoints={7} />
      </section>
      <section></section>
    </div>
  );
}

export default App;
