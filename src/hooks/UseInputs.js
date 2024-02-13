import { useState } from "react";

export const useInputs = () => {
  const [percent, setPercent] = useState("");
  const [isStockist, setIsStockist] = useState("");
  const [price, setPrice] = useState("");
  const [isCard, setIsCard] = useState(false);
  const [isDaily, setIsDaily] = useState("sales");
  const initialPercentValue = [40, 45, 50, 55, 60, 70];
  const initialStockistValue = [10.5, 21];
  const [isMostPercentCache, setIsMostPercentCache] = useState(() => {
    try {
      const item = JSON.parse(window.localStorage.getItem("mostPercent"));
      return item ? item : initialPercentValue;
    } catch (error) {
      return initialPercentValue;
    }
  });
  const [isPercentStockist, setIsPercentStockist] = useState(() => {
    try {
      const item = JSON.parse(window.localStorage.getItem("percentStockist"));
      return item ? item : initialStockistValue;
    } catch (error) {
      return initialStockistValue;
    }
  });
  const handleSetIsMostPercentCache = (e) => {
    setIsMostPercentCache(e);
  };
  const handleSetIsPercentStockist = (e) => {
    setIsPercentStockist(e);
  };
  const handleSetIsDaily = (e) => {
    setIsDaily(e);
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
  const handleSetPrice = (e) => {
    setPrice(e);
  };
  const handleSetPercent = (e) => {
    setPercent(e);
  };
  const setCard = () => {
    setIsCard(!isCard);
  };
  return {
    percent,
    isStockist,
    price,
    isCard,
    isDaily,
    isMostPercentCache,
    isPercentStockist,
    deleteInputs,
    mostPercent,
    stockistPercent,
    handleSetPrice,
    handleSetPercent,
    setCard,
    handleSetIsMostPercentCache,
    handleSetIsPercentStockist,
    handleSetIsDaily,
  };
};
