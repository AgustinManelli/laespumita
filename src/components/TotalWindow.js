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
  const [isAsc, setIsAsc] = useState(false);
  const [isDesc, setIsDesc] = useState(false);

  const sortByDesc = () => {
    const sortedData = [...storedTotal].sort((a, b) => b.total - a.total);
    setStoredTotal(sortedData);
    setIsAsc(true);
    setIsDesc(false);
  };

  const sortByAsc = () => {
    const sortedData = [...storedTotal].sort((a, b) => a.total - b.total);
    setStoredTotal(sortedData);
    setIsDesc(true);
    setIsAsc(false);
  };

  const FilterDesc = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="FilterDesc"
      style={{
        stroke: isAsc || isDesc ? theme.stroke : theme.hover,
      }}
    >
      <path
        d="M7 21.0003V14.9491C7 14.3746 7 14.0873 6.76959 14.0158C6.26306 13.8587 5.5 15 5.5 15M7 21.0003H5.5M7 21.0003H8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAsc ? "ascOne" : "ascOne ascOneAct"}
      />
      <path
        d="M9 6.50098V4.75098C9 3.92602 9 3.51354 8.70711 3.25726C8.41421 3.00098 7.94281 3.00098 7 3.00098C6.05719 3.00098 5.58579 3.00098 5.29289 3.25726C5 3.51354 5 3.92602 5 4.75098C5 5.57593 5 5.98841 5.29289 6.2447C5.58579 6.50098 6.05719 6.50098 7 6.50098H9ZM9 6.50098V7.37598C9 8.61341 9 9.23213 8.56066 9.61655C8.12132 10.001 7.41421 10.001 6 10.001H5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAsc ? "ascNine" : "ascNine ascNineAct"}
      />
      <path
        d="M16.5 20V4M16.5 20C15.7998 20 14.4915 18.0057 14 17.5M16.5 20C17.2002 20 18.5085 18.0057 19 17.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAsc ? "ascArrow" : "ascArrow ascArrowAct"}
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
    setIsAsc(false);
    setIsDesc(false);
  };
  const handleFilterSelector = (e) => {
    setIsDaily(e);
    setIsAsc(false);
    setIsDesc(false);
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
            {isDaily === "daily" ? (
              isDesc ? (
                <button
                  style={{
                    position: "absolute",
                    left: "0px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sortByDesc();
                  }}
                >
                  <FilterDesc />
                </button>
              ) : (
                <button
                  style={{
                    position: "absolute",
                    left: "0px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sortByAsc();
                  }}
                >
                  <FilterDesc />
                </button>
              )
            ) : (
              <></>
            )}
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
