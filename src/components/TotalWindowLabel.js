import { FaTrash } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import "../stylesheets/TotalWindowLabel.css";
import { useState } from "react";
function TotalWindowLabel({ index, product, deleteStoredProduct }) {
  const [isClassAdded, setClassAdded] = useState(false);
  const handleCheckboxClick = () => {
    // Cambiar el estado para alternar la clase
    setClassAdded(!isClassAdded);
  };
  return (
    <>
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
        <label className="labelHiddenSwitch">
          <input
            className="hiddenSwitch"
            type="checkbox"
            id={product.id + 1}
            onClick={handleCheckboxClick}
          ></input>
          <FaAngleDown
            className={
              isClassAdded
                ? product.productsList.length > 0
                  ? "hiddenSwitchIcon actHiddenIcon"
                  : "hiddenSwitchIcon"
                : "hiddenSwitchIcon"
            }
          />
        </label>
      </div>
      <div
        className={
          isClassAdded ? "hiddenTotalWindowActived" : "hiddenTotalWindow"
        }
      >
        {product.productsList.map((list, index) => (
          <div
            key={list.id}
            style={{ backgroundColor: "rgb(0, 143, 210,0.2)" }}
          >
            <p>
              venta {index + 1}: {list.total}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TotalWindowLabel;
