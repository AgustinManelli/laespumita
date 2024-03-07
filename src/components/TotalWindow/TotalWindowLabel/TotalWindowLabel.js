import { useEffect, useState } from "react";
import "./TotalWindowLabel.css";
import { useTheme } from "../../../context/ThemeProvider";
import { motion } from "framer-motion";
import { useStoredProducts } from "../../../store/storedProducts";
import ChartComponent from "../../ChartComponent/ChartComponent";
import ChartComponentExpanded from "../../ChartComponentExpanded/ChartComponentExpanded";
import { DeleteIcon } from "../../../icons/DeleteIcon/DeleteIcon";

const ArrowIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="hiddenSwitchIcon"
    data-src="/icons/arrow-down-01-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{ stroke: theme.placeholder }}
  >
    <path
      d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

function TotalWindowLabel({ product, lastIndex, index }) {
  const { theme, wTheme } = useTheme();
  const [isClassAdded, setClassAdded] = useState(false);
  const [chartList, setChartList] = useState(
    JSON.parse(window.localStorage.getItem("total"))[index].chartList
  );

  const deleteStoredProduct = useStoredProducts(
    (state) => state.DeleteStoredTotal
  );

  const handleCheckboxClick = () => {
    setClassAdded(!isClassAdded);
  };

  useEffect(() => {
    var objDiv = document.getElementById("hiddenTotalWindow");
    try {
      objDiv.scrollTop = objDiv.scrollHeight;
    } catch {}
  }, [isClassAdded]);

  return (
    <div className="totalWindowLabelContainerTotal">
      <div className="totalWindowLabelContainer">
        <div
          className="totalWindowLabel"
          style={{ backgroundColor: theme.button }}
        >
          <p style={{ width: "50%", color: theme.text }}>$ {product.total}</p>
          <p style={{ width: "50%", color: theme.text }}>{product.date}</p>
          <button
            onClick={() => deleteStoredProduct(product.id, product)}
            className="totalWindowDailyDeleteButton"
          >
            <DeleteIcon
              width={"17px"}
              stroke={theme.placeholder}
              strokeWith={"1.5"}
            />
          </button>
          <label className="labelHiddenSwitch">
            <input
              className="hiddenSwitch"
              type="checkbox"
              id={product.id + 1}
              onClick={handleCheckboxClick}
            ></input>
            <div
              className={
                isClassAdded
                  ? "arrowIconContainer arrowIconAct"
                  : "arrowIconContainer"
              }
            >
              <ArrowIcon theme={theme} />
            </div>
          </label>
        </div>

        <motion.div
          initial={{ transform: "translateY(0px)" }}
          animate={{ transform: "translateY(0px)" }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          className={
            isClassAdded ? "accordionContainer accAct" : "accordionContainer"
          }
        >
          {isClassAdded ? (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  className={
                    wTheme
                      ? "hiddenTotalWindowActived hiddenTotalWindowActivedLight"
                      : "hiddenTotalWindowActived hiddenTotalWindowActivedDark"
                  }
                  id="hiddenTotalWindow"
                  style={{ borderColor: theme.borderColor }}
                >
                  {product.productsList.map((list, index) => (
                    <div
                      key={list.id}
                      style={{
                        backgroundColor: theme.button,
                        height: "34px",
                        minHeight: "34px",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "95%",
                        borderRadius: "10px",
                        border: `1px solid ${theme.borderColor}`,
                      }}
                    >
                      <p
                        style={{
                          marginLeft: "20px",
                          marginRight: "20px",
                          color: theme.text,
                        }}
                      >
                        venta {index + 1} ({list.date}): ${list.total}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "calc(95% - 10px)",
                    borderRadius: "10px",
                    marginTop: "5px",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                    border: `1px solid ${theme.borderColor}`,
                  }}
                >
                  <ChartComponentExpanded chartList={chartList} />
                </div>
              </div>
              {lastIndex ? (
                <div
                  style={{
                    width: "100%",
                    height: "2px",
                    backgroundColor: theme.borderColor,
                    marginBottom: "10px",
                  }}
                ></div>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            <></>
          )}
        </motion.div>
      </div>
      <ChartComponent chartList={chartList} />
    </div>
  );
}

export default TotalWindowLabel;
