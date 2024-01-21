import { useEffect } from "react";
import "../stylesheets/TotalWindow.css";
import { FaX } from "react-icons/fa6";
import { motion } from "framer-motion";
import TotalWindowLabel from "./TotalWindowLabel";
import TotalWindowLabelDaily from "./TotalWindowLabelDaily";
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
  const CancelIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="totalWindowNavbarX"
      data-src="/icons/cancel-01-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
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
  }, []);
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

  return (
    <section
      className={
        totalModal ? "totalWindowContainer" : "totalWindowContainerHidden"
      }
    >
      {totalModal ? (
        <motion.div
          className="totalWindowModal"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
        >
          <nav className="totalWindowNavbar">
            <p>Resumen de ventas al día {formattedDate}</p>
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
              onClick={handleFilterTrue}
            >
              Venta diaria
            </button>
            <button
              className={
                isDaily
                  ? "totalWindowContentSelectorButton"
                  : "totalWindowContentSelectorButton totalWindowContentSelectorButtonSelected"
              }
              onClick={handleFilterFalse}
            >
              Ventas totales
            </button>
          </section>
          {isDaily ? (
            <div className="totalWindowDailyLabelTop">
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
                }}
              >
                <p>ventas</p>
                <p>día</p>
              </div>
              <div
                className="totalWindowDailyLabelTop"
                style={{ width: "130px" }}
              >
                <p>gráfica</p>
              </div>
            </div>
          )}
          <div className="totalWindowContent" id="totalWindowContent">
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
                      setStoredTotal={setStoredTotal}
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
