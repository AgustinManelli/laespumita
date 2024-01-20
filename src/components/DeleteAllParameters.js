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
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        opacity: "0.2",
        zIndex: "100",
      }}
    >
      <button
        style={{
          border: "none",
          backgroundColor: "none",
          cursor: "pointer",
        }}
        onClick={handlReset}
      >
        <FaArrowRotateLeft />
      </button>
    </div>
  );
}

export default DeleteAllParameters;
