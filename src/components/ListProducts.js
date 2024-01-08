import "../stylesheets/ListProducts.css";
import { useEffect } from "react";
import ProductLabel from "./ProductLabel";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";

function ListProducts({ productList, deleteProduct, handleSave }) {
  const products = productList;
  useEffect(() => {
    var objDiv = document.getElementById("listContainer");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [productList]);

  return (
    <div style={{ position: "relative" }}>
      <section className="listContainer" id="listContainer">
        <AnimatePresence mode={"popLayout"}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <motion.div key={product.id} style={{ width: "100%" }}>
                <ProductLabel
                  total={product.total}
                  number={index + 1}
                  id={product.id}
                  key={product.id}
                  product={product}
                  deleteProduct={deleteProduct}
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ scale: 0.5, opacity: 0, filter: "blur(5px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{
                scale: 0.5,
                opacity: 0,
                filter: "blur(5px)",
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
              style={{
                color: "rgb(134, 134, 134)",
                position: "absolute",
                top: "45%",
                margin: "0",
              }}
            >
              No hay productos cargados.
            </motion.p>
          )}
        </AnimatePresence>
      </section>
      <button className="listButton" onClick={handleSave}>
        <FaCircleCheck className="listButtonIcon" />
      </button>
    </div>
  );
}

export default ListProducts;
