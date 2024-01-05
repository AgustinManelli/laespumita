import "../stylesheets/TotalWindow.css";
import { FiX } from "react-icons/fi";
function TotalWindow({ totalModal, setTotalModal }) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const handleClose = () => {
    setTotalModal(false);
  };
  return (
    <section
      className={
        totalModal ? "totalWindowContainer" : "totalWindowContainerHidden"
      }
    >
      <div className="totalWindowModal">
        <nav className="totalWindowNavbar">
          <p>Resumen de ventas: {formattedDate}</p>
          <button onClick={handleClose} className="totalWindowNavbarButton">
            <FiX className="totalWindowNavbarX" />
          </button>
        </nav>
        <div className="totalWindowContent">
          <section className="totalWindowContentSelector">
            <button className="totalWindowContentSelectorButton">
              Venta diaria
            </button>
            <button className="totalWindowContentSelectorButton">
              Ventas totales
            </button>
          </section>
        </div>
      </div>
    </section>
  );
}

export default TotalWindow;
