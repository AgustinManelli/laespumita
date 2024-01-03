import "../stylesheets/ListProducts.css";
import ProductLabel from "./ProductLabel";
function ListProducts({ productList }) {
  const products = productList;
  return (
    <section className="listContainer">
      {products.map((product, index) => (
        <ProductLabel total={product.total} number={index + 1} />
      ))}
    </section>
  );
}

export default ListProducts;
