import logo from "../assets/logo.svg";
import "../stylesheets/Navbar.css";
import ConfigDropdown from "./ConfigDropdown";
import { useTheme } from "../context/ThemeProvider";

function Navbar({
  totalModal,
  setTotalModal,
  isMostPercentCache,
  setIsMostPercentCache,
  isPercentStockist,
  setIsPercentStockist,
  handlDeleteAll,
  handlDeleteTotal,
}) {
  const { theme } = useTheme();
  const AnalyticsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="navbarOpenModalIcon"
      data-src="/icons/analytics-01-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      style={{
        stroke: totalModal ? "#008fd2" : theme.stroke,
        transform: totalModal ? "scale(110%)" : "none",
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
  const handleOpenModal = () => {
    setTotalModal(true);
  };
  return (
    <div className="navbarFix">
      <nav
        className="navbarContainer"
        style={{
          backgroundColor: theme.backgroundContainer,
          boxShadow: theme.boxShadow,
        }}
      >
        <div>
          <img src={logo} alt="la espumita logo" className="logoNavbar" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={handleOpenModal} className="navbarOpenModal">
            <AnalyticsIcon />
          </button>
          <ConfigDropdown
            isMostPercentCache={isMostPercentCache}
            setIsMostPercentCache={setIsMostPercentCache}
            isPercentStockist={isPercentStockist}
            setIsPercentStockist={setIsPercentStockist}
            handlDeleteAll={handlDeleteAll}
            handlDeleteTotal={handlDeleteTotal}
          />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
