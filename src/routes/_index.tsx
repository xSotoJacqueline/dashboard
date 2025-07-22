import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      </header>
      
      <div className="justify-center items-center h-full">
        <Link className={buttonVariants({ variant: "link" })} to="/retiros">Retiros</Link>
      </div>
    </div>
  );
}

export default App;
