import { useEffect, useRef, useState } from "react";
import "../stylesheets/ConfigMostPercentBox.css";

function ConfigMostPercentBox({ percent }) {
  const [number, setNumber] = useState(percent);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

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
    }
  };

  return (
    <div onClick={handleBoxClick} className="ConfigMostPercentBoxContainer">
      {isEditing ? (
        <input
          type="number"
          value={number}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleInputKeyPress}
          ref={inputRef}
        />
      ) : (
        <p>{number}</p>
      )}
    </div>
  );
}
export default ConfigMostPercentBox;
