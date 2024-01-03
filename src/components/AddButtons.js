import { CiCirclePlus } from "react-icons/ci";
import "../stylesheets/AddButtons.css";
function AddButtons({ addProduct }) {
  return (
    <>
      <button onClick={addProduct} className="addButtonCircle">
        <CiCirclePlus className="addCircle" />
      </button>
    </>
  );
}

export default AddButtons;
