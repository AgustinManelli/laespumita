import { useEffect } from "react";
import "../stylesheets/Calculator.css";
import { FaDollarSign, FaPercent, FaDeleteLeft } from "react-icons/fa6";

function Calculator({
  percent,
  setPercent,
  price,
  setPrice,
  total,
  setTotal,
  deleteInputs,
  mostPercent,
}) {
  useEffect(() => {
    setTotal(+parseFloat(price * (percent / 100 + 1)).toFixed(2));
  });

  const percentSetter = (e) => {
    setPercent(e.target.value);
  };
  const priceSetter = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <section className="calculatorContainer">
        <h2>Ingrese datos del producto</h2>
        <div className="calculatorDataSetter">
          <label className="inputLabel">
            <FaDollarSign className="inputIcon" />
            <input
              type="number"
              className="calcInput calcInput_peso"
              placeholder="Ingrese precio"
              id="input__peso"
              value={price}
              onInput={priceSetter}
            ></input>
          </label>
          <label className="inputLabel">
            <FaPercent className="inputIcon" />
            <input
              type="number"
              className="calcInput calcInput_pj"
              placeholder="Ingrese porcentaje"
              id="input__porcentaje"
              value={percent}
              onInput={percentSetter}
            ></input>
          </label>
          <button className="deleteInputCalculator" onClick={deleteInputs}>
            <FaDeleteLeft className="deleteInputCalculatorIcon" />
          </button>
        </div>
        <h2>Precio a cobrar en caja</h2>
        <div className="calculatorDataGetter">
          <label className="inputLabel">
            <p className="totalResult">${total}</p>
          </label>
        </div>
      </section>
      <section className="mostPercentContainerSection">
        <h2>Porcentajes</h2>
        <div className="mostPercentContainer">
          <div>
            <button
              className={
                percent === "21"
                  ? "mostPercentBox percentSelected"
                  : "mostPercentBox"
              }
              onClick={() => mostPercent("21")}
            >
              <p>21</p>
            </button>
          </div>
          <div>
            <button
              className={
                percent === "40"
                  ? "mostPercentBox percentSelected"
                  : "mostPercentBox"
              }
              onClick={() => mostPercent("40")}
            >
              <p>40</p>
            </button>
          </div>
          <div>
            <button
              className={
                percent === "45"
                  ? "mostPercentBox percentSelected"
                  : "mostPercentBox"
              }
              onClick={() => mostPercent("45")}
            >
              <p>45</p>
            </button>
          </div>
          <div>
            <button
              className={
                percent === "50"
                  ? "mostPercentBox percentSelected"
                  : "mostPercentBox"
              }
              onClick={() => mostPercent("50")}
            >
              <p>50</p>
            </button>
          </div>
          <div>
            <button
              className={
                percent === "55"
                  ? "mostPercentBox percentSelected"
                  : "mostPercentBox"
              }
              onClick={() => mostPercent("55")}
            >
              <p>55</p>
            </button>
          </div>
          <div>
            <button
              className={
                percent === "60"
                  ? "mostPercentBox percentSelected"
                  : "mostPercentBox"
              }
              onClick={() => mostPercent("60")}
            >
              <p>60</p>
            </button>
          </div>
          <div>
            <button
              className={
                percent === "70"
                  ? "mostPercentBox percentSelected"
                  : "mostPercentBox"
              }
              onClick={() => mostPercent("70")}
            >
              <p>70</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Calculator;
