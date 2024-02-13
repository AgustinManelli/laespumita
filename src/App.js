import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import { useEffect } from "react";
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
    if (window.localStorage.getItem("theme") === null) {
      window.localStorage.setItem("theme", "dark");
    }
    if (window.localStorage.getItem("monthly") === null) {
      window.localStorage.setItem("monthly", "[]");
    }
  }, []);
  return (
    <ThemeProvider>
      <div className="App">
        <Toaster position="bottom-center" richColors />
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
