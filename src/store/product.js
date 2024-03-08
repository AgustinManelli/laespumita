import { useInputs } from "./inputs.js";
import { create } from "zustand";
import { toast } from "sonner";

export const useProduct = create((set, get) => ({
  productList: [],
  total: 0,
  totalPrice: 0,

  handleSetProductList: (e) => set(() => ({ productList: e })),
  AddProduct: () => {
    const currentDate = new Date();
    const formattedDateProduct = `${
      (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours()
    }:${(currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()}`;
    const isStockist = useInputs.getState().isStockist;
    const handleSetPrice = useInputs.getState().handleSetPrice;
    const handleSetPercent = useInputs.getState().handleSetPercent;
    const { total } = get();
    const { productList } = get();
    if (total > 0) {
      const tempTotal = isStockist > 0 ? total * (1 + isStockist / 100) : total;
      const newProduct = {
        id: Date.now(),
        date: formattedDateProduct,
        total: tempTotal,
      };
      const totalProducts = [...productList, newProduct];
      set({ productList: totalProducts });
      set({ total: 0 });
      set((state) => ({ totalPrice: state.totalPrice + tempTotal }));
      handleSetPrice("");
      handleSetPercent("");
    }
  },
  DeleteProduct: (id, product) => {
    const { productList } = get();
    const { totalPrie } = get();
    const temp = productList.filter((product) => product.id !== id);
    set({ productList: temp });
    set((state) => ({ totalPrice: state.totalPrice - product.total }));
  },
  DeleteAllProduct: () => {
    const { productList } = get();
    if (productList.length > 0) {
      set({ productList: [] });
      set({ totalPrice: 0 });
      toast.success("Productos eliminados correctamente", {
        duration: 1500,
      });
    }
  },
  handleSetTotal: (e) => set(() => ({ total: e })),
  handleSetTotalPrice: (e) => set(() => ({ totalPrice: e })),
}));
