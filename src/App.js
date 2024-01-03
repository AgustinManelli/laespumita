import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

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
