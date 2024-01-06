import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    if (window.localStorage.getItem("products") === null) {
      window.localStorage.setItem("products", "[]");
    }
    if (window.localStorage.getItem("total") === null) {
      window.localStorage.setItem("total", "[]");
    }
  }, []);
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
