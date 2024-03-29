import { create } from "zustand";

const initialPercentValue = [40, 45, 50, 55, 60, 70];
const initialStockistValue = [10.5, 21];

export const useInputs = create((set) => ({
  percent: "",
  isStockist: "",
  price: "",
  isCard: false,
  isMostPercentCache:
    window.localStorage.getItem("mostPercent") === "undefined" ||
    window.localStorage.getItem("mostPercent") === null ||
    window.localStorage.getItem("mostPercent") === "null"
      ? initialPercentValue
      : JSON.parse(window.localStorage.getItem("mostPercent")),
  isPercentStockist:
    window.localStorage.getItem("percentStockist") === "undefined" ||
    window.localStorage.getItem("percentStockist") === null ||
    window.localStorage.getItem("percentStockist") === "null"
      ? initialStockistValue
      : JSON.parse(window.localStorage.getItem("percentStockist")),

  handleSetIsMostPercentCache: (e) => set(() => ({ isMostPercentCache: e })),
  handleSetIsPercentStockist: (e) => set(() => ({ isPercentStockist: e })),
  deleteInputs: () => set(() => ({ price: "", percent: "", isStockist: "" })),
  mostPercent: (num) => set(() => ({ percent: num })),
  stockistPercent: (num) => set(() => ({ isStockist: num })),
  handleSetPrice: (e) => set(() => ({ price: e })),
  handleSetPercent: (e) => set(() => ({ percent: e })),
  setCard: () => set((state) => ({ isCard: !state.isCard })),
}));
