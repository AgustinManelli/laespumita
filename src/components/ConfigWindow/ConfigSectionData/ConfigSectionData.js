import "./ConfigSectionData.css";
import { useTheme } from "../../../context/ThemeProvider.js";
import { useStoredProducts } from "../../../store/storedProducts";
import DownloadData from "./DownloadData/DownloadData.js";
import ImportData from "./ImportData/ImportData";
import ConfigSectionContainer from "../ConfigSectionContainer/ConfigSectionContainer.js";

function ConfigSectionDataContent() {
  const { theme } = useTheme();
  const handleDeleteAll = useStoredProducts((state) => state.HandleDeleteAll);
  const handleDeleteTotal = useStoredProducts(
    (state) => state.HandleDeleteTotal
  );
  return (
    <>
      <div className="configSection">
        <p className="configSectionP" style={{ color: theme.text }}>
          Exportar / importar datos
        </p>
        <section className="configSectionDeleteContainerTotal">
          <DownloadData />
          <ImportData />
        </section>
      </div>
      <div className="configSection">
        <p className="configSectionP" style={{ color: theme.text }}>
          Eliminar datos permanentemente
        </p>
        <div className="configSectionDeleteContainerTotal">
          <button
            className="configSectionDeleteButton"
            onClick={() => {
              handleDeleteAll();
            }}
          >
            <p>Eliminar ventas</p>
          </button>
          <button
            className="configSectionDeleteButton"
            onClick={() => {
              handleDeleteTotal();
            }}
          >
            <p>Eliminar todo</p>
          </button>
        </div>
      </div>
    </>
  );
}

function ConfigSectionData() {
  return (
    <ConfigSectionContainer
      content={<ConfigSectionDataContent />}
      title={"Control de datos"}
    />
    /*<section>
      <section className="configSection">
        <div className="configSectionDeleteContainerTotal">
          <p className="configSectionPercentP" style={{ color: theme.text }}>
            control de datos
          </p>
          <div className="configSectionDeleteContainer">
            <button
              className="configSectionDeleteButton"
              onClick={() => {
                handleDeleteAll();
              }}
            >
              <p>reiniciar listas</p>
            </button>
            <button
              className="configSectionDeleteButton"
              onClick={() => {
                handleDeleteTotal();
              }}
            >
              <p>reiniciar todo</p>
            </button>
          </div>
        </div>
      </section>
      <section style={{ display: "none" }}>
        <ImportData />
        <DownloadData />
      </section>
    </section>*/
  );
}

export default ConfigSectionData;
