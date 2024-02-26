import "./WindowComponent.css";
import { useTheme } from "../../context/ThemeProvider.js";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const CancelIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="WindowNavbarX"
    data-src="/icons/cancel-01-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    style={{ stroke: theme.placeholder }}
  >
    <path
      d="M19 5L5 19M5 5L19 19"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

function WindowComponent({ content, modalType, setModalType, title }) {
  const { theme } = useTheme();
  const handleClose = () => {
    setModalType(false);
  };
  let windowRef = useRef();
  useEffect(() => {
    let windowListener = (e) => {
      try {
        if (!windowRef.current.contains(e.target)) {
          setModalType(false);
        }
      } catch {}
    };
    document.addEventListener("mousedown", windowListener);
  });
  return (
    <div className={modalType ? "WindowContainer" : "WindowContainerHidden"}>
      {modalType ? (
        <motion.div
          className="WindowBG"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          style={{ backgroundColor: theme.background }}
        ></motion.div>
      ) : (
        <></>
      )}
      {modalType ? (
        <motion.div
          className="WindowModal"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          style={{
            backgroundColor: theme.backgroundContainer,
            boxShadow: theme.boxShadow,
          }}
          ref={windowRef}
        >
          <nav className="WindowNavbar">
            <p style={{ color: theme.placeholder }}>{title}</p>
            <button onClick={handleClose} className="WindowNavbarButton">
              <CancelIcon theme={theme} />
            </button>
          </nav>
          {content}
        </motion.div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default WindowComponent;
