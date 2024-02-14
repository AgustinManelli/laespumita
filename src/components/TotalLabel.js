import "../stylesheets/TotalLabel.css";
import { useTheme } from "../context/ThemeProvider";
import { useSpring, animated, to } from "@react-spring/web";
import { useProduct } from "../store/product";
import { useInputs } from "../store/inputs";
import { useState } from "react";

const CardIconCheck = ({ isCard }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={isCard ? "cardIconAct" : "cardIcon"}
    data-src="/icons/credit-card-accept-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
  >
    <path
      d="M11 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C21.8957 6.57684 21.9897 8.11799 21.999 11"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>

    <path d="M2 9H22" strokeLinejoin="round"></path>
    {isCard ? (
      <path
        d="M14 18C14 18 15 18 16 20C16 20 19.1765 15 22 14"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cardIconType"
      ></path>
    ) : (
      <path
        d="M22 14L16 20M22 20L16 14"
        strokeLinecap="round"
        className="cardIconType"
      ></path>
    )}
  </svg>
);

function TotalLabel() {
  const { theme } = useTheme();

  const totalPrice = useProduct((state) => state.totalPrice);
  const isCard = useInputs((state) => state.isCard);
  const setCard = useInputs((state) => state.setCard);

  const flag = isCard ? totalPrice * 1.15 : totalPrice;

  const { number } = useSpring({
    from: { number: 0 },
    number: isCard ? totalPrice * 1.15 : totalPrice,
    delay: 0,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <div className="totalLabelContainer">
      <section
        className="totalLabelPrice"
        style={{ backgroundColor: theme.backgroundContainer }}
      >
        <p style={{ color: theme.secondTitles }}>Total:</p>
        <animated.p style={{ color: theme.secondTitles, marginLeft: "10px" }}>
          {flag % 1 === 0
            ? number.to((n) => n.toFixed(0))
            : number.to((n) => n.toFixed(2))}
        </animated.p>
        {/*<p style={{ color: theme.secondTitles }}>
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
            </p>*/}
      </section>
      <button
        className={isCard ? "totalCardAct" : "totalCard"}
        onClick={setCard}
        style={{ backgroundColor: theme.backgroundContainer }}
      >
        <CardIconCheck isCard={isCard} />
      </button>
    </div>
  );
}

export default TotalLabel;
