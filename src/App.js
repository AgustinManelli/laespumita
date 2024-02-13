import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import { useEffect } from "react";
import ThemeProvider from "./context/ThemeProvider";
import { useStoredProducts } from "./store/storedProducts";

function App() {
  const initialSale = useStoredProducts((state) => state.InitialSale);
  useEffect(() => {
    initialSale();
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
