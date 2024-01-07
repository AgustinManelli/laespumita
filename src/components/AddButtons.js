import { FaCirclePlus, FaTrash } from "react-icons/fa6";
import "../stylesheets/AddButtons.css";
import { useEffect } from "react";
function AddButtons({ addProduct, deleteAllProduct, productList }) {
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
        <FaCirclePlus className="addCircle" />
      </button>
      <button
        onClick={deleteAllProduct}
        className={
          productList.length === 0
            ? "addButtonCircle locked"
            : "addButtonCircle"
        }
      >
        <FaTrash className="deleteCircle" />
      </button>
    </section>
  );
}

export default AddButtons;
