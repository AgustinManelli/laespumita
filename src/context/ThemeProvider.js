import { useContext } from "react";

const { useState } = require("react");
const { createContext } = require("react");

const themeStyles = {
  light: {
    background: "#eff2f5",
    backgroundContainer: "rgba(255,255,255,0.6)",
    backgroundContainerFull: "rgba(255,255,255,1)",
    button: "rgb(236,238,240)",
    text: "rgb(39, 39, 43)",
    input: "rgb(224,227,230)",
    boxShadow:
      "rgba(12, 20, 66, 0.02) 0px 4px 12px,rgba(12, 20, 66, 0.08) 0px 30px 80px,rgb(230, 233, 237) 0px 0px 0px 0px inset",
    hover: "rgb(231, 233, 236)",
    placeholder: "rgb(142, 147, 154)",
    borderColor: "rgb(226, 231, 237)",
    hover: "rgb(231, 233, 236,0.5)",
  },
  dark: {
    background: "rgb(35, 37, 41)",
    backgroundContainer: "rgba(43, 46, 53, 0.6)",
    backgroundContainerFull: "rgba(43, 46, 53, 1)",
    button: "rgb(47,52,61)",
    text: "rgb(255, 255, 255)",
    input: "rgb(42,46,55)",
    boxShadow:
      "rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.04) 0px 2px 8px, rgba(0, 0, 0, 0.05) 0px 30px 70px",
    hover: "rgb(44, 49, 57)",
    placeholder: "rgb(142, 147, 154)",
    borderColor: "rgb(61, 66, 74)",
    hover: "rgb(61,66,74,0.5)",
  },
  /*light: {
    buttons: "#f5f7fa",
    *background: "#eff2f5",
    *backgroundContainer: "rgba(255,255,255,0.6)",
    *backgroundContainerFull: "rgba(255,255,255,1)",
    backgroundOverall: "rgba(245, 247, 250, 0.9)",
    hover: "rgb(231, 233, 236)",
    stroke: "rgb(134, 134, 134)",
    boxShadow:
      "rgba(12, 20, 66, 0.02) 0px 4px 12px,rgba(12, 20, 66, 0.08) 0px 30px 80px,rgb(230, 233, 237) 0px 0px 0px 0px inset",
    secondTitles: "rgb(142, 147, 154)",
    text: "rgb(39, 39, 43)",
    borderColor: "rgb(242, 244, 247)",
  },
  dark: {
    buttons: "#393d46",
    *background: "rgb(35, 37, 41)",
    *backgroundContainer: "rgba(43, 46, 53, 0.6)",
    *backgroundContainerFull: "rgba(43, 46, 53, 1)",
    backgroundOverall: "rgba(47, 52, 61, 0.5)",
    hover: "rgb(76, 81, 88)",
    stroke: "#fff",
    boxShadow:
      "rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.04) 0px 2px 8px, rgba(0, 0, 0, 0.05) 0px 30px 70px",
    secondTitles: "rgb(142, 147, 154)",
    text: "#fff",
    borderColor: "rgb(61, 66, 74)",
  },*/
};

const ThemeContext = createContext();

function ThemeProvider(props) {
  /*const [theme, setTheme] = useState("light");*/
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") === null ||
      window.localStorage.getItem("theme") === "null" ||
      window.localStorage.getItem("theme") === undefined
      ? "dark"
      : window.localStorage.getItem("theme")
  );
  const [wTheme, setWTheme] = useState(theme === "white" ? true : false);
  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");
  const setLight = () => {
    setTheme("light");
    setWTheme(true);
  };
  const setDark = () => {
    setTheme("dark");
    setWTheme(false);
  };
  const value = {
    theme: themeStyles[theme],
    toggleTheme,
    setLight,
    setDark,
    wTheme,
  };
  return <ThemeContext.Provider value={value} {...props} />;
}

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider as default, useTheme };
