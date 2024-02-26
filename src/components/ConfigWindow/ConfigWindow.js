import "./ConfigWindow.css";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeProvider.js";
import { useModal } from "../../store/modal.js";
import { useState } from "react";
import ConfigSectionPercent from "./ConfigSectionPercent/ConfigSectionPercent.js";
import ConfigSectionData from "./ConfigSectionData/ConfigSectionData.js";
import WindowComponent from "../WindowComponent/WindowComponent.js";

const CancelIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="totalWindowNavbarX"
    data-src="/icons/cancel-01-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{ stroke: theme.stroke }}
  >
    <path
      d="M19 5L5 19M5 5L19 19"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const useSelectorHover = () => {
  const [hover, setHover] = useState(false);
  const handleSetHover = (e) => {
    setHover(e);
  };
  return { hover, handleSetHover };
};

const useConfigSelector = () => {
  const [selector, setSelector] = useState("percent");
  const handleSetSelector = (e) => {
    setSelector(e);
  };
  return { selector, setSelector };
};

function ConfigContent() {
  const { theme } = useTheme();
  const selector1 = useSelectorHover();
  const selector2 = useSelectorHover();
  const { selector, setSelector } = useConfigSelector();
  return (
    <section className="configWindowModalContent">
      <nav className="configWindowModalContentNav">
        <button
          className="configWindowModalContentNavBtn"
          style={{
            backgroundColor:
              selector1.hover || selector === "percent"
                ? theme.hover
                : "transparent",
            color: theme.text,
          }}
          onMouseEnter={() => {
            selector1.handleSetHover(true);
          }}
          onMouseLeave={() => {
            selector1.handleSetHover(false);
          }}
          onClick={() => {
            setSelector("percent");
          }}
        >
          <p>Porcentajes</p>
        </button>
        <button
          className="configWindowModalContentNavBtn"
          style={{
            backgroundColor:
              selector2.hover || selector === "data"
                ? theme.hover
                : "transparent",
            color: theme.text,
          }}
          onMouseEnter={() => {
            selector2.handleSetHover(true);
          }}
          onMouseLeave={() => {
            selector2.handleSetHover(false);
          }}
          onClick={() => {
            setSelector("data");
          }}
        >
          <p>Control de datos</p>
        </button>
        <div
          style={{
            position: "absolute",
            width: "1px",
            height: "100%",
            backgroundColor: theme.borderColor,
            right: "0",
          }}
        ></div>
      </nav>
      {selector === "percent" ? <ConfigSectionPercent /> : <></>}
      {selector === "data" ? <ConfigSectionData /> : <></>}
    </section>
  );
}

function ConfigWindow() {
  const configModal = useModal((state) => state.configModal);
  const setConfigModal = useModal((state) => state.setConfigModal);

  return (
    <WindowComponent
      content={<ConfigContent />}
      modalType={configModal}
      setModalType={setConfigModal}
      title={"configuración"}
    />
  );
}

export default ConfigWindow;
