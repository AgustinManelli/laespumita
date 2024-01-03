import { useEffect } from "react";
import "../stylesheets/Calculator.css";
import { CiDollar, CiPercent } from "react-icons/ci";

function Calculator({ percent, setPercent, price, setPrice, total, setTotal }) {
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
    <section className="calculatorContainer">
      <h2>Ingrese datos del producto</h2>
      <div className="calculatorDataSetter">
        <label className="inputLabel">
          <CiDollar className="inputIcon" />
          <input
            type="number"
            className="calcInput calcInput_peso"
            placeholder="Ingrese precio"
            id="input__peso"
            onInput={priceSetter}
          ></input>
        </label>
        <label className="inputLabel">
          <CiPercent className="inputIcon" />
          <input
            type="number"
            className="calcInput calcInput_pj"
            placeholder="Ingrese porcentaje"
            id="input__porcentaje"
            onInput={percentSetter}
          ></input>
        </label>
      </div>
      <h2>Precio a cobrar en caja</h2>
      <div className="calculatorDataGetter">
        <label className="inputLabel">
          <CiDollar className="inputIcon" />
          <input
            type="number"
            className="calcInput calcInput_total"
            placeholder="Resultado"
            readOnly
            disabled
            value={total}
            id="input__result"
          ></input>
        </label>
      </div>
    </section>
  );
}

export default Calculator;
