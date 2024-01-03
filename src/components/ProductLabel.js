import "../stylesheets/ProductLabel.css";
import { CiTrash } from "react-icons/ci";
function ProductLabel({ total, number, id, product, deleteProduct }) {
  const handleDelete = () => {
    deleteProduct(id, product);
  };
  return (
    <div className="labelContainer">
      <div className="labelData">
        <p>Producto {number}</p>
        <p>${total}</p>
      </div>
      <div className="labelButtonContainer">
        <button onClick={handleDelete} className="labelButton">
          <CiTrash className="labelIcon" />
        </button>
      </div>
    </div>
  );
}

export default ProductLabel;
