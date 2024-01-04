import "../stylesheets/TotalLabel.css";
function TotalLabel({ totalPrice }) {
  return (
    <section className="totalLabelContainer">
      <p>
        TOTAL:
        {" " +
          parseFloat(totalPrice).toLocaleString("es-ES", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
      </p>
    </section>
  );
}

export default TotalLabel;
