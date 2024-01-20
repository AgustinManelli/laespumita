import "../stylesheets/ListProducts.css";
import { useEffect } from "react";
import ProductLabel from "./ProductLabel";
import { motion, AnimatePresence } from "framer-motion";

function ListProducts({ productList, deleteProduct, handleSave }) {
  const products = productList;
  useEffect(() => {
    var objDiv = document.getElementById("listContainer");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [productList]);

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="listButtonIcon"
      data-src="/icons/checkmark-square-04-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
    >
      <path
        d="M15 2.5H12C7.52166 2.5 5.28249 2.5 3.89124 3.89124C2.5 5.28249 2.5 7.52166 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12V10"
        strokeLinecap="round"
      ></path>
      <path
        className="CheckIconCheck"
        id="CheckIconCheck"
        d="M8.5 10L12 13.5L21.0002 3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

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
      <button
        className={productList.length > 0 ? "listButton" : "listButton locked"}
        onClick={handleSave}
      >
        <CheckIcon />
      </button>
    </div>
  );
}

export default ListProducts;
