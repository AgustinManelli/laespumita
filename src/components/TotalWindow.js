import { useEffect } from "react";
import "../stylesheets/TotalWindow.css";
import { FiX } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
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
    if (window.localStorage.getItem("products") === null) {
      setStoredProducts([]);
    } else {
      setStoredProducts(JSON.parse(localStorage.products));
    }
    if (window.localStorage.getItem("total") === null) {
      setStoredTotal([]);
    } else {
      setStoredTotal(JSON.parse(localStorage.total));
    }
  }, []);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const handleClose = () => {
    setTotalModal(false);
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
      <div className="totalWindowModal">
        <nav className="totalWindowNavbar">
          <p>Resumen de ventas</p>
          <button onClick={handleClose} className="totalWindowNavbarButton">
            <FiX className="totalWindowNavbarX" />
          </button>
        </nav>
        <div className="totalWindowContent">
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
            <section className="totalWindowContentProducts">
              <div className="totalWindowDailyLabel indexproductlabelpar">
                <p style={{ width: "50%" }}>venta</p>
                <p style={{ width: "50%" }}>hora</p>
              </div>
              {storedProducts.map((product, index) => (
                <div
                  className={
                    index % 2 === 0
                      ? "totalWindowDailyLabel"
                      : "totalWindowDailyLabel indexproductlabelpar"
                  }
                  key={product.id}
                >
                  <p style={{ width: "50%" }}>$ {product.total}</p>
                  <p style={{ width: "50%" }}>{product.date}</p>
                  <button
                    onClick={() => deleteStoredProduct(product.id, product)}
                    className="totalWindowDailyDeleteButton"
                  >
                    <FaTrash className="totalWindowDailyDeleteIcon" />
                  </button>
                </div>
              ))}
            </section>
          ) : (
            <section className="totalWindowContentProducts">
              <div className="totalWindowDailyLabel indexproductlabelpar">
                <p style={{ width: "50%" }}>venta</p>
                <p style={{ width: "50%" }}>día</p>
              </div>
              {storedTotal.map((product, index) => (
                <div
                  className={
                    index % 2 === 0
                      ? "totalWindowDailyLabel"
                      : "totalWindowDailyLabel indexproductlabelpar"
                  }
                  key={product.id}
                >
                  <p style={{ width: "50%" }}>$ {product.total}</p>
                  <p style={{ width: "50%" }}>{product.date}</p>
                  <button
                    onClick={() => deleteStoredTotal(product.id, product)}
                    className="totalWindowDailyDeleteButton"
                  >
                    <FaTrash className="totalWindowDailyDeleteIcon" />
                  </button>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

export default TotalWindow;
