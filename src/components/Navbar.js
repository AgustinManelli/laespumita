import logo from "../assets/logo.svg";
import "../stylesheets/Navbar.css";
import { FaDollarSign } from "react-icons/fa6";

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
          <FaDollarSign className="navbarOpenModalIcon" />
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
