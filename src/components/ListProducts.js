import "../stylesheets/ListProducts.css";
import { useEffect } from "react";
import ProductLabel from "./ProductLabel";
import { motion, AnimatePresence } from "framer-motion";

function ListProducts({ productList, deleteProduct }) {
  const products = productList;
  useEffect(() => {
    var objDiv = document.getElementById("listContainer");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [productList]);
  return (
    <section className="listContainer" id="listContainer">
      <AnimatePresence>
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
          <p
            style={{
              color: "rgb(134, 134, 134)",
            }}
          >
            No hay productos cargados.
          </p>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ListProducts;
