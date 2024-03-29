import "./DownloadData.css";
import { useTheme } from "../../../../context/ThemeProvider";
import { useState } from "react";

const DonwloadIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="DonwloadIcon"
    style={{ stroke: theme.placeholder }}
  >
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" />
    <path
      d="M12.0025 7.03857L12.0025 14.0889M12.0025 14.0889C12.3286 14.0933 12.6503 13.8691 12.8876 13.5956L14.4771 11.8129M12.0025 14.0889C11.6879 14.0847 11.3693 13.8618 11.1174 13.5955L9.51864 11.8129M7.98633 17.0386L15.9863 17.0386"
      strokeLinecap="round"
    />
  </svg>
);
function DownloadData() {
  const [hover, setHover] = useState(false);
  const { theme } = useTheme();
  const handleEnter = () => {
    setHover(true);
  };
  const handleLeave = () => {
    setHover(false);
  };
  const handleClick = () => {
    const currentDate = new Date();
    const timeNow = `${
      (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate()
    }${
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1)
    }${currentDate.getFullYear()}${
      (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours()
    }`;
    const dataInfoTotal = [];
    dataInfoTotal.push(
      window.localStorage.getItem("products")
        ? window.localStorage.getItem("products")
        : []
    );
    dataInfoTotal.push(
      window.localStorage.getItem("total")
        ? window.localStorage.getItem("total")
        : []
    );
    dataInfoTotal.push(
      window.localStorage.getItem("monthly")
        ? window.localStorage.getItem("monthly")
        : []
    );
    dataInfoTotal.push(
      window.localStorage.getItem("mostPercent")
        ? window.localStorage.getItem("mostPercent")
        : []
    );
    dataInfoTotal.push(
      window.localStorage.getItem("percentStockist")
        ? window.localStorage.getItem("percentStockist")
        : []
    );

    const file = new File([dataInfoTotal], `data-laespumita-${timeNow}.txt`, {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-laespumita-${timeNow}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleClick}
      className="DonwloadDataButton"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        backgroundColor: hover ? theme.hover : "transparent",
        border: "solid 1px",
        borderColor: theme.borderColor,
      }}
    >
      <DonwloadIcon theme={theme} />
      <p style={{ color: theme.placeholder }}>importar datos</p>
    </button>
  );
}

export default DownloadData;
