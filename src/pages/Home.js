import "./Home.css";
import { useTheme } from "../context/ThemeProvider";
import { useInputs } from "../store/inputs";
import { useProduct } from "../store/product";
import AddButtons from "../components/AddButtons/AddButtons";
import Calculator from "../components/Calculator/Calculator";
import ListProducts from "../components/ListProduct/ListProducts";
import TotalLabel from "../components/TotalLabel/TotalLabel";
import TotalWindow from "../components/TotalWindow/TotalWindow";
import Navbar from "../components/Navbar/Navbar";
import ConfigWindow from "../components/ConfigWindow/ConfigWindow";
import AboutWindow from "../components/AboutWindow/AboutWindow";

function Home() {
  const { theme } = useTheme();
  const isCard = useInputs((state) => state.isCard);
  const addProduct = useProduct((state) => state.AddProduct);

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      addProduct();
    }
  };

  return (
    <div
      className="homeContainer"
      style={{
        backgroundColor: theme.background,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <div className={isCard ? "blurredbg blurredbgact" : "blurredbg"}></div>

      <Navbar />
      <Calculator handleEnterKeyPress={handleEnterKeyPress} />
      <AddButtons />
      <ListProducts />
      <TotalLabel />
      <TotalWindow />
      <ConfigWindow />
      <AboutWindow />
    </div>
  );
}

export default Home;
