import logo from "../assets/logo.svg";
import "../stylesheets/Navbar.css";
import { FiDollarSign } from "react-icons/fi";

function Navbar({ setTotalModal }) {
  const handleOpenModal = () => {
    setTotalModal(true);
  };
  return (
    <div className="navbarFix">
      <nav className="navbarContainer">
        <div>
          <img src={logo} alt="la espumita logo" className="logoNavbar" />
        </div>
        <button onClick={handleOpenModal} className="navbarOpenModal">
          <FiDollarSign className="navbarOpenModalIcon" />
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
