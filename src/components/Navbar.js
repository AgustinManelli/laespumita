import logo from "../assets/logo.svg";
import "../stylesheets/Navbar.css";

function Navbar() {
  return (
    <div className="navbarFix">
      <nav className="navbarContainer">
        <div>
          <img src={logo} alt="la espumita logo" className="logoNavbar" />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
