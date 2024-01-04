import "../stylesheets/TotalLabel.css";
import { CiCreditCard1 } from "react-icons/ci";
function TotalLabel({ totalPrice, isCard, setCard }) {
  return (
    <div className="totalLabelContainer">
      <section className="totalLabelPrice">
        <p>
          TOTAL:{" "}
          {isCard
            ? parseFloat(totalPrice * 1.15).toLocaleString("es-ES", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : parseFloat(totalPrice).toLocaleString("es-ES", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
        </p>
      </section>
      <button
        className={isCard ? "totalCardAct" : "totalCard"}
        onClick={setCard}
      >
        <CiCreditCard1 className="cardIcon" />
      </button>
    </div>
  );
}

export default TotalLabel;
