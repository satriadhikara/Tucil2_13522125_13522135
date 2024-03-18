import Navbar from "@/components/Navbar";
import Main from "@/components/Main";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex items-center justify-center flex-grow">
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
