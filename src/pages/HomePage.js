import styles from "./HomePage.module.css";

/* THEME PROVIDER & ZUSTAND GLOBAL STATES */
import { useTheme } from "../context/ThemeProvider";
import { useInputs } from "../store/inputs";

/* COMPONENTS IMPORTS */
import Navbar from "../components/Navbar/Navbar";
import Calculator from "../components/Calculator/Calculator";
import AddButtons from "../components/AddButtons/AddButtons";
import ListProducts from "../components/ListProduct/ListProducts";
import TotalLabel from "../components/TotalLabel/TotalLabel";
import TotalWindow from "../components/TotalWindow/TotalWindow";
import ConfigWindow from "../components/ConfigWindow/ConfigWindow";
import AboutWindow from "../components/AboutWindow/AboutWindow";

function Home() {
  //THEME
  const { theme } = useTheme();

  //GLOBAL STATES
  const isCard = useInputs((state) => state.isCard);

  return (
    <main
      className={styles.homeContainer}
      style={{
        backgroundColor: theme.background,
      }}
    >
      <div
        className={
          isCard
            ? `${styles.blurredbg} ${styles.blurredbgact}`
            : styles.blurredbg
        }
      ></div>

      <Navbar />
      <Calculator />
      <AddButtons />
      <ListProducts />
      <TotalLabel />
      <TotalWindow />
      <ConfigWindow />
      <AboutWindow />
    </main>
  );
}

export default Home;
