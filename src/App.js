import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster, toast } from "sonner";

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-center" richColors />
      <div className="blurredbg"></div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
