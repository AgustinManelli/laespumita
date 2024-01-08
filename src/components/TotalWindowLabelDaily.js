import { FaTrash } from "react-icons/fa";
function TotalWindowLabel({ index, product, deleteStoredProduct }) {
  return (
    <div
      className={
        index % 2 === 0
          ? "totalWindowDailyLabel"
          : "totalWindowDailyLabel indexproductlabelpar"
      }
    >
      <p style={{ width: "50%" }}>$ {product.total}</p>
      <p style={{ width: "50%" }}>{product.date}</p>
      <button
        onClick={() => deleteStoredProduct(product.id, product)}
        className="totalWindowDailyDeleteButton"
      >
        <FaTrash className="totalWindowDailyDeleteIcon" />
      </button>
    </div>
  );
}

export default TotalWindowLabel;
