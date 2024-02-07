import { useEffect, useState } from "react";
import "../stylesheets/TotalWindow.css";
import { motion } from "framer-motion";
import TotalWindowLabel from "./TotalWindowLabel";
import TotalWindowLabelDaily from "./TotalWindowLabelDaily";
import { useTheme } from "../context/ThemeProvider";
function TotalWindow({
  totalModal,
  setTotalModal,
  storedProducts,
  setStoredProducts,
  deleteStoredProduct,
  isDaily,
  setIsDaily,
  storedTotal,
  setStoredTotal,
  deleteStoredTotal,
}) {
  const { theme, wTheme } = useTheme();

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
    setIsDaily(true);
  };
  const handleFilterTrue = () => {
    setIsDaily(true);
  };
  const handleFilterFalse = () => {
    setIsDaily(false);
  };

  const [selectorHover, setSelectorHover] = useState(false);
  const [selectorHover2, setSelectorHover2] = useState(false);

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
                isDaily
                  ? "totalWindowContentSelectorButton totalWindowContentSelectorButtonSelected"
                  : "totalWindowContentSelectorButton"
              }
              style={{
                backgroundColor: isDaily
                  ? theme.hover
                  : selectorHover2
                  ? theme.hover
                  : theme.backgroundOverall,
                borderColor: theme.borderColor,
                color: theme.text,
              }}
              onClick={handleFilterTrue}
              onMouseEnter={() => {
                setSelectorHover2(true);
              }}
              onMouseLeave={() => {
                setSelectorHover2(false);
              }}
            >
              Venta diaria
            </button>
            <button
              className={
                isDaily
                  ? "totalWindowContentSelectorButton"
                  : "totalWindowContentSelectorButton totalWindowContentSelectorButtonSelected"
              }
              style={{
                backgroundColor: isDaily
                  ? selectorHover
                    ? theme.hover
                    : theme.backgroundOverall
                  : theme.hover,
                borderColor: theme.borderColor,
                color: theme.text,
              }}
              onClick={handleFilterFalse}
              onMouseEnter={() => {
                setSelectorHover(true);
              }}
              onMouseLeave={() => {
                setSelectorHover(false);
              }}
            >
              Ventas totales
            </button>
          </section>
          {isDaily ? (
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
          ) : (
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
              {isDaily ? (
                <>
                  {storedProducts.map((product, index) => (
                    <TotalWindowLabelDaily
                      key={product.id}
                      product={product}
                      deleteStoredProduct={deleteStoredProduct}
                    />
                  ))}
                </>
              ) : (
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
