import { FaArrowRotateLeft } from "react-icons/fa6";
import "../stylesheets/DeleteAllParameters.css";
function DeleteAllParameters({ setStoredTotal, setStoredProducts }) {
  const handlReset = () => {
    if (window.confirm("¿Seguro que quieres resetear todos los datos?")) {
      localStorage.setItem("total", "[]");
      localStorage.setItem("products", "[]");
      setStoredTotal([]);
      setStoredProducts([]);
      alert("Todos los datos se resetearon correctamente.");
    } else {
    }
  };
  return (
    <div className="deleteAllParametersContainer">
      <button className="deleteAllParametersButton" onClick={handlReset}>
        <FaArrowRotateLeft className="deleteAllParametersIcon" />
      </button>
    </div>
  );
}

export default DeleteAllParameters;
