import { useTheme } from "../../../context/ThemeProvider";
import { useStoredProducts } from "../../../store/storedProducts";
import { DeleteIcon } from "../../../icons/DeleteIcon/DeleteIcon";

function TotalWindowMonthly({ product }) {
  const { theme } = useTheme();

  const deleteStoredMonthly = useStoredProducts(
    (state) => state.DeleteStoredMonthly
  );

  return (
    <div
      className="totalWindowDailyLabel"
      style={{ backgroundColor: theme.button }}
    >
      <p style={{ width: "50%", color: theme.text }}>$ {product.total}</p>
      <p style={{ width: "50%", color: theme.text }}>{product.date}</p>
      <button
        onClick={() => deleteStoredMonthly(product.id, product)}
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

export default TotalWindowMonthly;
