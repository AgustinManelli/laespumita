import { useState } from "react";
import { motion } from "framer-motion";
import "../stylesheets/ConfigDropdown.css";
import ConfigMostPercentBox from "./ConfigMostPercentBox";
import { useTheme } from "../context/ThemeProvider";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

function ConfigDropdown({
  isMostPercentCache,
  setIsMostPercentCache,
  isPercentStockist,
  setIsPercentStockist,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedStockist, setIsFocusedStockist] = useState(false);
  const [isLight, setIsLight] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const currentDate = new Date();

  const { theme, setLight, setDark } = useTheme();

  const handleCheckboxChange1 = () => {
    setIsLight(!isLight);
    setIsDark(false);
    setLight();
  };

  const handleCheckboxChange2 = () => {
    setIsDark(!isDark);
    setIsLight(false);
    setDark();
  };
  const MoonIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="ThemeIcon"
      data-src="https://hugeicons.storage.googleapis.com/icons/moon-02-stroke-rounded.svg?type=svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      style={{ stroke: theme.secondTitles }}
    >
      <path
        d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
  const SunIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="ThemeIcon"
      data-src="https://hugeicons.storage.googleapis.com/icons/sun-03-stroke-rounded.svg?type=svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      style={{ stroke: theme.secondTitles }}
    >
      <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"></path>
      <path
        d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
        strokeLinecap="round"
        class="SunIconRay"
      ></path>
    </svg>
  );

  const PlusConfig = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="PlusConfig"
      data-src="/icons/plus-sign-square-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      style={{ stroke: theme.stroke }}
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

  const ConfigIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="ConfigIcon"
      data-src="/icons/settings-01-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      style={{ stroke: theme.stroke }}
    >
      <path
        d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"
        strokeLinecap="round"
        className="ConfigIconGear"
      ></path>
      <path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z"></path>
    </svg>
  );

  const handleAddPercent = () => {
    const mostPercent = [...isMostPercentCache];
    mostPercent.splice(isMostPercentCache.length, 0, "");
    setIsMostPercentCache(mostPercent);
    window.localStorage.setItem("mostPercent", JSON.stringify(mostPercent));
    setIsFocused(true);
  };

  const handleBoxDelete = (index) => {
    setIsFocused(false);
    const mostPercent = [...isMostPercentCache];
    mostPercent.splice(index, 1);
    window.localStorage.setItem("mostPercent", JSON.stringify(mostPercent));
    setIsMostPercentCache(mostPercent);
  };

  const handleAddPercentStockist = () => {
    const percentStockist = [...isPercentStockist];
    percentStockist.splice(isPercentStockist.length, 0, "");
    setIsPercentStockist(percentStockist);
    window.localStorage.setItem(
      "percentStockist",
      JSON.stringify(percentStockist)
    );
    setIsFocusedStockist(true);
  };

  const handleBoxDeleteStockist = (index) => {
    setIsFocusedStockist(false);
    const percentStockist = [...isPercentStockist];
    percentStockist.splice(index, 1);
    window.localStorage.setItem(
      "percentStockist",
      JSON.stringify(percentStockist)
    );
    setIsPercentStockist(percentStockist);
  };

  return (
    <motion.nav
      className="configDDContainer"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      id="configDDContainer"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="configDDButton"
      >
        <motion.div className="configDDSelected">
          <ConfigIcon />
        </motion.div>
      </motion.button>
      <motion.div
        className="configDDContent"
        variants={{
          open: {
            opacity: 1,
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
              delayChildren: 0.1,
              staggerChildren: 0.05,
            },
          },
          closed: {
            opacity: 0,
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          paddingLeft: "0px",
          backgroundColor: theme.backgroundContainer,
          boxShadow: theme.boxShadow,
        }}
      >
        <div className="configContainer">
          <header className="configHeader">
            <h2 style={{ color: theme.secondTitles }}>configuración</h2>
          </header>
          <div
            className="confiSeparator"
            style={{ backgroundColor: theme.borderColor }}
          ></div>
          <section className="configSection">
            <div className="configSectionPercent">
              <p
                className="configSectionPercentP"
                style={{ color: theme.text }}
              >
                porcentajes
              </p>
              <div
                className="configSectionBoxes"
                style={{ borderColor: theme.borderColor }}
              >
                {isMostPercentCache.map((percent, index) => (
                  <ConfigMostPercentBox
                    percent={percent}
                    index={index}
                    isMostPercentCache={isMostPercentCache}
                    setIsMostPercentCache={setIsMostPercentCache}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    handleBoxDelete={handleBoxDelete}
                    name="mostPercent"
                    key={`${index}${currentDate}`}
                  />
                ))}
                {isMostPercentCache.length < 6 ? (
                  <button
                    className="configAddButton"
                    onClick={handleAddPercent}
                  >
                    <PlusConfig />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="configSectionPercent">
              <p
                className="configSectionPercentP"
                style={{ color: theme.text }}
              >
                porcentajes viajantes
              </p>
              <div
                className="configSectionBoxes"
                style={{ borderColor: theme.borderColor }}
              >
                {isPercentStockist.map((percent, index) => (
                  <ConfigMostPercentBox
                    percent={percent}
                    index={index}
                    isMostPercentCache={isPercentStockist}
                    setIsMostPercentCache={setIsPercentStockist}
                    isFocused={isFocusedStockist}
                    setIsFocused={setIsFocusedStockist}
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
                    <PlusConfig />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="configSectionThemeRadioContainerTotal">
              <p
                className="configSectionPercentP"
                style={{ color: theme.text }}
              >
                tema
              </p>
              <div className="configSectionThemeRadioContainer">
                <div
                  className="configSectionThemeRadio"
                  style={{
                    backgroundColor: theme.backgroundOverall,
                    borderColor: theme.borderColor,
                  }}
                >
                  <label className="radio">
                    <input
                      type="radio"
                      name="radio"
                      checked={isLight}
                      onChange={handleCheckboxChange1}
                    />
                    <span
                      className="name"
                      style={{
                        backgroundColor: isLight ? theme.hover : "transparent",
                        color: theme.secondTitles,
                      }}
                    >
                      <SunIcon />
                      claro
                    </span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="radio"
                      checked={isDark}
                      onChange={handleCheckboxChange2}
                    />
                    <span
                      className="name"
                      style={{
                        backgroundColor: isDark ? theme.hover : "transparent",
                        color: theme.secondTitles,
                      }}
                    >
                      <MoonIcon />
                      oscuro
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>
          <div
            className="confiSeparator"
            style={{ backgroundColor: theme.borderColor }}
          ></div>
          <footer>
            <div
              className="configFooter"
              style={{ backgroundColor: theme.backgroundOverall }}
            >
              <p style={{ color: theme.secondTitles }}>
                2024 La espumita · Argentina
              </p>
            </div>
          </footer>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default ConfigDropdown;
