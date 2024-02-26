import WindowComponent from "../WindowComponent/WindowComponent";
import "./AboutWindow.css";
import { useModal } from "../../store/modal.js";
import { useTheme } from "../../context/ThemeProvider";
import logo from "../../assets/logo.svg";

function AboutContent() {
  const { theme } = useTheme();
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img src={logo} style={{ width: "150px", marginBottom: "20px" }} />
      <p
        style={{
          color: theme.text,
          fontSize: "14px",
        }}
      >
        Esta calculadora fue construida con el siguiente tech-stack y
        dependencias
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "7px",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <p style={{ color: theme.placeholder, padding: "5px 10px 5px 10px" }}>
            react
          </p>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <p style={{ color: theme.placeholder, padding: "5px 10px 5px 10px" }}>
            zustand
          </p>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <p style={{ color: theme.placeholder, padding: "5px 10px 5px 10px" }}>
            lightweight-charts
          </p>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <p style={{ color: theme.placeholder, padding: "5px 10px 5px 10px" }}>
            framer-motion
          </p>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <p style={{ color: theme.placeholder, padding: "5px 10px 5px 10px" }}>
            sonner
          </p>
        </div>
      </div>
      <p style={{ maxWidth: "80%", color: theme.text }}>
        El almacenamiento de información se realiza en localStorage a modo
        educativo, por lo que toda la información de la app se maneja de manera
        local, estando la misma preparada para su posterior implementación con
        bases de datos.
      </p>
      <p style={{ maxWidth: "80%", color: theme.text }}>
        Para ver el código de esta web-app y otros proyectos ingresá a{" "}
        <span>
          <a
            href="https://agustinmanelli.vercel.app"
            style={{ color: theme.text }}
            rel="noreferrer noopener"
            target="_blank"
          >
            agustinmanelli.vercel.app
          </a>
        </span>
      </p>
    </section>
  );
}

function AboutWindow() {
  const aboutModal = useModal((state) => state.aboutModal);
  const setAboutModal = useModal((state) => state.setAboutModal);
  return (
    <WindowComponent
      content={<AboutContent />}
      modalType={aboutModal}
      setModalType={setAboutModal}
      title={"Acerca de la app (beta-0.0.5)"}
    />
  );
}

export default AboutWindow;
