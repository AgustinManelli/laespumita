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
  const idDay = `${
    (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
  }${
    (currentDate.getMonth() + 1 < 10 ? "0" : "") + (currentDate.getMonth() + 1)
  }${currentDate.getFullYear()}`;
  const formattedDateProduct = `${
    (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours()
  }:${(currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()}`;
  const formattedDay = `${
    (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
  }/${
    (currentDate.getMonth() + 1 < 10 ? "0" : "") + (currentDate.getMonth() + 1)
  }/${currentDate.getFullYear()}`;
  const [percent, setPercent] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCard, setIsCard] = useState(false);
  const [storedProducts, setStoredProducts] = useState([]);
  const [storedTotal, setStoredTotal] = useState([]);
  const [isDaily, setIsDaily] = useState(true);
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
      try {
        const storedTotal = JSON.parse(localStorage.total);
        const totalIndex = storedTotal.length;
        const nuevoArray = [...storedTotal];
        if (storedTotal.filter((all) => all.id === idDay).length > 0) {
          nuevoArray[totalIndex - 1].total += totalPrice;
          localStorage.setItem("total", JSON.stringify(nuevoArray));
          setStoredTotal(JSON.parse(localStorage.total));
        } else {
          const totalall = storedTotal.concat({
            id: idDay,
            total: parseFloat(totalPrice.toFixed(2)),
            date: formattedDay,
          });
          window.localStorage.setItem("total", JSON.stringify(totalall));
          setStoredTotal(JSON.parse(localStorage.total));
        }
        if (totalIndex > 0) {
          const totalId = nuevoArray[totalIndex - 1].id;
          if (idDay !== totalId) {
            window.localStorage.setItem("products", "[]");
            setStoredProducts(JSON.parse(localStorage.products));
          }
        }
        const storedProducts = JSON.parse(localStorage.products);
        const total = storedProducts.concat({
          total: parseFloat(totalPrice.toFixed(2)),
          date: formattedDateProduct,
          id: Date.now(),
          productcount: productList,
          day: idDay,
        });
        window.localStorage.setItem("products", JSON.stringify(total));
        setStoredProducts(JSON.parse(localStorage.products));
        setProductList([]);
        setTotalPrice(0);
        toast.success("Venta cargada correctamente", {
          duration: 1500,
        });
      } catch {
        toast.error("Se produjo un error al cargar la venta", {
          duration: 1500,
        });
      }
    }
  };
  const deleteStoredProduct = (id, product) => {
    const filteredProduct = JSON.parse(localStorage.products);
    const filtered = filteredProduct.filter((product) => product.id !== id);
    setStoredProducts(filtered);
    window.localStorage.setItem("products", JSON.stringify(filtered));
    const storedTotal = JSON.parse(localStorage.total);
    const totalIndex = storedTotal.length;
    if (totalIndex > 0) {
      const nuevoArray = [...storedTotal];
      nuevoArray[totalIndex - 1].total -= product.total;
      const supArray = nuevoArray.filter((product) => product.total > 0);
      localStorage.setItem("total", JSON.stringify(supArray));
      setStoredTotal(JSON.parse(localStorage.total));
    }
  };
  const deleteStoredTotal = (id, product) => {
    const filteredTotal = JSON.parse(localStorage.total);
    const filtered = filteredTotal.filter((product) => product.id !== id);
    const flagDay = product.id;
    const filteredDaily = JSON.parse(localStorage.products);
    const filteredDailyProduct = filteredDaily.filter(
      (product) => product.day !== flagDay
    );
    setStoredProducts(filteredDailyProduct);
    window.localStorage.setItem(
      "products",
      JSON.stringify(filteredDailyProduct)
    );
    setStoredTotal(filtered);
    window.localStorage.setItem("total", JSON.stringify(filtered));
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
      <AddButtons
        addProduct={addProduct}
        deleteAllProduct={deleteAllProduct}
        productList={productList}
      />
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
        isDaily={isDaily}
        setIsDaily={setIsDaily}
        storedTotal={storedTotal}
        setStoredTotal={setStoredTotal}
        deleteStoredTotal={deleteStoredTotal}
      />
    </div>
  );
}

export default Home;
