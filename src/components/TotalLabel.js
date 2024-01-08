import "../stylesheets/TotalLabel.css";
import { FaCreditCard } from "react-icons/fa6";
function TotalLabel({ totalPrice, setTotalPrice, isCard, setCard }) {
  return (
    <div className="totalLabelContainer">
      <section className="totalLabelPrice">
        <p>
          TOTAL: {totalPrice}{" "}
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
        <FaCreditCard className="cardIcon" />
      </button>
    </div>
  );
}

export default TotalLabel;
