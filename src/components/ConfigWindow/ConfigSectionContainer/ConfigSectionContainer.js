import { useTheme } from "../../../context/ThemeProvider.js";

function ConfigSectionContainer({ content, title }) {
  const { theme } = useTheme();
  return (
    <section
      style={{
        margin: "10px 30px 10px 30px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <header>
        <p
          style={{
            color: "#008fd2",
            textAlign: "left",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {title}
        </p>
      </header>
      <section
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {content}
      </section>
    </section>
  );
}

export default ConfigSectionContainer;
