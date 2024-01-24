import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import ThemeProvider from "./context/ThemeProvider";

function App() {
  useEffect(() => {
    if (window.localStorage.getItem("products") === null) {
      window.localStorage.setItem("products", "[]");
    }
    if (window.localStorage.getItem("total") === null) {
      window.localStorage.setItem("total", "[]");
    }
    if (window.localStorage.getItem("mostPercent") === null) {
      window.localStorage.setItem("mostPercent", "[40,45,50,55,60,70]");
    }
    if (window.localStorage.getItem("percentStockist") === null) {
      window.localStorage.setItem("percentStockist", "[10.5,21]");
    }
  }, []);
  const [totalModal, setTotalModal] = useState(false);
  return (
    <ThemeProvider>
      <div className="App">
        <Toaster position="bottom-center" richColors />
        <div className="blurredbg"></div>
        <Home totalModal={totalModal} setTotalModal={setTotalModal} />
      </div>
    </ThemeProvider>
  );
}

export default App;
