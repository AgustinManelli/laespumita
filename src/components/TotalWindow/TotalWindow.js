import { useEffect, useState } from "react";
import "./TotalWindow.css";
import { useTheme } from "../../context/ThemeProvider.js";
import { useStoredProducts } from "../../store/storedProducts.js";
import { useInputs } from "../../store/inputs.js";
import { useModal } from "../../store/modal.js";
import TotalWindowLabel from "./TotalWindowLabel/TotalWindowLabel.js";
import TotalWindowLabelDaily from "./TotalWindowLabelDaily/TotalWindowLabelDaily.js";
import TotalWindowMonthly from "./TotalWindowMonthly/TotalWindowMonthly.js";
import WindowComponent from "../WindowComponent/WindowComponent.js";

const FilterDesc = ({ ascend, descend, theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="FilterDesc"
    style={{
      stroke: ascend.filter || descend.filter ? theme.placeholder : theme.hover,
    }}
  >
    <path
      d="M7 21.0003V14.9491C7 14.3746 7 14.0873 6.76959 14.0158C6.26306 13.8587 5.5 15 5.5 15M7 21.0003H5.5M7 21.0003H8.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={ascend.filter ? "ascOne" : "ascOne ascOneAct"}
    />
    <path
      d="M9 6.50098V4.75098C9 3.92602 9 3.51354 8.70711 3.25726C8.41421 3.00098 7.94281 3.00098 7 3.00098C6.05719 3.00098 5.58579 3.00098 5.29289 3.25726C5 3.51354 5 3.92602 5 4.75098C5 5.57593 5 5.98841 5.29289 6.2447C5.58579 6.50098 6.05719 6.50098 7 6.50098H9ZM9 6.50098V7.37598C9 8.61341 9 9.23213 8.56066 9.61655C8.12132 10.001 7.41421 10.001 6 10.001H5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={ascend.filter ? "ascNine" : "ascNine ascNineAct"}
    />
    <path
      d="M16.5 20V4M16.5 20C15.7998 20 14.4915 18.0057 14 17.5M16.5 20C17.2002 20 18.5085 18.0057 19 17.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={ascend.filter ? "ascArrow" : "ascArrow ascArrowAct"}
    />
  </svg>
);

const useFiltered = (initial) => {
  const [filter, setFilter] = useState(initial);

  const handleSetFilter = (e) => {
    setFilter(e);
  };

  return { filter, handleSetFilter };
};

const useSelectorHover = () => {
  const [hover, setHover] = useState(false);
  const handleSetHover = (e) => {
    setHover(e);
  };
  return { hover, handleSetHover };
};
function TotalWindowData() {
  const [isDaily, setIsDaily] = useState("sales");
  const storedTotal = useStoredProducts((state) => state.storedTotal);
  const setStoredTotal = useStoredProducts(
    (state) => state.handleSetStoredTotal
  );

  const [tempData, setTempData] = useState(storedTotal);

  const storedProducts = useStoredProducts((state) => state.storedProducts);
  const storedMonthly = useStoredProducts((state) => state.storedMonthly);
  const { theme } = useTheme();
  const selector1 = useSelectorHover();
  const selector2 = useSelectorHover();
  const selector3 = useSelectorHover();
  const ascend = useFiltered(false);
  const descend = useFiltered(false);
  const sortByDesc = () => {
    const sortedData = [...storedTotal].sort((a, b) => b.total - a.total);
    //setStoredTotal(sortedData);
    //setStoredTotal(sortedData);
    setTempData(sortedData);
    ascend.handleSetFilter(true);
    descend.handleSetFilter(false);
  };

  const sortByAsc = () => {
    const sortedData = [...storedTotal].sort((a, b) => a.total - b.total);
    //setStoredTotal(sortedData);
    //setStoredTotal(sortedData);
    setTempData(sortedData);
    ascend.handleSetFilter(false);
    descend.handleSetFilter(true);
  };
  const handleFilterSelector = (e) => {
    setIsDaily(e);
  };
  return (
    <>
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
                ? theme.button
                : selector1.hover
                ? theme.button
                : "transparent",
            borderColor: theme.borderColor,
            color: isDaily === "sales" ? theme.text : theme.placeholder,
          }}
          onClick={() => {
            handleFilterSelector("sales");
          }}
          onMouseEnter={() => {
            selector1.handleSetHover(true);
          }}
          onMouseLeave={() => {
            selector1.handleSetHover(false);
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
                ? theme.button
                : selector2.hover
                ? theme.button
                : "transparent",
            borderColor: theme.borderColor,
            color: isDaily === "daily" ? theme.text : theme.placeholder,
          }}
          onClick={() => {
            handleFilterSelector("daily");
          }}
          onMouseEnter={() => {
            selector2.handleSetHover(true);
          }}
          onMouseLeave={() => {
            selector2.handleSetHover(false);
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
                ? theme.button
                : selector3.hover
                ? theme.button
                : "transparent",
            borderColor: theme.borderColor,
            color: isDaily === "monthly" ? theme.text : theme.placeholder,
          }}
          onClick={() => {
            handleFilterSelector("monthly");
          }}
          onMouseEnter={() => {
            selector3.handleSetHover(true);
          }}
          onMouseLeave={() => {
            selector3.handleSetHover(false);
          }}
        >
          Ventas mensuales
        </button>
        {/*isDaily === "daily" ? (
          descend.filter ? (
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
              <FilterDesc ascend={ascend} descend={descend} theme={theme} />
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
              <FilterDesc ascend={ascend} descend={descend} theme={theme} />
            </button>
          )
        ) : (
          <></>
        )*/}
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
          theme === "light"
            ? "totalWindowContent totalWindowContentLight"
            : "totalWindowContent totalWindowContentDark"
        }
        id="totalWindowContent"
      >
        <section className="totalWindowContentProducts">
          {isDaily === "sales" ? (
            <>
              {storedProducts.map((product) => (
                <TotalWindowLabelDaily key={product.id} product={product} />
              ))}
            </>
          ) : isDaily === "daily" ? (
            <>
              {storedTotal.map((product, index) => (
                <TotalWindowLabel
                  key={product.id}
                  product={product}
                  lastIndex={index !== storedTotal.length - 1}
                  index={index}
                />
              ))}
            </>
          ) : (
            <>
              {storedMonthly.map((product) => (
                <TotalWindowMonthly key={product.id} product={product} />
              ))}
            </>
          )}
        </section>
      </div>
    </>
  );
}

function TotalWindow() {
  const isDaily = useInputs((state) => state.isDaily);
  const totalModal = useModal((state) => state.totalModal);
  const setTotalModal = useModal((state) => state.setTotalModal);

  useEffect(() => {
    try {
      var totalWindowDiv = document.getElementById("totalWindowContent");
      totalWindowDiv.scrollTop = totalWindowDiv.scrollHeight;
    } catch {}
  }, [isDaily, totalModal]);

  const currentDate = new Date();
  const formattedDate = `${
    (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
  }/${
    (currentDate.getMonth() + 1 < 10 ? "0" : "") + (currentDate.getMonth() + 1)
  }/${currentDate.getFullYear()}`;

  /*const handleClose = () => {
    setTotalModal(false);
    setIsDaily("sales");
    ascend.handleSetFilter(false);
    descend.handleSetFilter(false);
    setStoredTotal(JSON.parse(window.localStorage.getItem("total")));
  };*/

  return (
    <WindowComponent
      content={<TotalWindowData />}
      modalType={totalModal}
      setModalType={setTotalModal}
      title={`Resumen de ventas | ${formattedDate}`}
    />
  );
}

export default TotalWindow;
