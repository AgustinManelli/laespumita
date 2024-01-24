import { useEffect, useRef, useState } from "react";
import "../stylesheets/ConfigMostPercentBox.css";
import { useTheme } from "../context/ThemeProvider";

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="ConfigMostPercentBoxX"
    data-src="/icons/cancel-01-stroke-rounded.svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
  >
    <path
      d="M19 5L5 19M5 5L19 19"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

function ConfigMostPercentBox({
  percent,
  index,
  isMostPercentCache,
  setIsMostPercentCache,
  isFocused,
  setIsFocused,
  handleBoxDelete,
  name,
}) {
  const [number, setNumber] = useState(percent);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [boxesHovered, setBoxesHoveres] = useState(false);

  const handleMouseEnter = () => {
    setBoxesHoveres(true);
  };
  const handleMouseLeave = () => {
    setBoxesHoveres(false);
  };

  const { theme } = useTheme();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (
      isFocused &&
      inputRef.current &&
      index === isMostPercentCache.length - 1
    ) {
      inputRef.current.focus();
    }
  }, [isFocused, isMostPercentCache]);

  const handleBoxClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setNumber(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      setIsFocused(false);
      const mostPercent = [...isMostPercentCache];
      mostPercent[index] = parseInt(number);
      setIsMostPercentCache(mostPercent);
      window.localStorage.setItem(name, JSON.stringify(mostPercent));
    }
  };

  return (
    <div className="ConfigMostPercentBoxContainerTotal">
      <div
        onClick={handleBoxClick}
        className="ConfigMostPercentBoxContainer"
        style={{
          backgroundColor: boxesHovered ? theme.hover : theme.backgroundOverall,
          color: theme.secondTitles,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isEditing || (isFocused && index + 1 === isMostPercentCache.length) ? (
          <input
            type="number"
            value={number}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={handleInputKeyPress}
            ref={inputRef}
            style={{
              backgroundColor: theme.hover,
              color: theme.secondTitles,
            }}
          />
        ) : (
          <p>{number}</p>
        )}
      </div>
      <div
        className="configAddButtonContainer"
        style={{ backgroundColor: theme.backgroundContainer }}
      >
        <button
          className="ConfigMostPercentBoxDelete"
          onClick={() => {
            handleBoxDelete(index);
          }}
        >
          {<CancelIcon />}
        </button>
      </div>
    </div>
  );
}
export default ConfigMostPercentBox;
