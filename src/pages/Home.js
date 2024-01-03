import { useState } from "react";
import AddButtons from "../components/AddButtons";
import Calculator from "../components/Calculator";
import ListProducts from "../components/ListProducts";
import "./Home.css";

function Home() {
  const [percent, setPercent] = useState("0");
  const [price, setPrice] = useState("0");
  const [total, setTotal] = useState("0");

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
      <AddButtons />
      <ListProducts />
    </div>
  );
}

export default Home;
