import "../stylesheets/TotalLabel.css";
function TotalLabel({ totalPrice }) {
  return (
    <section className="totalLabelContainer">
      <p>TOTAL: {+parseFloat(totalPrice).toFixed(2)}</p>
    </section>
  );
}

export default TotalLabel;
