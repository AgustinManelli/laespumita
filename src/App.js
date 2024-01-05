import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster, toast } from "sonner";
import { useState } from "react";

function App() {
  const [totalModal, setTotalModal] = useState(false);
  return (
    <div className="App">
      <Toaster position="bottom-center" richColors />
      <div className="blurredbg"></div>
      <Navbar setTotalModal={setTotalModal} />
      <Home totalModal={totalModal} setTotalModal={setTotalModal} />
    </div>
  );
}

export default App;
