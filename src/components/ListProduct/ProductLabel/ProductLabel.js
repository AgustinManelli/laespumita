import "./ProductLabel.css";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeProvider";
import { useProduct } from "../../../store/product";
import { DeleteIcon } from "../../../icons/DeleteIcon/DeleteIcon";

// const DeleteIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     className="labelIcon"
//     data-src="/icons/delete-01-stroke-rounded.svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     role="img"
//   >
//     <path
//       d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
//       strokeLinecap="round"
//     ></path>
//     <path
//       d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
//       strokeLinecap="round"
//       className="labelIconLid"
//     ></path>
//   </svg>
// );

function ProductLabel({ total, number, id, product }) {
  const { theme } = useTheme();

  const deleteProduct = useProduct((state) => state.DeleteProduct);

  const handleDelete = () => {
    deleteProduct(id, product);
  };

  return (
    <motion.div
      className="labelContainer"
      layout
      initial={{ rotate: 5, scale: 0.5, opacity: 0, filter: "blur(5px)" }}
      animate={{ rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
      exit={{
        rotate: 0,
        scale: 0.5,
        opacity: 0,
        filter: "blur(5px)",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
    >
      <div
        className="labelDataContainer"
        style={{
          backgroundColor: theme.button,
          borderColor: theme.borderColor,
        }}
      >
        <div className="labelData" style={{ color: theme.placeholder }}>
          <p>Producto {number}</p>
          <p>${total}</p>
        </div>
      </div>
      <div className="labelButtonContainer">
        <button onClick={handleDelete} className="labelButton">
          <DeleteIcon
            width={"20px"}
            stroke={theme.placeholder}
            strokeWith={"1.5"}
          />
        </button>
      </div>
    </motion.div>
  );
}

export default ProductLabel;
