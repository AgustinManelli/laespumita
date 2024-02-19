import { useEffect, useRef, useState } from "react";
import "./ConfigPercentBox.css";
import { useTheme } from "../../../context/ThemeProvider";

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

const useBoxes = (percent) => {
  const [number, setNumber] = useState(percent);
  const [isEditing, setIsEditing] = useState(false);
  const [boxesHovered, setBoxesHovered] = useState(false);

  const handleSetNumber = (e) => {
    setNumber(e);
  };
  const handleSetIsEditing = (e) => {
    setIsEditing(e);
  };
  const handleSetBoxesHovered = (e) => {
    setBoxesHovered(e);
  };

  return {
    number,
    isEditing,
    boxesHovered,
    handleSetNumber,
    handleSetIsEditing,
    handleSetBoxesHovered,
  };
};

function ConfigPercentBox({
  percent,
  index,
  getData,
  setData,
  isFocused,
  setIsFocused,
  handleBoxDelete,
  name,
}) {
  const { theme } = useTheme();
  const inputRef = useRef(null);

  const {
    number,
    isEditing,
    boxesHovered,
    handleSetNumber,
    handleSetIsEditing,
    handleSetBoxesHovered,
  } = useBoxes(percent);

  const handleMouseEnter = () => {
    handleSetBoxesHovered(true);
  };

  const handleMouseLeave = () => {
    handleSetBoxesHovered(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isFocused && inputRef.current && index === getData.length - 1) {
      inputRef.current.focus();
    }
  }, [isFocused, getData]);

  const handleBoxClick = () => {
    handleSetIsEditing(true);
  };

  const handleInputChange = (event) => {
    handleSetNumber(event.target.value);
  };

  const handleInputBlur = () => {
    handleSetIsEditing(false);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSetIsEditing(false);
      setIsFocused(false);
      const mostPercent = [...getData];
      mostPercent[index] = parseInt(number);
      mostPercent.sort((a, b) => a - b);
      window.localStorage.setItem(name, JSON.stringify(mostPercent));
      setData(mostPercent);
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
        {isEditing || (isFocused && index + 1 === getData.length) ? (
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
        style={{ backgroundColor: theme.backgroundContainerFull }}
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
export default ConfigPercentBox;
