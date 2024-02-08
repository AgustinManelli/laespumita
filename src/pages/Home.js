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
  const { theme, setDark } = useTheme();
  const currentDate = new Date();
  const idDay = `${
    (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
  }${
    (currentDate.getMonth() + 1 < 10 ? "0" : "") + (currentDate.getMonth() + 1)
  }${currentDate.getFullYear()}`;
  const idMonth = `${
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
  const formattedMonth = `${
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
  const [storedMonthly, setStoredMonthly] = useState([]);
  const [isDaily, setIsDaily] = useState("sales");
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
        const storedMonth = JSON.parse(window.localStorage.monthly);
        const totalIndexMonth = storedMonth.length;
        const nuevoArrayMonth = [...storedMonth];
        if (totalIndexMonth > 0) {
          const monthId = nuevoArrayMonth[totalIndexMonth - 1].id;
          if (idMonth !== monthId) {
            window.localStorage.setItem("total", "[]");
            setStoredTotal(JSON.parse(window.localStorage.total));
            window.localStorage.setItem("products", "[]");
            setStoredProducts(JSON.parse(window.localStorage.products));
          }
        }
        const storedTotal = JSON.parse(window.localStorage.total);
        const totalIndex = storedTotal.length;
        const nuevoArray = [...storedTotal];

        if (totalIndex > 0) {
          const totalId = nuevoArray[totalIndex - 1].id;

          if (idDay !== totalId) {
            window.localStorage.setItem("products", "[]");
            setStoredProducts(JSON.parse(window.localStorage.products));
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
            month: idMonth,
            total: parseFloat(
              (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
            ),
            date: formattedDay,
            productsList: total,
            chartList: [],
          });
          window.localStorage.setItem("total", JSON.stringify(totalall));
          setStoredTotal(JSON.parse(localStorage.total));
        }
        if (storedMonth.filter((all) => all.id === idMonth).length > 0) {
          nuevoArrayMonth[totalIndexMonth - 1].total += parseFloat(
            (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
          );
          localStorage.setItem("monthly", JSON.stringify(nuevoArrayMonth));
          setStoredMonthly(JSON.parse(localStorage.monthly));
        } else {
          if (storedMonth.length >= 12) {
            storedMonth.shift();
          }
          const totalall = storedMonth.concat({
            id: idMonth,
            total: parseFloat(
              (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
            ),
            date: formattedMonth,
          });
          window.localStorage.setItem("monthly", JSON.stringify(totalall));
          setStoredMonthly(JSON.parse(localStorage.monthly));
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
    const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
    const monthIndex = storedMonth.length;
    const nuevoMonthArray = [...storedMonth];

    if (totalIndex > 0) {
      nuevoMonthArray[monthIndex - 1].total -= product.total;
      window.localStorage.setItem("monthly", JSON.stringify(nuevoMonthArray));
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
    const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
    const monthIndex = storedMonth.length;
    const nuevoMonthArray = [...storedMonth];
    if (monthIndex > 0) {
      nuevoMonthArray[monthIndex - 1].total -= product.total;
      const supArray = nuevoMonthArray.filter((product) => product.total > 0);
      window.localStorage.setItem("monthly", JSON.stringify(supArray));
    }
  };
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      addProduct();
    }
  };
  const deleteStoredMonthly = (id, product) => {
    const filteredTotal = JSON.parse(localStorage.monthly);
    const filtered = filteredTotal.filter((product) => product.id !== id);
    const flagDay = product.id;
    const filteredTotal2 = JSON.parse(localStorage.total);
    const filteredDailyProduct = filteredTotal2.filter(
      (product) => product.month !== flagDay
    );
    setStoredTotal(filteredDailyProduct);
    window.localStorage.setItem("total", JSON.stringify(filteredDailyProduct));
    if (id === idMonth) {
      setStoredProducts([]);
      window.localStorage.setItem("products", "[]");
    }
    setStoredMonthly(filtered);
    window.localStorage.setItem("monthly", JSON.stringify(filtered));
  };
  const handlDeleteAll = () => {
    if (
      JSON.parse(window.localStorage.getItem("total")).length > 0 ||
      JSON.parse(window.localStorage.getItem("products")).length > 0 ||
      JSON.parse(window.localStorage.getItem("monthly")).length > 0
    ) {
      if (window.confirm("¿Seguro que quieres resetear las ventas?")) {
        localStorage.setItem("total", "[]");
        localStorage.setItem("products", "[]");
        localStorage.setItem("monthly", "[]");
        setStoredTotal((total) => (total = []));
        setStoredProducts((prod) => (prod = []));
        setStoredMonthly((month) => (month = []));
        toast("Las ventas se resetearon correctamente.", {
          duration: 3000,
        });
      }
    } else {
      toast("Las ventas ya están vacías.", {
        duration: 3000,
      });
    }
  };
  const handlDeleteTotal = () => {
    if (
      JSON.parse(window.localStorage.getItem("total")).length > 0 ||
      JSON.parse(window.localStorage.getItem("products")).length > 0 ||
      JSON.parse(window.localStorage.getItem("monthly")).length > 0 ||
      window.localStorage.getItem("percentStockist") !== "[10.5, 21]" ||
      window.localStorage.getItem("mostPercent") !== "[40,45,50,55,60,70]" ||
      window.localStorage.getItem("theme") !== "dark"
    ) {
      if (window.confirm("¿Seguro que quieres resetear todos los datos?")) {
        localStorage.setItem("total", "[]");
        localStorage.setItem("products", "[]");
        localStorage.setItem("monthly", "[]");
        localStorage.setItem("mostPercent", "[40,45,50,55,60,70]");
        localStorage.setItem("percentStockist", "[10.5, 21]");
        localStorage.setItem("theme", "dark");
        setStoredTotal((total) => (total = []));
        setStoredProducts((prod) => (prod = []));
        setStoredMonthly((month) => (month = []));
        setIsMostPercentCache((most) => (most = [40, 45, 50, 55, 60, 70]));
        setIsPercentStockist((percent) => (percent = [10.5, 21]));
        setDark();
        toast("Todos los datos se resetearon correctamente.", {
          duration: 3000,
        });
      }
    } else {
      toast("Los datos ya están por defecto.", {
        duration: 3000,
      });
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
        storedMonthly={storedMonthly}
        setStoredMonthly={setStoredMonthly}
        setStoredTotal={setStoredTotal}
        deleteStoredTotal={deleteStoredTotal}
        deleteStoredMonthly={deleteStoredMonthly}
      />
    </div>
  );
}

export default Home;
