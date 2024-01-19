import { FaTrash } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import "../stylesheets/TotalWindowLabel.css";
import { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import ChartComponentExpanded from "./ChartComponentExpanded";

function TotalWindowLabel({ product, deleteStoredProduct, totalModal }) {
  const [isClassAdded, setClassAdded] = useState(false);
  const handleCheckboxClick = () => {
    setClassAdded(!isClassAdded);
  };
  const [chartList, setChartList] = useState([]);

  useEffect(() => {
    const length = product.productsList.length;
    let newSale = [];
    let flagHours = [];

    for (let i = 0; i < length; i++) {
      const currentTime =
        Date.parse(
          `${product.productsList[i].chartDate}T${product.productsList[i].chartTime}:00:00Z`
        ) / 1000;

      if (i === 0 && parseInt(product.productsList[i].chartTime) > 0) {
        const chartFormattedTime = `${
          (product.productsList[i].chartTime - 1 < 10 ? "0" : "") +
          (product.productsList[i].chartTime - 1)
        }`;
        newSale.push({
          time:
            Date.parse(
              `${product.productsList[i].chartDate}T${chartFormattedTime}:00:00Z`
            ) / 1000,
          value: 0,
        });
      }

      if (
        length > 1 &&
        i > 0 &&
        parseInt(product.productsList[i].chartTime) -
          parseInt(product.productsList[i - 1].chartTime) !==
          1
      ) {
        for (
          let j = parseInt(product.productsList[i - 1].chartTime) + 1;
          j < parseInt(product.productsList[i].chartTime);
          j++
        ) {
          const chartFormattedTime = `${(j < 10 ? "0" : "") + j}`;
          newSale.push({
            time:
              Date.parse(
                `${product.productsList[i].chartDate}T${chartFormattedTime}:00:00Z`
              ) / 1000,
            value: 0,
          });
        }
      }

      const existingSale = newSale.find((item) => item.time === currentTime);

      if (existingSale) {
        existingSale.value += product.productsList[i].total;
      } else {
        newSale.push({
          time: currentTime,
          value: product.productsList[i].total,
        });
        flagHours.push(parseInt(product.productsList[i].chartTime));
      }
    }

    setChartList(newSale);
  }, [totalModal]);

  return (
    <div className="totalWindowLabelContainerTotal">
      <div className="totalWindowLabelContainer">
        <div className="totalWindowLabel">
          <p style={{ width: "50%" }}>$ {product.total}</p>
          <p style={{ width: "50%" }}>{product.date}</p>
          <button
            onClick={() => deleteStoredProduct(product.id, product)}
            className="totalWindowDailyDeleteButton"
          >
            <FaTrash className="totalWindowDailyDeleteIcon" />
          </button>
          <label className="labelHiddenSwitch">
            <input
              className="hiddenSwitch"
              type="checkbox"
              id={product.id + 1}
              onClick={handleCheckboxClick}
            ></input>
            <FaAngleDown
              className={
                isClassAdded
                  ? product.productsList.length > 0
                    ? "hiddenSwitchIcon actHiddenIcon"
                    : "hiddenSwitchIcon"
                  : "hiddenSwitchIcon"
              }
            />
          </label>
        </div>
        <div
          className={
            isClassAdded ? "hiddenTotalWindowActived" : "hiddenTotalWindow"
          }
        >
          {product.productsList.map((list, index) => (
            <div
              key={list.id}
              style={{
                backgroundColor: "rgb(0, 0, 0, 0.05)",
                height: "34px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                width: "95%",
                borderRadius: "10px",
              }}
            >
              <p style={{ marginLeft: "20px", marginRight: "20px" }}>
                venta {index + 1} ({list.date}): ${list.total}
              </p>
            </div>
          ))}
        </div>
        {isClassAdded ? (
          <div>
            <ChartComponentExpanded chartList={chartList} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <ChartComponent chartList={chartList} />
    </div>
  );
}

export default TotalWindowLabel;
