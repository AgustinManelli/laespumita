import { toast } from "sonner";
import { useState } from "react";

export const useProduct = (isStockist, handleSetPrice, handleSetPercent) => {
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const currentDate = new Date();
  const formattedDateProduct = `${
    (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours()
  }:${(currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()}`;
  const handleSetProductList = (e) => {
    setProductList(e);
  };
  const addProduct = () => {
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
    handleSetPrice("");
    handleSetPercent("");
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
  const handleSetTotal = (e) => {
    setTotal(e);
  };
  const handleSetTotalPrice = (e) => {
    setTotalPrice(e);
  };
  return {
    total,
    totalPrice,
    productList,
    handleSetProductList,
    addProduct,
    deleteProduct,
    deleteAllProduct,
    handleSetTotal,
    handleSetTotalPrice,
  };
};
