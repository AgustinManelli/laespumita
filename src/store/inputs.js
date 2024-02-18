import { create } from "zustand";

const initialPercentValue = [40, 45, 50, 55, 60, 70];
const initialStockistValue = [10.5, 21];

export const useInputs = create((set) => ({
  percent: "",
  isStockist: "",
  price: "",
  isCard: false,
  isDaily: "sales",
  isMostPercentCache:
    window.localStorage.getItem("mostPercent") === undefined ||
    window.localStorage.getItem("mostPercent") === null
      ? JSON.parse(window.localStorage.getItem("mostPercent"))
      : initialPercentValue,
  isPercentStockist:
    window.localStorage.getItem("percentStockist") === undefined ||
    window.localStorage.getItem("percentStockist") === null
      ? JSON.parse(window.localStorage.getItem("percentStockist"))
      : initialStockistValue,

  handleSetIsMostPercentCache: (e) => set(() => ({ isMostPercentCache: e })),
  handleSetIsPercentStockist: (e) => set(() => ({ isPercentStockist: e })),
  handleSetIsDaily: (e) => set(() => ({ isDaily: e })),
  deleteInputs: () => set(() => ({ price: "", percent: "", isStockist: "" })),
  mostPercent: (num) => set(() => ({ percent: num })),
  stockistPercent: (num) => set(() => ({ isStockist: num })),
  handleSetPrice: (e) => set(() => ({ price: e })),
  handleSetPercent: (e) => set(() => ({ percent: e })),
  setCard: () => set((state) => ({ isCard: !state.isCard })),
}));
