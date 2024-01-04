import "../stylesheets/ListProducts.css";
import { useEffect } from "react";
import ProductLabel from "./ProductLabel";

function ListProducts({ productList, deleteProduct }) {
  const products = productList;
  useEffect(() => {
    var objDiv = document.getElementById("listContainer");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [productList]);
  return (
    <section className="listContainer" id="listContainer">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductLabel
            total={product.total}
            number={index + 1}
            id={product.id}
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
          />
        ))
      ) : (
        <p style={{ color: "rgb(134, 134, 134)" }}>
          No hay productos cargados.
        </p>
      )}
    </section>
  );
}

export default ListProducts;
