import { useState } from "react";
import AddButtons from "../components/AddButtons";
import Calculator from "../components/Calculator";
import ListProducts from "../components/ListProducts";
import "./Home.css";

function Home() {
  const [percent, setPercent] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState([]);
  const addProduct = (e) => {
    e.preventDefault();
    if (total === 0) {
      return;
    }
    const newProduct = {
      id: Date.now(),
      total,
    };
    const totalProducts = [newProduct, ...productList];
    setProductList(totalProducts);
    setPrice("");
    setPercent("");
    setTotal(0);
  };
  const deleteProduct = (id, product) => {
    setProductList(productList.filter((product) => product.id !== id));
  };
  return (
    <div className="homeContainer">
      <Calculator
        percent={percent}
        setPercent={setPercent}
        price={price}
        setPrice={setPrice}
        total={total}
        setTotal={setTotal}
      />
      <AddButtons addProduct={addProduct} />
      <ListProducts productList={productList} deleteProduct={deleteProduct} />
    </div>
  );
}

export default Home;
