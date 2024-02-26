import { useEffect, useRef, useState } from "react";
import "./ConfigDropdown.css";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeProvider";
import { useModal } from "../../store/modal";

const InfoIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{
      width: "20px",
      stroke: theme.text,
      transition: "stroke 0.3s ease-in-out",
    }}
  >
    <path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      strokeWidth="2"
    />
    <path
      d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.992 8H12.001"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = ({ theme, isDark }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="ThemeIcon"
    data-src="https://hugeicons.storage.googleapis.com/icons/moon-02-stroke-rounded.svg?type=svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{ stroke: theme.text }}
  >
    <path
      d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="MoonIconMoon"
      style={{
        transform: isDark ? "scale(80%)" : "none",
        strokeWidth: isDark ? "2.5" : "2",
      }}
    ></path>
    <circle
      style={{
        fill: isDark ? theme.borderColor : "transparent",
        transform: isDark ? "none" : "translateY(10px)",
      }}
      className="MoonIconWorld"
      cx="12"
      cy="51.6"
      r="33"
    />
    <path
      d="M17.4776 10.0001C17.485 10 17.4925 10 17.5 10C19.9853 10 22 12.0147 22 14.5C22 16.9853 19.9853 19 17.5 19H7C4.23858 19 2 16.7614 2 14C2 11.4003 3.98398 9.26407 6.52042 9.0227M17.4776 10.0001C17.4924 9.83536 17.5 9.66856 17.5 9.5C17.5 6.46243 15.0376 4 12 4C9.12324 4 6.76233 6.20862 6.52042 9.0227M17.4776 10.0001C17.3753 11.1345 16.9286 12.1696 16.2428 13M6.52042 9.0227C6.67826 9.00768 6.83823 9 7 9C8.12582 9 9.16474 9.37209 10.0005 10"
      style={{
        fill: isDark ? theme.borderColor : "transparent",
        animation: isDark ? "cloudMove 20s linear infinite 3s" : "none",
      }}
      className="SunIconCloud"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const SunIcon = ({ theme, isLight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="ThemeIcon"
    data-src="https://hugeicons.storage.googleapis.com/icons/sun-03-stroke-rounded.svg?type=svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{ stroke: theme.text }}
  >
    <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"></path>
    <path
      d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
      strokeLinecap="round"
      className="SunIconRay"
      style={{
        animation: isLight ? "configSun 20s linear infinite" : "none",
        filter: isLight ? "blur(0.3px)" : "none",
      }}
    ></path>
    <path
      d="M17.4776 10.0001C17.485 10 17.4925 10 17.5 10C19.9853 10 22 12.0147 22 14.5C22 16.9853 19.9853 19 17.5 19H7C4.23858 19 2 16.7614 2 14C2 11.4003 3.98398 9.26407 6.52042 9.0227M17.4776 10.0001C17.4924 9.83536 17.5 9.66856 17.5 9.5C17.5 6.46243 15.0376 4 12 4C9.12324 4 6.76233 6.20862 6.52042 9.0227M17.4776 10.0001C17.3753 11.1345 16.9286 12.1696 16.2428 13M6.52042 9.0227C6.67826 9.00768 6.83823 9 7 9C8.12582 9 9.16474 9.37209 10.0005 10"
      style={{
        fill: isLight ? theme.borderColor : "transparent",
        animation: isLight ? "cloudMove 20s linear infinite 3s" : "none",
      }}
      className="SunIconCloud"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const MoreIcon = ({ theme, isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="MoreIcon"
    stroke={isOpen ? "#008fd2" : theme.placeholder}
  >
    <path
      d="M11.992 12H12.001"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9842 18H11.9932"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="MoreIconChild"
    />
    <path
      d="M11.9998 6H12.0088"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="MoreIconChild"
    />
  </svg>
);

const ConfigIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    fill="none"
    style={{
      width: "20px",
      stroke: theme.text,
      transition: "stroke 0.3s ease-in-out",
    }}
  >
    <path
      class="st0"
      d="M2.5,12c0-4.5,0-6.7,1.4-8.1C5.3,2.5,7.5,2.5,12,2.5c4.5,0,6.7,0,8.1,1.4c1.4,1.4,1.4,3.6,1.4,8.1
	c0,4.5,0,6.7-1.4,8.1c-1.4,1.4-3.6,1.4-8.1,1.4c-4.5,0-6.7,0-8.1-1.4C2.5,18.7,2.5,16.5,2.5,12z"
      strokeWidth="2"
    />
    <path
      d="M16.8,13c-0.2-0.2-0.3-0.5-0.3-0.8c0-0.3,0.1-0.6,0.3-0.8l0.6-0.7c0.3-0.3,0.4-0.5,0.5-0.7c0-0.2-0.1-0.4-0.3-0.8l-0.3-0.5
	C17.1,8.3,17,8.1,16.8,8c-0.2-0.1-0.4,0-0.8,0.1l-0.8,0.2c-0.3,0.1-0.6,0-0.8-0.1l-0.2-0.1c-0.2-0.1-0.4-0.3-0.5-0.6l-0.2-0.6
	c-0.1-0.4-0.2-0.6-0.4-0.7c-0.2-0.1-0.4-0.1-0.8-0.1h-0.7c-0.4,0-0.6,0-0.8,0.1c-0.1,0.1-0.2,0.3-0.4,0.7l-0.2,0.6
	C10.2,7.8,10,8,9.8,8.1L9.6,8.2C9.3,8.3,9.1,8.4,8.8,8.3L8,8.1C7.6,8,7.4,7.9,7.2,8C7,8.1,6.9,8.3,6.7,8.7L6.3,9.2
	C6.1,9.6,6,9.8,6,10c0,0.2,0.2,0.3,0.5,0.7l0.6,0.7c0.2,0.2,0.3,0.5,0.3,0.8c0,0.3-0.1,0.6-0.3,0.8l-0.6,0.7C6.2,14,6.1,14.2,6,14.4
	c0,0.2,0.1,0.4,0.3,0.8l0.3,0.5C6.9,16,7,16.2,7.2,16.3c0.2,0.1,0.4,0,0.8-0.1L8.8,16c0.3-0.1,0.6,0,0.8,0.1l0.2,0.1
	c0.2,0.1,0.4,0.3,0.5,0.6l0.2,0.6c0.1,0.4,0.2,0.6,0.4,0.7c0.2,0.1,0.4,0.1,0.8,0.1h0.7c0.4,0,0.6,0,0.8-0.1
	c0.2-0.1,0.2-0.3,0.4-0.7l0.2-0.6c0.1-0.2,0.3-0.5,0.5-0.6l0.2-0.1c0.2-0.1,0.5-0.2,0.8-0.1l0.8,0.2c0.4,0.1,0.7,0.2,0.8,0.1
	c0.2-0.1,0.3-0.3,0.5-0.7l0.3-0.5c0.2-0.4,0.3-0.5,0.3-0.8c0-0.2-0.2-0.4-0.5-0.7L16.8,13z M12,14.3c-1.2,0-2.1-1-2.1-2.1
	c0-1.2,1-2.1,2.1-2.1c1.2,0,2.1,0.9,2.1,2.1C14.1,13.3,13.2,14.3,12,14.3z"
      style={{ transition: "fill 0.3s ease-in-out", fill: theme.text }}
    />
    <path
      class="st1"
      d="M14.1,12.2c0,1.2-1,2.1-2.1,2.1c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1C13.2,10,14.1,11,14.1,12.2z"
      style={{
        display: "none",
        fill: "none",
        strokeWidth: "1.5",
      }}
    />
    <path
      class="st1"
      d="M14.1,12.2c0,1.2-1,2.1-2.1,2.1c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1C13.2,10,14.1,11,14.1,12.2z"
      stroke={theme.text}
      style={{
        display: "none",
        fill: "none",
        strokeWidth: "1.5",
      }}
    />
  </svg>
);

const useLight = (initial) => {
  const [light, setLight] = useState(initial);

  const handleLight = (e) => {
    setLight(e);
  };
  return { light, handleLight };
};

const useHover = () => {
  const [hover, setHover] = useState(false);

  const handleHover = (e) => {
    setHover(e);
  };
  return { hover, handleHover };
};

function ConfigDropdown() {
  const { theme, setLight, setDark } = useTheme();

  const setConfigModal = useModal((state) => state.setConfigModal);
  const setAboutModal = useModal((state) => state.setAboutModal);

  const item1 = useHover();
  const item2 = useHover();

  const [isOpen, setIsOpen] = useState(false);

  const lightLight = useLight(
    window.localStorage.getItem("theme") &&
      window.localStorage.getItem("theme") === "light"
      ? true
      : false
  );

  const lightDark = useLight(
    window.localStorage.getItem("theme") &&
      window.localStorage.getItem("theme") === "dark"
      ? true
      : false
  );

  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const handleCheckboxChangeLight = () => {
    window.localStorage.setItem("theme", "light");
    lightLight.handleLight(true);
    lightDark.handleLight(false);
    setLight();
  };

  const handleCheckboxChangeDark = () => {
    window.localStorage.setItem("theme", "dark");
    lightLight.handleLight(false);
    lightDark.handleLight(true);
    setDark();
  };

  let configRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      try {
        if (!configRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      } catch {}
    };
    document.addEventListener("mousedown", handler);
  });

  return (
    <motion.nav
      className="DDContainer"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      id="DDContainer"
      ref={configRef}
    >
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="DDButton"
      >
        <MoreIcon theme={theme} isOpen={isOpen} />
      </motion.button>
      <motion.div
        className="DDContent"
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
        <div className="DDContainerData">
          <section className="DDSection">
            <div className="DDSectionThemeRadioContainerTotal">
              <p
                className="configSectionPercentP"
                style={{ color: theme.placeholder }}
              >
                tema
              </p>
              <div className="DDSectionThemeRadioContainer">
                <div
                  className="DDSectionThemeRadio"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: theme.borderColor,
                  }}
                >
                  <label className="DDradio">
                    <input
                      type="radio"
                      name="DDradio"
                      checked={lightLight.light}
                      onChange={handleCheckboxChangeLight}
                    />
                    <span
                      className="DDname"
                      style={{
                        backgroundColor: lightLight.light
                          ? theme.borderColor
                          : "transparent",
                        color: theme.text,
                      }}
                    >
                      <SunIcon theme={theme} isLight={lightLight.light} />
                      claro
                    </span>
                  </label>
                  <label className="DDradio">
                    <input
                      type="radio"
                      name="DDradio"
                      checked={lightDark.light}
                      onChange={handleCheckboxChangeDark}
                    />
                    <span
                      className="DDname"
                      style={{
                        backgroundColor: lightDark.light
                          ? theme.borderColor
                          : "transparent",
                        color: theme.text,
                      }}
                    >
                      <MoonIcon theme={theme} isDark={lightDark.light} />
                      oscuro
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>
          <div
            className="DDSeparator"
            style={{ backgroundColor: theme.borderColor }}
          ></div>
          <section
            className="DDSection"
            style={{ display: "flex", gap: "7px" }}
          >
            <button
              onClick={() => {
                setConfigModal(true);
                setIsOpen(false);
              }}
              className="DDSectionButton"
              style={{
                backgroundColor: item1.hover ? theme.hover : "transparent",
              }}
              onMouseEnter={() => {
                item1.handleHover(true);
              }}
              onMouseLeave={() => {
                item1.handleHover(false);
              }}
            >
              <ConfigIcon theme={theme} />
              <p
                style={{
                  color: theme.text,
                  fontWeight: "500",
                  fontSize: "15px",
                }}
              >
                Configuración
              </p>
            </button>

            <button
              onClick={() => {
                setAboutModal(true);
                setIsOpen(false);
              }}
              className="DDSectionButton"
              style={{
                backgroundColor: item2.hover ? theme.hover : "transparent",
              }}
              onMouseEnter={() => {
                item2.handleHover(true);
              }}
              onMouseLeave={() => {
                item2.handleHover(false);
              }}
            >
              <InfoIcon theme={theme} />
              <p
                style={{
                  color: theme.text,
                  fontWeight: "500",
                  fontSize: "15px",
                }}
              >
                Acerca de
              </p>
            </button>
          </section>
          <div
            className="DDSeparator"
            style={{ backgroundColor: theme.borderColor }}
          ></div>
          <footer>
            <div
              className="DDFooter"
              style={{ backgroundColor: theme.backgroundOverall }}
            >
              <p style={{ color: theme.placeholder }}>
                {year} La espumita · Argentina
              </p>
            </div>
          </footer>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default ConfigDropdown;
