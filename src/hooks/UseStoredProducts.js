import { toast } from "sonner";
import { useState } from "react";

export const useStoredProducts = (
  totalPrice,
  isCard,
  setDark,
  handleSetIsPercentStockist,
  handleSetIsMostPercentCache,
  handleSetTotalPrice,
  handleSetProductList
) => {
  const tempInitialValue = [];
  const [storedProducts, setStoredProducts] = useState(() => {
    try {
      const item = JSON.parse(window.localStorage.getItem("products"));
      return item ? item : tempInitialValue;
    } catch (error) {
      return tempInitialValue;
    }
  });
  const [storedTotal, setStoredTotal] = useState(() => {
    try {
      const item = JSON.parse(window.localStorage.getItem("total"));
      return item ? item : tempInitialValue;
    } catch (error) {
      return tempInitialValue;
    }
  });
  const [storedMonthly, setStoredMonthly] = useState(() => {
    try {
      const item = JSON.parse(window.localStorage.getItem("monthly"));
      return item ? item : tempInitialValue;
    } catch (error) {
      return tempInitialValue;
    }
  });

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
  const handleSave = () => {
    if (totalPrice > 0) {
      try {
        const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
        const totalIndexMonth = storedMonth.length;

        if (totalIndexMonth > 0) {
          const monthId = storedMonth[totalIndexMonth - 1].id;
          if (idMonth !== monthId) {
            window.localStorage.setItem("total", "[]");
            setStoredTotal([]);
            window.localStorage.setItem("products", "[]");
            setStoredProducts([]);
          }
        }

        const storedTotal = JSON.parse(window.localStorage.getItem("total"));
        const totalIndex = storedTotal.length;

        if (totalIndex > 0) {
          const totalId = storedTotal[totalIndex - 1].id;
          if (idDay !== totalId) {
            window.localStorage.setItem("products", "[]");
            setStoredProducts([]);
          }
        }

        const storedProduct = JSON.parse(localStorage.getItem("products"));
        storedProduct.push({
          id: Date.now(),
          date: formattedDateProduct,
          total: parseFloat(
            (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
          ),
          totalId: idDay,
          chartDate: chartFormattedDay,
          chartTime: chartFormattedTime,
        });

        window.localStorage.setItem("products", JSON.stringify(storedProduct));
        setStoredProducts(JSON.parse(window.localStorage.getItem("products")));

        if (storedTotal.filter((all) => all.id === idDay).length > 0) {
          storedTotal[totalIndex - 1].total += parseFloat(
            (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
          );
          storedTotal[totalIndex - 1].productsList = storedTotal[
            totalIndex - 1
          ].productsList = storedProduct;
          localStorage.setItem("total", JSON.stringify(storedTotal));
          setStoredTotal(JSON.parse(window.localStorage.getItem("total")));
        } else {
          storedTotal.push({
            id: idDay,
            month: idMonth,
            total: parseFloat(
              (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
            ),
            date: formattedDay,
            productsList: storedProduct,
            chartList: [],
          });
          window.localStorage.setItem("total", JSON.stringify(storedTotal));
          setStoredTotal(JSON.parse(window.localStorage.getItem("total")));
        }

        if (storedMonth.filter((all) => all.id === idMonth).length > 0) {
          storedMonth[totalIndexMonth - 1].total += parseFloat(
            (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
          );
          localStorage.setItem("monthly", JSON.stringify(storedMonth));
          setStoredMonthly(JSON.parse(window.localStorage.getItem("monthly")));
        } else {
          if (storedMonth.length >= 12) {
            storedMonth.shift();
          }
          storedMonth.push({
            id: idMonth,
            total: parseFloat(
              (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
            ),
            date: formattedMonth,
          });
          window.localStorage.setItem("monthly", JSON.stringify(storedMonth));
          setStoredMonthly(JSON.parse(window.localStorage.getItem("monthly")));
        }

        handleSetProductList([]);
        handleSetTotalPrice(0);
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
    const getProduct = JSON.parse(window.localStorage.getItem("products"));
    const filtered = getProduct.filter((product) => product.id !== id);
    window.localStorage.setItem("products", JSON.stringify(filtered));
    setStoredProducts(filtered);
    const storedTotal = JSON.parse(window.localStorage.getItem("total"));
    const totalIndex = storedTotal.length;
    storedTotal[totalIndex - 1].productsList = storedTotal[
      totalIndex - 1
    ].productsList.filter((list) => list.id !== id);
    window.localStorage.setItem("total", JSON.stringify(storedTotal));
    setStoredTotal(JSON.parse(window.localStorage.getItem("total")));
    const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
    const monthIndex = storedMonth.length;

    if (monthIndex > 0) {
      storedMonth[monthIndex - 1].total -= product.total;
      const supArray = storedMonth.filter((product) => product.total > 0);
      window.localStorage.setItem("monthly", JSON.stringify(supArray));
      setStoredMonthly(JSON.parse(window.localStorage.getItem("monthly")));
    }

    if (totalIndex > 0) {
      storedTotal[totalIndex - 1].total -= product.total;
      const supArray = storedTotal.filter((product) => product.total > 0);
      localStorage.setItem("total", JSON.stringify(supArray));
      setStoredTotal(JSON.parse(window.localStorage.getItem("total")));
    }
  };
  const deleteStoredTotal = (id, product) => {
    const filteredTotal = JSON.parse(window.localStorage.getItem("total"));
    const filtered = filteredTotal.filter((product) => product.id !== id);
    const filteredDaily = JSON.parse(window.localStorage.getItem("products"));
    const filteredDailyProduct = filteredDaily.filter(
      (filt) => filt.totalId !== product.id
    );
    window.localStorage.setItem(
      "products",
      JSON.stringify(filteredDailyProduct)
    );
    setStoredProducts(filteredDailyProduct);
    window.localStorage.setItem("total", JSON.stringify(filtered));
    setStoredTotal(filtered);
    const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
    const monthIndex = storedMonth.length;
    if (monthIndex > 0) {
      storedMonth[monthIndex - 1].total -= product.total;
      const supArray = storedMonth.filter((product) => product.total > 0);
      window.localStorage.setItem("monthly", JSON.stringify(supArray));
      setStoredMonthly(supArray);
    }
  };
  const deleteStoredMonthly = (id, product) => {
    const filteredTotal = JSON.parse(window.localStorage.getItem("monthly"));
    const filtered = filteredTotal.filter((product) => product.id !== id);
    const filteredTotal2 = JSON.parse(window.localStorage.getItem("total"));
    const filteredDailyProduct = filteredTotal2.filter(
      (filt) => filt.month !== product.id
    );
    window.localStorage.setItem("total", JSON.stringify(filteredDailyProduct));
    setStoredTotal(filteredDailyProduct);
    if (id === idMonth) {
      window.localStorage.setItem("products", "[]");
      setStoredProducts([]);
    }
    window.localStorage.setItem("monthly", JSON.stringify(filtered));
    setStoredMonthly(filtered);
  };
  const handleDeleteAll = () => {
    if (
      JSON.parse(window.localStorage.getItem("total")).length > 0 ||
      JSON.parse(window.localStorage.getItem("products")).length > 0 ||
      JSON.parse(window.localStorage.getItem("monthly")).length > 0
    ) {
      if (window.confirm("¿Seguro que quieres resetear las ventas?")) {
        window.localStorage.setItem("total", "[]");
        window.localStorage.setItem("products", "[]");
        window.localStorage.setItem("monthly", "[]");
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
  const handleDeleteTotal = () => {
    if (
      JSON.parse(window.localStorage.getItem("total")).length > 0 ||
      JSON.parse(window.localStorage.getItem("products")).length > 0 ||
      JSON.parse(window.localStorage.getItem("monthly")).length > 0 ||
      window.localStorage.getItem("percentStockist") !== "[10.5, 21]" ||
      window.localStorage.getItem("mostPercent") !== "[40,45,50,55,60,70]" ||
      window.localStorage.getItem("theme") !== "dark"
    ) {
      if (window.confirm("¿Seguro que quieres resetear todos los datos?")) {
        window.localStorage.setItem("total", "[]");
        window.localStorage.setItem("products", "[]");
        window.localStorage.setItem("monthly", "[]");
        window.localStorage.setItem("mostPercent", "[40,45,50,55,60,70]");
        window.localStorage.setItem("percentStockist", "[10.5, 21]");
        window.localStorage.setItem("theme", "dark");
        setStoredTotal((total) => (total = []));
        setStoredProducts((prod) => (prod = []));
        setStoredMonthly((month) => (month = []));
        handleSetIsMostPercentCache(
          (most) => (most = [40, 45, 50, 55, 60, 70])
        );
        handleSetIsPercentStockist((percent) => (percent = [10.5, 21]));
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

  const handleSetStoredProducts = (e) => {
    setStoredProducts(e);
  };
  const handleSetStoredTotal = (e) => {
    setStoredTotal(e);
  };
  const handleSetStoredMonthly = (e) => {
    setStoredMonthly(e);
  };

  return {
    storedProducts,
    storedTotal,
    storedMonthly,
    handleSave,
    deleteStoredProduct,
    deleteStoredTotal,
    deleteStoredMonthly,
    handleDeleteAll,
    handleDeleteTotal,
    handleSetStoredProducts,
    handleSetStoredTotal,
    handleSetStoredMonthly,
  };
};
