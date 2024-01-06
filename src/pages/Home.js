import { useState } from "react";
import AddButtons from "../components/AddButtons";
import Calculator from "../components/Calculator";
import ListProducts from "../components/ListProducts";
import "./Home.css";
import TotalLabel from "../components/TotalLabel";
import { toast } from "sonner";
import TotalWindow from "../components/TotalWindow";

function Home({ totalModal, setTotalModal }) {
  const currentDate = new Date();
  const formattedDateProduct = `${currentDate.getHours()}:${
    (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()
  }`;
  const [percent, setPercent] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCard, setIsCard] = useState(false);
  const [storedProducts, setStoredProducts] = useState([]);
  const addProduct = (e) => {
    if (total === 0) {
      return;
    }
    const newProduct = {
      id: Date.now(),
      date: formattedDateProduct,
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
    if (productList.length > 0) {
      setProductList([]);
      setTotalPrice(0);
      toast.success("Productos eliminados correctamente", {
        duration: 1500,
      });
    }
  };
  const setCard = () => {
    setIsCard(!isCard);
  };
  const deleteInputs = () => {
    setPrice("");
    setPercent("");
  };
  const mostPercent = (num) => {
    setPercent(num);
  };
  const handleSave = () => {
    if (totalPrice > 0) {
      const storedProducts = JSON.parse(localStorage.products);
      //const total = storedProducts.concat(productList);
      const total = storedProducts.concat({
        total: totalPrice,
        date: formattedDateProduct,
        id: Date.now(),
        productcount: productList,
      });
      window.localStorage.setItem("products", JSON.stringify(total));
      setStoredProducts(JSON.parse(localStorage.products));
      deleteAllProduct();
    }
  };
  const deleteStoredProduct = (id, product) => {
    const filteredProduct = JSON.parse(localStorage.products);
    const filtered = filteredProduct.filter((product) => product.id !== id);
    setStoredProducts(filtered);
    window.localStorage.setItem("products", JSON.stringify(filtered));
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
        deleteInputs={deleteInputs}
        mostPercent={mostPercent}
      />
      <AddButtons addProduct={addProduct} deleteAllProduct={deleteAllProduct} />
      <ListProducts
        productList={productList}
        deleteProduct={deleteProduct}
        deleteAllProduct={deleteAllProduct}
        handleSave={handleSave}
      />
      <TotalLabel totalPrice={totalPrice} isCard={isCard} setCard={setCard} />
      <TotalWindow
        totalModal={totalModal}
        setTotalModal={setTotalModal}
        storedProducts={storedProducts}
        setStoredProducts={setStoredProducts}
        deleteStoredProduct={deleteStoredProduct}
      />
    </div>
  );
}

export default Home;
