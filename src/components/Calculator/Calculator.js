import { useEffect, useRef, useState } from "react";
import styles from "./Calculator.module.css";
import StockistDropdown from "./StockistDropdown/StockistDropdown.js";
import { useTheme } from "../../context/ThemeProvider.js";
import { useInputs } from "../../store/inputs.js";
import { useProduct } from "../../store/product.js";

const EraserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={styles.deleteInputCalculatorIcon}
    data-src="/icons/eraser-01-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13C14.9628 4 15.9443 4 16.7889 4.42229C17.6334 4.84458 18.2223 5.62972 19.4 7.2C21.1333 9.51111 22 10.6667 22 12C22 13.3333 21.1333 14.4889 19.4 16.8C18.2223 18.3703 17.6334 19.1554 16.7889 19.5777C15.9443 20 14.9628 20 13 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"></path>
    <path
      d="M14 9L8 14.9996M14 15L8 9.00039"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.deleteInputCalculatorIconX}
    ></path>
  </svg>
);

const PercentIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={styles.inputIcon}
    data-src="/icons/percent-square-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{ stroke: theme.placeholder }}
  >
    <path
      d="M2.5,12c0-4.5,0-6.7,1.4-8.1C5.3,2.5,7.5,2.5,12,2.5c4.5,0,6.7,0,8.1,1.4c1.4,1.4,1.4,3.6,1.4,8.1
	c0,4.5,0,6.7-1.4,8.1c-1.4,1.4-3.6,1.4-8.1,1.4c-4.5,0-6.7,0-8.1-1.4C2.5,18.7,2.5,16.5,2.5,12z"
      strokeLinejoin="round"
    />
    <path
      d="M16,8l-8,8"
      strokeLinecap="round"
      style={{ stroke: theme.placeholder }}
    />
    <circle
      cx="15"
      cy="14.8"
      r="1"
      style={{
        stroke: theme.placeholder,
        fill: theme.placeholder,
        strokeWidth: "1",
      }}
    />
    <circle
      cx="9"
      cy="9"
      r="1"
      style={{
        stroke: theme.placeholder,
        fill: theme.placeholder,
        strokeWidth: "1",
      }}
    />
  </svg>
);

const DollarIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={styles.inputIcon}
    data-src="/icons/dollar-square-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{ stroke: theme.placeholder }}
  >
    <path d="M2.5 12C2.5 7.77027 2.5 5.6554 3.69797 4.25276C3.86808 4.05358 4.05358 3.86808 4.25276 3.69797C5.6554 2.5 7.77027 2.5 12 2.5C16.2297 2.5 18.3446 2.5 19.7472 3.69797C19.9464 3.86808 20.1319 4.05358 20.302 4.25276C21.5 5.6554 21.5 7.77027 21.5 12C21.5 16.2297 21.5 18.3446 20.302 19.7472C20.1319 19.9464 19.9464 20.1319 19.7472 20.302C18.3446 21.5 16.2297 21.5 12 21.5C7.77027 21.5 5.6554 21.5 4.25276 20.302C4.05358 20.1319 3.86808 19.9464 3.69797 19.7472C2.5 18.3446 2.5 16.2297 2.5 12Z"></path>
    <path
      d="M14 10.1278C14 10.542 14.3358 10.8778 14.75 10.8778C15.1642 10.8778 15.5 10.542 15.5 10.1278H14ZM9.75 13.8726C9.75 13.4584 9.41421 13.1226 9 13.1226C8.58579 13.1226 8.25 13.4584 8.25 13.8726H9.75ZM12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7L12.75 7ZM11.25 17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17H11.25ZM12 11.1062C11.0478 11.1062 10.5431 10.9543 10.2922 10.7864C10.1056 10.6615 10 10.4909 10 10.1278H8.5C8.5 10.8783 8.76936 11.572 9.45777 12.0328C10.0819 12.4507 10.9522 12.6062 12 12.6062V11.1062ZM10 10.1278C10 9.86732 10.1424 9.56819 10.4989 9.30676C10.855 9.04566 11.3833 8.86133 12 8.86133V7.36133C11.0979 7.36133 10.2512 7.6284 9.61196 8.09711C8.97319 8.56549 8.5 9.2746 8.5 10.1278H10ZM12 8.86133C12.6167 8.86133 13.145 9.04566 13.501 9.30676C13.8576 9.56819 14 9.86732 14 10.1278H15.5C15.5 9.27459 15.0268 8.56549 14.388 8.09711C13.7488 7.6284 12.9021 7.36133 12 7.36133V8.86133ZM14.25 13.8726C14.25 14.3084 14.0711 14.5775 13.7369 14.777C13.3572 15.0037 12.7608 15.1391 12 15.1391V16.6391C12.896 16.6391 13.7997 16.4865 14.5057 16.065C15.2573 15.6163 15.75 14.8772 15.75 13.8726H14.25ZM12 15.1391C11.3002 15.1391 10.7004 14.9471 10.2971 14.676C9.88907 14.4018 9.75 14.1036 9.75 13.8726H8.25C8.25 14.7554 8.78251 15.4654 9.46029 15.921C10.1428 16.3797 11.0429 16.6391 12 16.6391V15.1391ZM12 12.6062C12.9582 12.6062 13.5279 12.7501 13.8421 12.9537C14.088 13.1131 14.25 13.354 14.25 13.8726H15.75C15.75 12.951 15.412 12.1837 14.6579 11.6949C13.9721 11.2504 13.0418 11.1062 12 11.1062V12.6062ZM12.75 8.11133L12.75 7L11.25 7L11.25 8.11133L12.75 8.11133ZM11.25 15.8891V17H12.75V15.8891H11.25Z"
      style={{ fill: theme.placeholder }}
      stroke="none"
    ></path>
  </svg>
);

const useInputEffect = () => {
  const [inputHovered, setInputHovered] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const handleSetHover = (e) => {
    setInputHovered(e);
  };
  const handleSetFocus = (e) => {
    setInputFocus(e);
  };
  return { inputHovered, inputFocus, handleSetHover, handleSetFocus };
};

function Calculator() {
  //THEME
  const { theme } = useTheme();

  const inputNumber = useRef();

  //GLOBAL STATES
  const percent = useInputs((state) => state.percent);
  const handleSetPercent = useInputs((state) => state.handleSetPercent);
  const price = useInputs((state) => state.price);
  const handleSetPrice = useInputs((state) => state.handleSetPrice);
  const deleteInputs = useInputs((state) => state.deleteInputs);
  const mostPercent = useInputs((state) => state.mostPercent);
  const isStockist = useInputs((state) => state.isStockist);
  const isMostPercentCache = useInputs((state) => state.isMostPercentCache);
  const total = useProduct((state) => state.total);
  const handleSetTotal = useProduct((state) => state.handleSetTotal);
  const addProduct = useProduct((state) => state.AddProduct);

  //INPUTS EFFECTS
  const inputOne = useInputEffect();
  const inputTwo = useInputEffect();

  useEffect(() => {
    handleSetTotal(+parseFloat(price * (percent / 100 + 1)).toFixed(2));
  }, [price, percent]);

  const percentSetter = (e) => {
    handleSetPercent(e.target.value);
  };
  const priceSetter = (e) => {
    handleSetPrice(e.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      addProduct();
    }
  };

  return (
    <div className={styles.calculatorContainerTotal}>
      <section
        className={styles.calculatorContainer}
        style={{
          backgroundColor: theme.backgroundContainer,
          boxShadow: theme.boxShadow,
        }}
      >
        <p>Ingrese datos del producto</p>
        <div className={styles.calculatorDataSetter}>
          <label className={styles.inputLabel}>
            <DollarIcon theme={theme} />
            <input
              onKeyPress={handleEnterKeyPress}
              type="number"
              className={styles.calcInput}
              placeholder="Precio"
              id="input__peso"
              value={price}
              onInput={(e) => {
                priceSetter(e);
              }}
              style={{
                backgroundColor:
                  inputOne.inputHovered || inputOne.inputFocus
                    ? theme.hover
                    : theme.button,
                boxShadow: inputOne.inputHovered ? theme.boxShadow : "none",
                color: theme.placeholder,
              }}
              onMouseEnter={() => {
                inputOne.handleSetHover(true);
              }}
              onMouseLeave={() => {
                inputOne.handleSetHover(false);
              }}
            ></input>
          </label>
          <label className={styles.inputLabel}>
            <PercentIcon theme={theme} />
            <input
              onKeyPress={handleEnterKeyPress}
              type="number"
              ref={inputNumber}
              className={styles.calcInput}
              placeholder="Procentaje"
              id="input__porcentaje"
              value={percent}
              onInput={(e) => {
                percentSetter(e);
              }}
              style={{
                backgroundColor:
                  inputTwo.inputHovered || inputTwo.inputFocus
                    ? theme.hover
                    : theme.button,
                boxShadow: inputTwo.inputHovered ? theme.boxShadow : "none",
                color: theme.placeholder,
              }}
              onMouseEnter={() => {
                inputTwo.handleSetHover(true);
              }}
              onMouseLeave={() => {
                inputTwo.handleSetHover(false);
              }}
            ></input>
          </label>
          <button
            className={styles.deleteInputCalculator}
            onClick={deleteInputs}
          >
            <EraserIcon />
          </button>
        </div>
        <p>Precio a cobrar en caja</p>
        <label className={styles.inputLabel}>
          <p className={styles.totalResult} style={{ color: theme.text }}>
            ${isStockist > 0 ? total * (1 + isStockist / 100) : total}
          </p>
        </label>
      </section>
      <section
        className={styles.mostPercentContainerSection}
        style={{
          backgroundColor: theme.backgroundContainer,
          boxShadow: theme.boxShadow,
        }}
      >
        <h2>Porcentajes</h2>
        <div className={styles.mostPercentContainer}>
          <div className={styles.mostPerrcentList}>
            {isMostPercentCache.map((percentCache, index) => (
              <div key={index}>
                <button
                  className={
                    percent === `${percentCache}`
                      ? `${styles.mostPercentBox} ${styles.percentSelected}`
                      : styles.mostPercentBox
                  }
                  onClick={() => {
                    if (parseInt(percent) !== percentCache) {
                      mostPercent(`${percentCache}`);
                    } else {
                      mostPercent("");
                    }
                  }}
                  style={{
                    backgroundColor: theme.button,
                    color: theme.placeholder,
                  }}
                >
                  <p>{percentCache}</p>
                </button>
              </div>
            ))}
          </div>
          <div className={styles.calculatorSeparator}></div>
          <StockistDropdown />
          <div></div>
        </div>
      </section>
    </div>
  );
}

export default Calculator;
