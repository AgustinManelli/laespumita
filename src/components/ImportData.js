import React, { useState } from "react";
import "../stylesheets/ImportData.css";
import { useTheme } from "../context/ThemeProvider";
import { useInputs } from "../store/inputs.js";
import { useStoredProducts } from "../store/storedProducts.js";

const UploadFile = ({ theme, hover }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="UploadFile"
    style={{ stroke: hover ? theme.stroke : theme.secondTitles }}
  >
    <path
      d="M12.5 2H12.7727C16.0339 2 17.6645 2 18.7969 2.79784C19.1214 3.02643 19.4094 3.29752 19.6523 3.60289C20.5 4.66867 20.5 6.20336 20.5 9.27273V11.8182C20.5 14.7814 20.5 16.2629 20.0311 17.4462C19.2772 19.3486 17.6829 20.8491 15.6616 21.5586C14.4044 22 12.8302 22 9.68182 22C7.88275 22 6.98322 22 6.26478 21.7478C5.10979 21.3424 4.19875 20.4849 3.76796 19.3979C3.5 18.7217 3.5 17.8751 3.5 16.1818V12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5 12C20.5 13.8409 19.0076 15.3333 17.1667 15.3333C16.5009 15.3333 15.716 15.2167 15.0686 15.3901C14.4935 15.5442 14.0442 15.9935 13.8901 16.5686C13.7167 17.216 13.8333 18.0009 13.8333 18.6667C13.8333 20.5076 12.3409 22 10.5 22"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 4.5C4.99153 3.9943 6.29977 2 7 2M9.5 4.5C9.00847 3.9943 7.70023 2 7 2M7 2L7 10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ImportData() {
  const { theme } = useTheme();
  const [hover, setHover] = useState(false);

  const handleSetStoredProducts = useStoredProducts(
    (state) => state.handleSetStoredProducts
  );
  const handleSetStoredTotal = useStoredProducts(
    (state) => state.handleSetStoredTotal
  );
  const handleSetStoredMonthly = useStoredProducts(
    (state) => state.handleSetStoredMonthly
  );

  const handleSetIsMostPercentCache = useInputs(
    (state) => state.handleSetIsMostPercentCache
  );
  const handleSetIsPercentStockist = useInputs(
    (state) => state.handleSetIsPercentStockist
  );

  const handleEnter = () => {
    setHover(true);
  };
  const handleLeave = () => {
    setHover(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const value = JSON.parse(`[${reader.result}]`);
      window.localStorage.setItem("products", JSON.stringify(value[0]));
      window.localStorage.setItem("total", JSON.stringify(value[1]));
      window.localStorage.setItem("monthly", JSON.stringify(value[2]));
      window.localStorage.setItem("mostPercent", JSON.stringify(value[3]));
      window.localStorage.setItem("percentStockist", JSON.stringify(value[4]));
      handleSetStoredProducts(value[0]);
      handleSetStoredTotal(value[1]);
      handleSetStoredMonthly(value[2]);
      handleSetIsMostPercentCache(value[3]);
      handleSetIsPercentStockist(value[4]);
    };
    reader.readAsText(file);
  };

  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        position: "relative",
        cursor: "pointer",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <label
        style={{ width: "24px", height: "24px", cursor: "pointer" }}
        htmlFor="file"
      >
        <input id="file" type="file" accept=".txt" onChange={handleChange} />
        <UploadFile theme={theme} hover={hover} />
      </label>
    </div>
  );
}

export default ImportData;
