import { useEffect } from "react";
import "../stylesheets/TotalWindow.css";
import { FaX } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
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
              <FaX className="totalWindowNavbarX" />
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
                width: "60%",
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
                      index={index}
                      product={product}
                      deleteStoredProduct={deleteStoredProduct}
                      key={product.id}
                    />
                  ))}
                </>
              ) : (
                <>
                  {storedTotal.map((product, index) => (
                    <TotalWindowLabel
                      index={index}
                      product={product}
                      deleteStoredProduct={deleteStoredTotal}
                      key={product.id}
                      totalModal={totalModal}
                      setTotalModal={setTotalModal}
                      lastIndex={index !== storedTotal.length - 1}
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
