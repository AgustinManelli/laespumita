import { CiCirclePlus, CiTrash } from "react-icons/ci";
import "../stylesheets/AddButtons.css";
import { useEffect } from "react";
function AddButtons({ addProduct, deleteAllProduct }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addProduct();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [addProduct]);
  return (
    <section className="addButtonsContainer">
      <button id="btnAdd" onClick={addProduct} className="addButtonCircle">
        <CiCirclePlus className="addCircle" />
      </button>
      <button onClick={deleteAllProduct} className="addButtonCircle">
        <CiTrash className="deleteCircle" />
      </button>
    </section>
  );
}

export default AddButtons;
