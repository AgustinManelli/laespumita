import { useTheme } from "../../../context/ThemeProvider";
import { useStoredProducts } from "../../../store/storedProducts";
import { DeleteIcon } from "../../../icons/DeleteIcon/DeleteIcon";

function TotalWindowLabel({ product }) {
  const { theme } = useTheme();

  const deleteStoredProduct = useStoredProducts(
    (state) => state.DeleteStoredProduct
  );

  return (
    <div
      className="totalWindowDailyLabel"
      style={{ backgroundColor: theme.button }}
    >
      <p style={{ width: "50%", color: theme.text }}>${product.total}</p>
      <p style={{ width: "50%", color: theme.text }}>{product.date}</p>
      <button
        onClick={() => deleteStoredProduct(product.id, product)}
        className="totalWindowDailyDeleteButton"
      >
        <DeleteIcon
          width={"17px"}
          stroke={theme.placeholder}
          strokeWith={"1.5"}
        />
      </button>
    </div>
  );
}

export default TotalWindowLabel;
