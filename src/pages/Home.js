import { useRef, useState } from "react";
import AddButtons from "../components/AddButtons";
import Calculator from "../components/Calculator";
import ListProducts from "../components/ListProducts";
import "./Home.css";
import TotalLabel from "../components/TotalLabel";

function Home() {
  const [percent, setPercent] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCard, setIsCard] = useState(false);
  const addProduct = (e) => {
    if (total === 0) {
      return;
    }
    const newProduct = {
      id: Date.now(),
      total,
    };
    const totalProducts = [...productList, newProduct];
    setProductList(totalProducts);
    setPrice("");
    setPercent("");
    setTotal(0);
    setTotalPrice(totalPrice + total);
  };
  const deleteProduct = (id, product) => {
    setProductList(productList.filter((product) => product.id !== id));
    setTotalPrice(totalPrice - product.total);
  };
  const deleteAllProduct = () => {
    setProductList([]);
    setTotalPrice(0);
  };
  const setCard = () => {
    setIsCard(!isCard);
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
      <AddButtons addProduct={addProduct} deleteAllProduct={deleteAllProduct} />
      <ListProducts productList={productList} deleteProduct={deleteProduct} />
      <TotalLabel totalPrice={totalPrice} isCard={isCard} setCard={setCard} />
    </div>
  );
}

export default Home;
