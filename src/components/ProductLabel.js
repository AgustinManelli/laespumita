import "../stylesheets/ProductLabel.css";
import { CiTrash } from "react-icons/ci";
function ProductLabel({ total, number }) {
  return (
    <div className="labelContainer">
      <div className="labelData">
        <p>Producto {number}</p>
        <p>${total}</p>
      </div>
      <div className="labelButton">
        <CiTrash className="labelIcon" />
      </div>
    </div>
  );
}

export default ProductLabel;
