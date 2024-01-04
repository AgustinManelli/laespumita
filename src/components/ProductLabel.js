import "../stylesheets/ProductLabel.css";
import { motion } from "framer-motion";
import { CiTrash } from "react-icons/ci";
function ProductLabel({ total, number, id, product, deleteProduct }) {
  const handleDelete = () => {
    deleteProduct(id, product);
  };
  return (
    <motion.div
      className="labelContainer"
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
        stiffness: 260,
        damping: 50,
      }}
    >
      <div className="labelDataContainer">
        <div className="labelData">
          <p>Producto {number}</p>
          <p>${total}</p>
        </div>
      </div>
      <div className="labelButtonContainer">
        <button onClick={handleDelete} className="labelButton">
          <CiTrash className="labelIcon" />
        </button>
      </div>
    </motion.div>
  );
}

export default ProductLabel;
