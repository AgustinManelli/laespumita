import { CiCirclePlus, CiTrash } from "react-icons/ci";
import "../stylesheets/AddButtons.css";
function AddButtons({ addProduct, deleteAllProduct }) {
  return (
    <section className="addButtonsContainer">
      <button onClick={addProduct} className="addButtonCircle">
        <CiCirclePlus className="addCircle" />
      </button>
      <button onClick={deleteAllProduct} className="addButtonCircle">
        <CiTrash className="deleteCircle" />
      </button>
    </section>
  );
}

export default AddButtons;
