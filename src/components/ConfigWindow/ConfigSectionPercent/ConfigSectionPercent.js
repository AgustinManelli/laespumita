import "./ConfigSectionPercent.css";
import { useTheme } from "../../../context/ThemeProvider.js";
import { useInputs } from "../../../store/inputs";
import { useState } from "react";
import ConfigPercentBox from "./ConfigPercentBox/ConfigPercentBox.js";
import ConfigSectionContainer from "../ConfigSectionContainer/ConfigSectionContainer.js";

const PlusConfig = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="PlusConfig"
    data-src="/icons/plus-sign-square-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{ stroke: theme.placeholder }}
  >
    <path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      strokeLinejoin="round"
      className="PlusConfigBox"
    ></path>
    <path
      d="M12 8V16M16 12H8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="PlusConfigPlus"
    ></path>
  </svg>
);

const useFocused = () => {
  const [focused, setFocused] = useState(false);
  const handleFocused = (e) => {
    setFocused(e);
  };
  return { focused, handleFocused };
};

function ConfigSectionPercentContent() {
  const { theme } = useTheme();
  const isMostPercentCache = useInputs((state) => state.isMostPercentCache);
  const handleSetIsMostPercentCache = useInputs(
    (state) => state.handleSetIsMostPercentCache
  );
  const isPercentStockist = useInputs((state) => state.isPercentStockist);
  const handleSetIsPercentStockist = useInputs(
    (state) => state.handleSetIsPercentStockist
  );
  const focusedPercent = useFocused();
  const focusedStockist = useFocused();
  const handleAddPercent = () => {
    const mostPercent = [...isMostPercentCache];
    mostPercent.splice(isMostPercentCache.length, 0, "");
    window.localStorage.setItem("mostPercent", JSON.stringify(mostPercent));
    handleSetIsMostPercentCache(mostPercent);
    focusedPercent.handleFocused(true);
  };

  const handleBoxDelete = (index) => {
    focusedPercent.handleFocused(false);
    const mostPercent = [...isMostPercentCache];
    mostPercent.splice(index, 1);
    window.localStorage.setItem("mostPercent", JSON.stringify(mostPercent));
    handleSetIsMostPercentCache(mostPercent);
  };
  const handleAddPercentStockist = () => {
    const percentStockist = [...isPercentStockist];
    percentStockist.splice(isPercentStockist.length, 0, "");
    handleSetIsPercentStockist(percentStockist);
    window.localStorage.setItem(
      "percentStockist",
      JSON.stringify(percentStockist)
    );
    focusedStockist.handleFocused(true);
  };
  const handleBoxDeleteStockist = (index) => {
    focusedStockist.handleFocused(false);
    const percentStockist = [...isPercentStockist];
    percentStockist.splice(index, 1);
    window.localStorage.setItem(
      "percentStockist",
      JSON.stringify(percentStockist)
    );
    handleSetIsPercentStockist(percentStockist);
  };

  const currentDate = new Date();
  return (
    <div>
      <section className="configSection">
        <p className="configSectionP" style={{ color: theme.text }}>
          Porcentaje de lista
        </p>
        <div
          className="configSectionBoxes"
          style={{ borderColor: theme.borderColor }}
        >
          {isMostPercentCache.map((percent, index) => (
            <ConfigPercentBox
              percent={percent}
              index={index}
              getData={isMostPercentCache}
              setData={handleSetIsMostPercentCache}
              isFocused={focusedPercent.focused}
              setIsFocused={focusedPercent.handleFocused}
              handleBoxDelete={handleBoxDelete}
              name="mostPercent"
              key={`${index}${currentDate}`}
            />
          ))}
          {isMostPercentCache.length < 6 ? (
            <button className="configAddButton" onClick={handleAddPercent}>
              <PlusConfig theme={theme} />
            </button>
          ) : (
            <></>
          )}
        </div>
      </section>
      <section className="configSection">
        <p className="configSectionP" style={{ color: theme.text }}>
          porcentajes de viajante
        </p>
        <div
          className="configSectionBoxes"
          style={{ borderColor: theme.borderColor }}
        >
          {isPercentStockist.map((percent, index) => (
            <ConfigPercentBox
              percent={percent}
              index={index}
              getData={isPercentStockist}
              setData={handleSetIsPercentStockist}
              isFocused={focusedStockist.focused}
              setIsFocused={focusedStockist.handleFocused}
              handleBoxDelete={handleBoxDeleteStockist}
              name="percentStockist"
              key={`-${index + 1}${currentDate}`}
            />
          ))}
          {isPercentStockist.length < 6 ? (
            <button
              className="configAddButton"
              onClick={handleAddPercentStockist}
            >
              <PlusConfig theme={theme} />
            </button>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
}

function ConfigSectionPercent() {
  return (
    <ConfigSectionContainer
      content={<ConfigSectionPercentContent />}
      title={"Porcentajes"}
    />
  );
}

export default ConfigSectionPercent;
