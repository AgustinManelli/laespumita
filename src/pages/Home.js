import { useState } from "react";
import AddButtons from "../components/AddButtons";
import Calculator from "../components/Calculator";
import ListProducts from "../components/ListProducts";
import "./Home.css";
import TotalLabel from "../components/TotalLabel";
import { toast } from "sonner";
import TotalWindow from "../components/TotalWindow";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeProvider";

function Home({ totalModal, setTotalModal }) {
  const { theme, setLight } = useTheme();
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
  const chartFormattedDay = `${currentDate.getFullYear()}-${
    (currentDate.getMonth() + 1 < 10 ? "0" : "") + (currentDate.getMonth() + 1)
  }-${(currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()}`;
  const chartFormattedTime = `${
    (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours()
  }`;
  const [percent, setPercent] = useState("");
  const [isStockist, setIsStockist] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCard, setIsCard] = useState(false);
  const [storedProducts, setStoredProducts] = useState([]);
  const [storedTotal, setStoredTotal] = useState([]);
  const [isDaily, setIsDaily] = useState(true);
  const [isMostPercentCache, setIsMostPercentCache] = useState(
    window.localStorage.getItem("mostPercent") === null ||
      window.localStorage.getItem("mostPercent") === undefined
      ? [40, 45, 50, 55, 60, 70]
      : JSON.parse(window.localStorage.getItem("mostPercent"))
  );
  const [isPercentStockist, setIsPercentStockist] = useState(
    window.localStorage.getItem("percentStockist") === null ||
      window.localStorage.getItem("percentStockist") === undefined
      ? [10.5, 21]
      : JSON.parse(window.localStorage.getItem("percentStockist"))
  );

  const addProduct = (e) => {
    if (total === 0) {
      return;
    }
    const tempTotal = isStockist > 0 ? total * (1 + isStockist / 100) : total;
    const newProduct = {
      id: Date.now(),
      date: formattedDateProduct,
      total: tempTotal,
    };
    const totalProducts = [...productList, newProduct];
    setProductList(totalProducts);
    setPrice("");
    setPercent("");
    setTotal(0);
    setTotalPrice((total) => total + tempTotal);
  };
  const deleteProduct = (id, product) => {
    setProductList(productList.filter((product) => product.id !== id));
    setTotalPrice((total) => total - product.total);
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
  const deleteInputs = () => {
    setPrice("");
    setPercent("");
    setIsStockist("");
  };
  const mostPercent = (num) => {
    setPercent(num);
  };
  const stockistPercent = (num) => {
    setIsStockist(num);
  };
  const setCard = () => {
    setIsCard(!isCard);
  };
  const handleSave = () => {
    if (totalPrice > 0) {
      try {
        const storedTotal = JSON.parse(localStorage.total);
        const totalIndex = storedTotal.length;
        const nuevoArray = [...storedTotal];

        if (totalIndex > 0) {
          const totalId = nuevoArray[totalIndex - 1].id;
          if (idDay !== totalId) {
            window.localStorage.setItem("products", "[]");
            setStoredProducts(JSON.parse(localStorage.products));
          }
        }
        const storedProduct = JSON.parse(localStorage.products);
        const total = storedProduct.concat({
          id: Date.now(),
          date: formattedDateProduct,
          total: parseFloat(
            (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
          ),
          productcount: productList,
          totalId: idDay,
          chartDate: chartFormattedDay,
          chartTime: chartFormattedTime,
        });
        window.localStorage.setItem("products", JSON.stringify(total));
        setStoredProducts(JSON.parse(localStorage.products));

        if (storedTotal.filter((all) => all.id === idDay).length > 0) {
          nuevoArray[totalIndex - 1].total += parseFloat(
            (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
          );
          nuevoArray[totalIndex - 1].productsList = nuevoArray[
            totalIndex - 1
          ].productsList = total;
          localStorage.setItem("total", JSON.stringify(nuevoArray));
          setStoredTotal(JSON.parse(localStorage.total));
        } else {
          const totalall = storedTotal.concat({
            id: idDay,
            total: parseFloat(
              (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
            ),
            date: formattedDay,
            productsList: total,
          });
          window.localStorage.setItem("total", JSON.stringify(totalall));
          setStoredTotal(JSON.parse(localStorage.total));
        }

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
    const nuevoArray = [...storedTotal];
    nuevoArray[totalIndex - 1].productsList = nuevoArray[
      totalIndex - 1
    ].productsList.filter((list) => list.id !== id);
    localStorage.setItem("total", JSON.stringify(nuevoArray));
    setStoredTotal(JSON.parse(localStorage.total));

    if (totalIndex > 0) {
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
      (product) => product.totalId !== flagDay
    );
    setStoredProducts(filteredDailyProduct);
    window.localStorage.setItem(
      "products",
      JSON.stringify(filteredDailyProduct)
    );
    setStoredTotal(filtered);
    window.localStorage.setItem("total", JSON.stringify(filtered));
  };
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      addProduct();
    }
  };
  const handlDeleteAll = () => {
    if (window.confirm("¿Seguro que quieres resetear las ventas?")) {
      localStorage.setItem("total", "[]");
      localStorage.setItem("products", "[]");
      setStoredTotal((total) => (total = []));
      setStoredProducts((prod) => (prod = []));
      alert("Las ventas se resetearon correctamente.");
    } else {
    }
  };
  const handlDeleteTotal = () => {
    if (window.confirm("¿Seguro que quieres resetear todos los datos?")) {
      localStorage.setItem("total", "[]");
      localStorage.setItem("products", "[]");
      localStorage.setItem("mostPercent", "[40,45,50,55,60,70]");
      localStorage.setItem("percentStockist", "[10.5, 21]");
      localStorage.setItem("theme", "light");
      setStoredTotal((total) => (total = []));
      setStoredProducts((prod) => (prod = []));
      setIsMostPercentCache((most) => (most = [40, 45, 50, 55, 60, 70]));
      setIsPercentStockist((percent) => (percent = [10.5, 21]));
      setLight();
      alert("Todos los datos se resetearon correctamente.");
    } else {
    }
  };
  return (
    <div
      className="homeContainer"
      style={{
        backgroundColor: theme.background,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <div className={isCard ? "blurredbg blurredbgact" : "blurredbg"}></div>
      <Navbar
        totalModal={totalModal}
        setTotalModal={setTotalModal}
        isMostPercentCache={isMostPercentCache}
        setIsMostPercentCache={setIsMostPercentCache}
        isPercentStockist={isPercentStockist}
        setIsPercentStockist={setIsPercentStockist}
        handlDeleteAll={handlDeleteAll}
        handlDeleteTotal={handlDeleteTotal}
      />
      <Calculator
        percent={percent}
        setPercent={setPercent}
        price={price}
        setPrice={setPrice}
        total={total}
        setTotal={setTotal}
        deleteInputs={deleteInputs}
        mostPercent={mostPercent}
        stockistPercent={stockistPercent}
        isStockist={isStockist}
        isMostPercentCache={isMostPercentCache}
        isPercentStockist={isPercentStockist}
        handleEnterKeyPress={handleEnterKeyPress}
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
        storedProducts={storedProducts}
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
