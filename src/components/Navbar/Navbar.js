import styles from "./Navbar.module.css";
//SRC
import logo from "../../assets/logo.svg";
//COMPONENT IMPORT
import ConfigDropdown from "../ConfigDropdown/ConfigDropdown";
//THEME PROVIDER & GLOBAL STATES
import { useTheme } from "../../context/ThemeProvider";
import { useModal } from "../../store/modal";

const AnalyticsIcon = ({ theme, totalModal }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={styles.navbarOpenModalIcon}
    data-src="/icons/analytics-01-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{
      stroke: totalModal ? "#008fd2" : theme.placeholder,
    }}
  >
    <path
      d="M7 17L7 13"
      strokeLinecap="round"
      className="navbarOpenModalIconLine"
    ></path>
    <path
      d="M12 17L12 7"
      strokeLinecap="round"
      className="navbarOpenModalIconLine"
      style={{ animationDelay: "0.2s" }}
    ></path>
    <path
      d="M17 17L17 11"
      strokeLinecap="round"
      className="navbarOpenModalIconLine"
      style={{ animationDelay: "0.4s" }}
    ></path>
    <path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      strokeLinejoin="round"
    ></path>
  </svg>
);

function Navbar() {
  const { theme } = useTheme();
  //GLOBAL STATES
  const totalModal = useModal((state) => state.totalModal);
  const setTotalModal = useModal((state) => state.setTotalModal);

  const handleOpenModal = () => {
    setTotalModal(true);
  };

  return (
    <div className={styles.navbarFix}>
      <nav
        className={styles.navbarContainer}
        style={{
          backgroundColor: theme.backgroundContainer,
          boxShadow: theme.boxShadow,
        }}
      >
        <img src={logo} alt="la espumita logo" className={styles.logoNavbar} />
        <section className={styles.buttonSectionNavbar}>
          <button onClick={handleOpenModal} className={styles.navbarOpenModal}>
            <AnalyticsIcon theme={theme} totalModal={totalModal} />
          </button>
          <ConfigDropdown />
        </section>
      </nav>
    </div>
  );
}

export default Navbar;
