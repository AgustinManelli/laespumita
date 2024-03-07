import styles from "./AddButtons.module.css";
import { useProduct } from "../../store/product";
import { AddIcon } from "../../icons/AddIcon/AddIcon";
import { DeleteIcon } from "../../icons/DeleteIcon/DeleteIcon";

function AddButtons() {
  const addProduct = useProduct((state) => state.AddProduct);
  const deleteAllProduct = useProduct((state) => state.DeleteAllProduct);
  const productList = useProduct((state) => state.productList);

  return (
    <section className={styles.addButtonsContainer}>
      <button
        id="btnAdd"
        onClick={() => {
          addProduct();
        }}
        className={styles.addButtonCircle}
      >
        <AddIcon />
      </button>
      <button
        onClick={() => {
          deleteAllProduct();
        }}
        className={
          productList.length === 0
            ? `${styles.addButtonCircle} ${styles.locked}`
            : styles.addButtonCircle
        }
      >
        <DeleteIcon
          width={"30px"}
          stroke={"rgb(255, 0, 0)"}
          strokeWith={"1.5"}
        />
      </button>
    </section>
  );
}

export default AddButtons;
