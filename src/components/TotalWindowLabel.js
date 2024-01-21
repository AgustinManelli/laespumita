import { FaTrash } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import "../stylesheets/TotalWindowLabel.css";
import { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import ChartComponentExpanded from "./ChartComponentExpanded";

function TotalWindowLabel({
  product,
  deleteStoredProduct,
  totalModal,
  lastIndex,
  setStoredTotal,
}) {
  const [isClassAdded, setClassAdded] = useState(false);
  const handleCheckboxClick = () => {
    setClassAdded(!isClassAdded);
  };
  const ArrowIcon = () => (
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
      color="#000000"
    >
      <path
        d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
  const DeleteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="totalWindowDailyDeleteIcon"
      data-src="/icons/delete-01-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
    >
      <path
        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
        strokeLinecap="round"
        className="labelIconLid"
      ></path>
    </svg>
  );

  const [chartList, setChartList] = useState([]);

  useEffect(() => {
    var objDiv = document.getElementById("hiddenTotalWindow");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [isClassAdded]);

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
            <DeleteIcon />
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
              <ArrowIcon />
            </div>
          </label>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            className={
              isClassAdded ? "hiddenTotalWindowActived" : "hiddenTotalWindow"
            }
            id="hiddenTotalWindow"
          >
            {product.productsList.map((list, index) => (
              <div
                key={list.id}
                style={{
                  backgroundColor: "rgb(0, 0, 0, 0.05)",
                  height: "34px",
                  minHeight: "34px",
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
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {isClassAdded ? (
            <div
              style={{
                position: "relative",
                width: "calc(95% - 10px)",
                backgroundColor: "rgb(236, 239, 242)",
                borderRadius: "10px",
                marginTop: "5px",
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <ChartComponentExpanded chartList={chartList} />
            </div>
          ) : (
            <></>
          )}
        </div>
        {isClassAdded && lastIndex ? (
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "#008fd2",
              marginBottom: "10px",
            }}
          ></div>
        ) : (
          <div></div>
        )}
      </div>
      <ChartComponent chartList={chartList} />
    </div>
  );
}

export default TotalWindowLabel;
