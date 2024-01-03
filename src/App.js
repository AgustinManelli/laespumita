import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import TotalLabel from "./components/TotalLabel";

function App() {
  return (
    <div className="App">
      <div className="blurredbg"></div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
