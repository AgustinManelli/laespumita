import { useState } from "react";
import { motion } from "framer-motion";
import "../stylesheets/StockistDropdown.css";
import { useTheme } from "../context/ThemeProvider";

function StockistDDLi({ index, stockistPercent, stockist, setIsOpen }) {
  const { theme } = useTheme();
  const [boxesHovered, setBoxesHoveres] = useState(false);

  const handleMouseEnter = () => {
    setBoxesHoveres(true);
  };
  const handleMouseLeave = () => {
    setBoxesHoveres(false);
  };
  return (
    <>
      <motion.li
        key={index}
        variants={itemVariants}
        onClick={() => {
          stockistPercent(`${stockist}`);
          setIsOpen(false);
        }}
        style={{
          color: theme.secondTitles,
          backgroundColor: boxesHovered
            ? theme.hover
            : theme.backgroundContainer,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div>
          <p className="stockistDDSelected">{stockist}</p>
        </motion.div>
      </motion.li>
    </>
  );
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const StockistIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="StockistIcon"
    data-src="/icons/truck-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <circle cx="17" cy="18" r="2"></circle>
    <circle cx="7" cy="18" r="2"></circle>
    <path
      d="M11 17H15M13.5 7H14.4429C15.7533 7 16.4086 7 16.9641 7.31452C17.5196 7.62904 17.89 8.20972 18.6308 9.37107C19.1502 10.1854 19.6955 10.7765 20.4622 11.3024C21.2341 11.8318 21.6012 12.0906 21.8049 12.506C22 12.9038 22 13.375 22 14.3173C22 15.5596 22 16.1808 21.651 16.5755C21.636 16.5925 21.6207 16.609 21.6049 16.625C21.2375 17 20.6594 17 19.503 17H19"
      className="StockistIconTruck"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M13 7L13.9942 9.48556C14.4813 10.7034 14.7249 11.3123 15.2328 11.6561C15.7407 12 16.3965 12 17.7081 12H21"
      className="StockistIconTruck"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M4.86957 17C3.51684 17 2.84048 17 2.42024 16.5607C2 16.1213 2 15.4142 2 14V7C2 5.58579 2 4.87868 2.42024 4.43934C2.84048 4 3.51684 4 4.86957 4H10.1304C11.4832 4 12.1595 4 12.5798 4.43934C13 4.87868 13 5.58579 13 7V17H8.69565"
      className="StockistIconTruck"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M-2 7H8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="StockistIconLine"
    ></path>
    <path
      d="M-2 11H6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="StockistIconLine"
      style={{ animationDelay: "0.1s" }}
    ></path>
  </svg>
);

function SrockistDropdown({ isStockist, stockistPercent, isPercentStockist }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const [boxesHovered, setBoxesHoveres] = useState(false);
  const handleMouseEnter = () => {
    setBoxesHoveres(true);
  };
  const handleMouseLeave = () => {
    setBoxesHoveres(false);
  };

  const closeStockistDropdown = () => {
    window.addEventListener("click", function (e) {
      if (document.getElementById("languageBottom").contains(e.target)) {
      } else {
        setIsOpen(false);
      }
    });
  };

  return (
    <motion.nav
      className="stockistDDContainer"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      id="languageBottom"
      ref={closeStockistDropdown()}
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        style={
          isStockist > 0
            ? { backgroundColor: "#008fd2" }
            : { backgroundColor: theme.backgroundOverall }
        }
      >
        <motion.div
          className="stockistDDSelected"
          style={isStockist > 0 ? { color: "#fff" } : {}}
        >
          {isStockist > 0 ? <p>{isStockist}</p> : <StockistIcon />}
        </motion.div>
        {isStockist > 0 ? (
          <div
            className="stockistDDAlertContainer"
            style={{ backgroundColor: theme.backgroundContainer }}
          >
            <div className="stockistDDAlert"></div>
          </div>
        ) : (
          <></>
        )}
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
              delayChildren: 0.1,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
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
        }}
      >
        <motion.li
          variants={itemVariants}
          onClick={() => {
            stockistPercent("0");
            setIsOpen(false);
          }}
          style={{
            color: theme.secondTitles,
            backgroundColor: boxesHovered
              ? theme.hover
              : theme.backgroundContainer,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div>
            <p className="stockistDDSelected">0</p>
          </motion.div>
        </motion.li>

        {isPercentStockist.map((stockist, index) => (
          <StockistDDLi
            index={index}
            stockistPercent={stockistPercent}
            stockist={stockist}
            setIsOpen={setIsOpen}
          />
        ))}
      </motion.ul>
    </motion.nav>
  );
}

export default SrockistDropdown;
