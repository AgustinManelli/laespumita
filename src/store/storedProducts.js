import { create } from "zustand";
import { toast } from "sonner";
import { useProduct } from "./product";
import { useInputs } from "./inputs.js";
//import { useTheme } from "../context/ThemeProvider.js";

const tempInitialValue = [];

export const useStoredProducts = create((set, get) => ({
  storedProducts:
    window.localStorage.getItem("products") === "undefined" ||
    window.localStorage.getItem("products") === null ||
    window.localStorage.getItem("products") === "null"
      ? tempInitialValue
      : JSON.parse(window.localStorage.getItem("products")),
  storedTotal:
    window.localStorage.getItem("total") === "undefined" ||
    window.localStorage.getItem("total") === null ||
    window.localStorage.getItem("total") === "null"
      ? tempInitialValue
      : JSON.parse(window.localStorage.getItem("total")),
  storedMonthly:
    window.localStorage.getItem("monthly") === "undefined" ||
    window.localStorage.getItem("monthly") === null ||
    window.localStorage.getItem("monthly") === "null"
      ? tempInitialValue
      : JSON.parse(window.localStorage.getItem("total")),

  InitialSale: () => {
    if (
      window.localStorage.getItem("products") === null ||
      window.localStorage.getItem("products") === "null" ||
      window.localStorage.getItem("products") === "undefined"
    ) {
      window.localStorage.setItem("products", "[]");
    }
    if (
      window.localStorage.getItem("total") === null ||
      window.localStorage.getItem("total") === "null" ||
      window.localStorage.getItem("total") === "undefined"
    ) {
      window.localStorage.setItem("total", "[]");
    }
    if (
      window.localStorage.getItem("mostPercent") === null ||
      window.localStorage.getItem("mostPercent") === "null" ||
      window.localStorage.getItem("mostPercent") === "undefined"
    ) {
      window.localStorage.setItem("mostPercent", "[40,45,50,55,60,70]");
    }
    if (
      window.localStorage.getItem("percentStockist") === null ||
      window.localStorage.getItem("percentStockist") === "null" ||
      window.localStorage.getItem("percentStockist") === "undefined"
    ) {
      window.localStorage.setItem("percentStockist", "[10.5,21]");
    }
    if (
      window.localStorage.getItem("theme") === null ||
      window.localStorage.getItem("theme") === "null" ||
      window.localStorage.getItem("theme") === "undefined"
    ) {
      window.localStorage.setItem("theme", "dark");
    }
    if (
      window.localStorage.getItem("monthly") === null ||
      window.localStorage.getItem("monthly") === "null" ||
      window.localStorage.getItem("monthly") === "undefined"
    ) {
      window.localStorage.setItem("monthly", "[]");
    }
    const currentDate = new Date();
    const idDay = `${
      (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
    }${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }${currentDate.getFullYear()}`;
    const idMonth = `${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }${currentDate.getFullYear()}`;
    try {
      const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
      const totalIndexMonth = storedMonth.length;
      if (totalIndexMonth > 0) {
        const monthId = storedMonth[totalIndexMonth - 1].id;
        if (idMonth !== monthId) {
          window.localStorage.setItem("total", "[]");
          set({ storedTotal: [] });
          window.localStorage.setItem("products", "[]");
          set({ storedProducts: [] });
        }
      }
    } catch {
      window.localStorage.setItem("products", "[]");
      set({ storedProducts: [] });
      window.localStorage.setItem("total", "[]");
      set({ storedTotal: [] });
      window.localStorage.setItem("monthly", "[]");
      set({ storedMonthly: [] });
    }
    try {
      const storedTotal = JSON.parse(window.localStorage.getItem("total"));
      const totalIndex = storedTotal.length;
      if (totalIndex > 0) {
        const totalId = storedTotal[totalIndex - 1].id;
        if (idDay !== totalId) {
          window.localStorage.setItem("products", "[]");
          set({ storedProducts: [] });
        }
      }
    } catch {
      window.localStorage.setItem("products", "[]");
      set({ storedProducts: [] });
      window.localStorage.setItem("total", "[]");
      set({ storedTotal: [] });
      window.localStorage.setItem("monthly", "[]");
      set({ storedMonthly: [] });
    }
  },

  HandleSave: () => {
    const currentDate = new Date();
    const idDay = `${
      (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
    }${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }${currentDate.getFullYear()}`;
    const idMonth = `${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }${currentDate.getFullYear()}`;
    const formattedDateProduct = `${
      (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours()
    }:${(currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()}`;
    const formattedDay = `${
      (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
    }/${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }/${currentDate.getFullYear()}`;
    const formattedMonth = `${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }/${currentDate.getFullYear()}`;
    const chartFormattedDay = `${currentDate.getFullYear()}-${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }-${(currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()}`;

    const chartFormattedTime = `${
      (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours()
    }`;
    const totalPrice = useProduct.getState().totalPrice;
    const handleSetProductList = useProduct.getState().handleSetProductList;
    const handleSetTotalPrice = useProduct.getState().handleSetTotalPrice;
    const isCard = useInputs.getState().isCard;
    if (totalPrice > 0) {
      try {
        const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
        const totalIndexMonth = storedMonth.length;

        const storedTotal = JSON.parse(window.localStorage.getItem("total"));
        const totalIndex = storedTotal.length;

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
        set({
          storedProducts: JSON.parse(window.localStorage.getItem("products")),
        });

        if (storedTotal.filter((all) => all.id === idDay).length > 0) {
          /*storedTotal[totalIndex - 1].total += parseFloat(
            (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
          );*/
          const calculateStoredTotal = parseFloat(
            (
              storedTotal[totalIndex - 1].total +
              (isCard ? totalPrice * 1.15 : totalPrice)
            ).toFixed(2)
          );
          storedTotal[totalIndex - 1].total = calculateStoredTotal;

          storedTotal[totalIndex - 1].productsList = storedTotal[
            totalIndex - 1
          ].productsList = storedProduct;
          /////////////////////////////////////////
          /////////////////////////////////////////
          const flagStored = storedProduct.length;
          if (
            storedProduct.length > 1 &&
            parseInt(storedProduct[flagStored - 1].chartTime) -
              parseInt(storedProduct[flagStored - 2].chartTime) !==
              1
          ) {
            for (
              let j = parseInt(storedProduct[flagStored - 2].chartTime) + 1;
              j < parseInt(storedProduct[flagStored - 1].chartTime);
              j++
            ) {
              console.log(j);
              const chartFormattedTime = `${(j < 10 ? "0" : "") + j}`;
              console.log(chartFormattedTime);
              storedTotal[totalIndex - 1].chartList.push({
                time:
                  Date.parse(
                    `${
                      storedProduct[flagStored - 1].chartDate
                    }T${chartFormattedTime}:00:00Z`
                  ) / 1000,
                value: 0,
              });
            }
          }
          const currentTime =
            Date.parse(
              `${storedProduct[flagStored - 1].chartDate}T${
                storedProduct[flagStored - 1].chartTime
              }:00:00Z`
            ) / 1000;
          const existingSale = storedTotal[totalIndex - 1].chartList.find(
            (item) => item.time === currentTime
          );
          if (existingSale) {
            existingSale.value += storedProduct[flagStored - 1].total;
          } else {
            storedTotal[totalIndex - 1].chartList.push({
              time: currentTime,
              value: storedProduct[flagStored - 1].total,
            });
          }
          //////////////////////////////////////////
          //////////////////////////////////////////

          window.localStorage.setItem("total", JSON.stringify(storedTotal));
          set({
            storedTotal: JSON.parse(window.localStorage.getItem("total")),
          });
        } else {
          const productLenght = storedProduct.length;
          const flagTime = storedProduct[0].chartTime - 1;
          const tempTime = `${
            (parseInt(storedProduct[0].chartTime) - 1 < 10 ? "0" : "") +
            flagTime
          }`;
          storedTotal.push({
            id: idDay,
            month: idMonth,
            total: parseFloat(
              (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
            ),
            date: formattedDay,
            productsList: storedProduct,
            chartList:
              storedProduct[0].chartTime === "00"
                ? [
                    {
                      time:
                        Date.parse(
                          `${storedProduct[0].chartDate}T${storedProduct[0].chartTime}:00:00Z`
                        ) / 1000,

                      value: 0,
                    },
                  ]
                : [
                    {
                      time:
                        Date.parse(
                          `${storedProduct[0].chartDate}T${tempTime}:00:00Z`
                        ) / 1000,
                      value: 0,
                    },
                    {
                      time:
                        Date.parse(
                          `${storedProduct[0].chartDate}T${storedProduct[0].chartTime}:00:00Z`
                        ) / 1000,

                      value: parseFloat(
                        (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
                      ),
                    },
                  ],
          });

          window.localStorage.setItem("total", JSON.stringify(storedTotal));
          set({
            storedTotal: JSON.parse(window.localStorage.getItem("total")),
          });
        }

        if (storedMonth.filter((all) => all.id === idMonth).length > 0) {
          /*storedMonth[totalIndexMonth - 1].total += parseFloat(
            (isCard ? totalPrice * 1.15 : totalPrice).toFixed(2)
          );*/
          const calculatedStoredMonth = parseFloat(
            (
              storedMonth[totalIndexMonth - 1].total +
              (isCard ? totalPrice * 1.15 : totalPrice)
            ).toFixed(2)
          );
          storedMonth[totalIndexMonth - 1].total = calculatedStoredMonth;

          localStorage.setItem("monthly", JSON.stringify(storedMonth));
          set({
            storedMonthly: JSON.parse(window.localStorage.getItem("monthly")),
          });
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
          set({
            storedMonthly: JSON.parse(window.localStorage.getItem("monthly")),
          });
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
  },
  DeleteStoredProduct: (id, product) => {
    const getProduct = JSON.parse(window.localStorage.getItem("products"));
    const filtered = getProduct.filter((product) => product.id !== id);
    window.localStorage.setItem("products", JSON.stringify(filtered));
    set({ storedProducts: filtered });
    const storedTotal = JSON.parse(window.localStorage.getItem("total"));
    const totalIndex = storedTotal.length;
    storedTotal[totalIndex - 1].productsList = storedTotal[
      totalIndex - 1
    ].productsList.filter((list) => list.id !== id);
    /////////////////////////////////
    ////////////////////////////////
    const indexFlagChart = storedTotal[totalIndex - 1].chartList.length;
    const existingChartData = storedTotal[totalIndex - 1].chartList.find(
      (item) =>
        item.time ===
        Date.parse(`${product.chartDate}T${product.chartTime}:00:00Z`) / 1000
    );
    if (existingChartData) {
      existingChartData.value -= product.total;
      if (
        storedTotal[totalIndex - 1].chartList[indexFlagChart - 1].time ===
          Date.parse(`${product.chartDate}T${product.chartTime}:00:00Z`) /
            1000 &&
        storedTotal[totalIndex - 1].chartList[indexFlagChart - 1].value === 0
      ) {
        storedTotal[totalIndex - 1].chartList.pop();
      }
    }
    ////////////////////////////////
    ////////////////////////////////
    window.localStorage.setItem("total", JSON.stringify(storedTotal));
    set({ storedTotal: JSON.parse(window.localStorage.getItem("total")) });
    const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
    const monthIndex = storedMonth.length;

    if (monthIndex > 0) {
      storedMonth[monthIndex - 1].total -= product.total;
      const supArray = storedMonth.filter((product) => product.total > 0);
      window.localStorage.setItem("monthly", JSON.stringify(supArray));
      set({
        storedMonthly: JSON.parse(window.localStorage.getItem("monthly")),
      });
    }

    if (totalIndex > 0) {
      storedTotal[totalIndex - 1].total -= product.total;
      const supArray = storedTotal.filter((product) => product.total > 0);
      localStorage.setItem("total", JSON.stringify(supArray));
      set({ storedTotal: JSON.parse(window.localStorage.getItem("total")) });
    }
  },
  DeleteStoredTotal: (id, product) => {
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
    set({ storedProducts: filteredDailyProduct });
    window.localStorage.setItem("total", JSON.stringify(filtered));
    set({ storedTotal: filtered });
    const storedMonth = JSON.parse(window.localStorage.getItem("monthly"));
    const monthIndex = storedMonth.length;
    if (monthIndex > 0) {
      storedMonth[monthIndex - 1].total -= product.total;
      const supArray = storedMonth.filter((product) => product.total > 0);
      window.localStorage.setItem("monthly", JSON.stringify(supArray));
      set({ storedMonthly: supArray });
    }
  },
  DeleteStoredMonthly: (id, product) => {
    const currentDate = new Date();
    const idMonth = `${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }${currentDate.getFullYear()}`;
    const filteredTotal = JSON.parse(window.localStorage.getItem("monthly"));
    const filtered = filteredTotal.filter((product) => product.id !== id);
    const filteredTotal2 = JSON.parse(window.localStorage.getItem("total"));
    const filteredDailyProduct = filteredTotal2.filter(
      (filt) => filt.month !== product.id
    );
    window.localStorage.setItem("total", JSON.stringify(filteredDailyProduct));
    set({ storedTotal: filteredDailyProduct });
    if (id === idMonth) {
      window.localStorage.setItem("products", "[]");
      set({ storedProducts: [] });
    }
    window.localStorage.setItem("monthly", JSON.stringify(filtered));
    set({ storedMonthly: filtered });
  },
  HandleDeleteAll: () => {
    if (
      JSON.parse(window.localStorage.getItem("total")).length > 0 ||
      JSON.parse(window.localStorage.getItem("products")).length > 0 ||
      JSON.parse(window.localStorage.getItem("monthly")).length > 0
    ) {
      if (window.confirm("¿Seguro que quieres resetear las ventas?")) {
        window.localStorage.setItem("total", "[]");
        window.localStorage.setItem("products", "[]");
        window.localStorage.setItem("monthly", "[]");
        set({ storedTotal: [] });
        set({ storedProducts: [] });
        set({ storedMonthly: [] });
        toast("Las ventas se resetearon correctamente.", {
          duration: 3000,
        });
      }
    } else {
      toast("Las ventas ya están vacías.", {
        duration: 3000,
      });
    }
  },
  HandleDeleteTotal: () => {
    const handleSetIsMostPercentCache =
      useInputs.getState().handleSetIsMostPercentCache;
    const handleSetIsPercentStockist =
      useInputs.getState().handleSetIsPercentStockist;
    /*const { setDark } = useTheme();*/
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
        set({ storedTotal: [] });
        set({ storedProducts: [] });
        set({ storedMonthly: [] });
        handleSetIsMostPercentCache([40, 45, 50, 55, 60, 70]);
        handleSetIsPercentStockist([10.5, 21]);
        /*setDark();*/
        toast("Todos los datos se resetearon correctamente.", {
          duration: 3000,
        });
      }
    } else {
      toast("Los datos ya están por defecto.", {
        duration: 3000,
      });
    }
  },
  handleSetStoredProducts: (e) => set(() => ({ storedProducts: e })),
  handleSetStoredTotal: (e) => set(() => ({ storedTotal: e })),
  handleSetStoredMonthly: (e) => set(() => ({ storedMonthly: e })),
}));
