import { useEffect, useState } from "react";
import "../stylesheets/TotalWindow.css";
import { motion } from "framer-motion";
import TotalWindowLabel from "./TotalWindowLabel";
import TotalWindowLabelDaily from "./TotalWindowLabelDaily";
import { useTheme } from "../context/ThemeProvider";
import TotalWindowMonthly from "./TotalWindowMonthly";
function TotalWindow({
  totalModal,
  setTotalModal,
  storedProducts,
  setStoredProducts,
  deleteStoredProduct,
  isDaily,
  setIsDaily,
  storedTotal,
  storedMonthly,
  setStoredMonthly,
  setStoredTotal,
  deleteStoredTotal,
  deleteStoredMonthly,
}) {
  const { theme, wTheme } = useTheme();

  const FilterAsc = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 10.0003V3.94909C7 3.37458 7 3.08732 6.76959 3.01583C6.26306 2.85867 5.5 4 5.5 4M7 10.0003H5.5M7 10.0003H8.5"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 17.5V15.75C9 14.925 9 14.5126 8.70711 14.2563C8.41421 14 7.94281 14 7 14C6.05719 14 5.58579 14 5.29289 14.2563C5 14.5126 5 14.925 5 15.75C5 16.575 5 16.9874 5.29289 17.2437C5.58579 17.5 6.05719 17.5 7 17.5H9ZM9 17.5V18.375C9 19.6124 9 20.2312 8.56066 20.6156C8.12132 21 7.41421 21 6 21H5"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5 20V4M16.5 20C15.7998 20 14.4915 18.0057 14 17.5M16.5 20C17.2002 20 18.5085 18.0057 19 17.5"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const CancelIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="totalWindowNavbarX"
      data-src="/icons/cancel-01-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      style={{ stroke: theme.stroke }}
    >
      <path
        d="M19 5L5 19M5 5L19 19"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
  useEffect(() => {
    try {
      var totalWindowDiv = document.getElementById("totalWindowContent");
      totalWindowDiv.scrollTop = totalWindowDiv.scrollHeight;
    } catch {}
  }, [isDaily, totalModal]);
  useEffect(() => {
    try {
      if (window.localStorage.getItem("products") === "[null]") {
        setStoredProducts([]);
        window.localStorage.setItem("products", JSON.stringify(storedProducts));
      } else {
        setStoredProducts(JSON.parse(localStorage.products));
      }
      if (window.localStorage.getItem("total") === "[null]") {
        setStoredTotal([]);
        window.localStorage.setItem("total", JSON.stringify(storedTotal));
      } else {
        setStoredTotal(JSON.parse(localStorage.total));
      }
      if (window.localStorage.getItem("monthly") === "[null]") {
        setStoredMonthly([]);
        window.localStorage.setItem("monthly", JSON.stringify(storedMonthly));
      } else {
        setStoredMonthly(JSON.parse(window.localStorage.getItem("monthly")));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDaily, totalModal]);
  const currentDate = new Date();
  const formattedDate = `${
    (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
  }/${
    (currentDate.getMonth() + 1 < 10 ? "0" : "") + (currentDate.getMonth() + 1)
  }/${currentDate.getFullYear()}`;
  const handleClose = () => {
    setTotalModal(false);
    setIsDaily("sales");
  };
  const handleFilterSelector = (e) => {
    setIsDaily(e);
  };
  const handleFilterTrue = () => {
    setIsDaily(true);
  };
  const handleFilterFalse = () => {
    setIsDaily(false);
  };

  const [selectorHover, setSelectorHover] = useState(false);
  const [selectorHover2, setSelectorHover2] = useState(false);
  const [selectorHover3, setSelectorHover3] = useState(false);

  return (
    <section
      className={
        totalModal ? "totalWindowContainer" : "totalWindowContainerHidden"
      }
    >
      {totalModal ? (
        <motion.div
          className="totalWindowBG"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          style={{ backgroundColor: theme.background }}
        ></motion.div>
      ) : (
        <></>
      )}
      {totalModal ? (
        <motion.div
          className="totalWindowModal"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          style={{
            backgroundColor: theme.backgroundContainer,
            boxShadow: theme.boxShadow,
          }}
        >
          <nav className="totalWindowNavbar">
            <h2 style={{ color: theme.secondTitles }}>
              Resumen de ventas al día {formattedDate}
            </h2>
            <button onClick={handleClose} className="totalWindowNavbarButton">
              <CancelIcon />
            </button>
          </nav>
          <section className="totalWindowContentSelector">
            <button
              className={
                isDaily === "sales"
                  ? "totalWindowContentSelectorButton totalWindowContentSelectorButtonSelected"
                  : "totalWindowContentSelectorButton"
              }
              style={{
                backgroundColor:
                  isDaily === "sales"
                    ? theme.hover
                    : selectorHover2
                    ? theme.hover
                    : theme.backgroundOverall,
                borderColor: theme.borderColor,
                color: theme.text,
              }}
              onClick={() => {
                handleFilterSelector("sales");
              }}
              onMouseEnter={() => {
                setSelectorHover2(true);
              }}
              onMouseLeave={() => {
                setSelectorHover2(false);
              }}
            >
              Ventas
            </button>
            <button
              className={
                isDaily === "daily"
                  ? "totalWindowContentSelectorButton totalWindowContentSelectorButtonSelected"
                  : "totalWindowContentSelectorButton"
              }
              style={{
                backgroundColor:
                  isDaily === "daily"
                    ? theme.hover
                    : selectorHover
                    ? theme.hover
                    : theme.backgroundOverall,
                borderColor: theme.borderColor,
                color: theme.text,
              }}
              onClick={() => {
                handleFilterSelector("daily");
              }}
              onMouseEnter={() => {
                setSelectorHover(true);
              }}
              onMouseLeave={() => {
                setSelectorHover(false);
              }}
            >
              Ventas diarias
            </button>
            <button
              className={
                isDaily === "monthly"
                  ? "totalWindowContentSelectorButton totalWindowContentSelectorButtonSelected"
                  : "totalWindowContentSelectorButton"
              }
              style={{
                backgroundColor:
                  isDaily === "monthly"
                    ? theme.hover
                    : selectorHover3
                    ? theme.hover
                    : theme.backgroundOverall,
                borderColor: theme.borderColor,
                color: theme.text,
              }}
              onClick={() => {
                handleFilterSelector("monthly");
              }}
              onMouseEnter={() => {
                setSelectorHover3(true);
              }}
              onMouseLeave={() => {
                setSelectorHover3(false);
              }}
            >
              Ventas mensuales
            </button>
            {/*<button
              style={{
                position: "absolute",
                left: "0px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FilterAsc />
            </button>*/}
          </section>
          {isDaily === "sales" ? (
            <div
              className="totalWindowDailyLabelTop"
              style={{ color: theme.text, backgroundColor: theme.hover }}
            >
              <div
                style={{
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>venta</p>
              </div>
              <div
                style={{
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>hora</p>
              </div>
            </div>
          ) : isDaily === "daily" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                width: "80%",
              }}
            >
              <div
                className="totalWindowDailyLabelTop"
                style={{
                  width: "100%",
                  color: theme.text,
                  backgroundColor: theme.hover,
                }}
              >
                <p>ventas</p>
                <p>día</p>
              </div>
              <div
                className="totalWindowDailyLabelTop"
                style={{
                  width: "130px",
                  color: theme.text,
                  backgroundColor: theme.hover,
                }}
              >
                <p>gráfica</p>
              </div>
            </div>
          ) : (
            <div
              className="totalWindowDailyLabelTop"
              style={{ color: theme.text, backgroundColor: theme.hover }}
            >
              <div
                style={{
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>venta</p>
              </div>
              <div
                style={{
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>mes</p>
              </div>
            </div>
          )}
          <div
            className={
              wTheme
                ? "totalWindowContent totalWindowContentLight"
                : "totalWindowContent totalWindowContentDark"
            }
            id="totalWindowContent"
          >
            <section className="totalWindowContentProducts">
              {isDaily === "sales" ? (
                <>
                  {storedProducts.map((product, index) => (
                    <TotalWindowLabelDaily
                      key={product.id}
                      product={product}
                      deleteStoredProduct={deleteStoredProduct}
                    />
                  ))}
                </>
              ) : isDaily === "daily" ? (
                <>
                  {storedTotal.map((product, index) => (
                    <TotalWindowLabel
                      key={product.id}
                      product={product}
                      deleteStoredProduct={deleteStoredTotal}
                      totalModal={totalModal}
                      lastIndex={index !== storedTotal.length - 1}
                      index={index}
                      setStoredTotal={setStoredTotal}
                      isDaily={isDaily}
                    />
                  ))}
                </>
              ) : (
                <>
                  {storedMonthly.map((product, index) => (
                    <TotalWindowMonthly
                      product={product}
                      index={index}
                      deleteStoredMonthly={deleteStoredMonthly}
                    />
                  ))}
                </>
              )}
            </section>
          </div>
        </motion.div>
      ) : (
        <div style={{ position: "absolute" }}></div>
      )}
    </section>
  );
}

export default TotalWindow;
