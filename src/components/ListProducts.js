import "../stylesheets/ListProducts.css";
import ProductLabel from "./ProductLabel";
function ListProducts({ productList, deleteProduct }) {
  const products = productList;
  return (
    <section className="listContainer">
      {products.map((product, index) => (
        <ProductLabel
          total={product.total}
          number={index + 1}
          id={product.id}
          product={product}
          deleteProduct={deleteProduct}
        />
      ))}
    </section>
  );
}

export default ListProducts;
