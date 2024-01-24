import "../stylesheets/ListProducts.css";
import { useEffect } from "react";
import ProductLabel from "./ProductLabel";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";

function ListProducts({ productList, deleteProduct, handleSave }) {
  const { theme, wTheme } = useTheme();
  const EmptyListIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="EmptyListIcon"
      data-src="/icons/file-sync-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      style={{ stroke: theme.secondTitles }}
    >
      <path
        d="M20 12.1818V7.81818C20 6.12494 20 5.27832 19.732 4.60214C19.3012 3.5151 18.3902 2.65765 17.2352 2.2522C16.5168 2 15.6173 2 13.8182 2C10.6698 2 9.09563 2 7.83836 2.44135C5.81714 3.15089 4.22281 4.65142 3.46894 6.55375C3 7.73706 3 9.21865 3 12.1818V14.7273C3 17.7966 3 19.3313 3.8477 20.3971C4.09058 20.7025 4.37862 20.9736 4.70307 21.2022C5.74797 21.9384 7.21706 21.9952 10 21.9996"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 12C3 10.1591 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 17L13.0228 17.5944C13.5374 15.7277 15.5114 14.6199 17.4318 15.1201C18.4149 15.3761 19.1934 16.0039 19.6501 16.806M21 20L19.9774 19.4056C19.4628 21.2723 17.4888 22.3801 15.5684 21.8799C14.6081 21.6298 13.8431 21.0251 13.3824 20.2496"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="EmptyListIconArrow"
      ></path>
    </svg>
  );
  const products = productList;
  useEffect(() => {
    var objDiv = document.getElementById("listContainer");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [productList]);

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="listButtonIcon"
      data-src="/icons/checkmark-square-04-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
    >
      <path
        d="M15 2.5H12C7.52166 2.5 5.28249 2.5 3.89124 3.89124C2.5 5.28249 2.5 7.52166 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12V10"
        strokeLinecap="round"
      ></path>
      <path
        className="CheckIconCheck"
        id="CheckIconCheck"
        d="M8.5 10L12 13.5L21.0002 3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  return (
    <div style={{ position: "relative" }}>
      <section
        className={
          wTheme
            ? "listContainer listContainerLight"
            : "listContainer listContainerDark"
        }
        id="listContainer"
        style={{
          backgroundColor: theme.backgroundContainer,
          boxShadow: theme.boxShadow,
          "&::-webkit-scrollbar-track": {
            background: theme.backgroundOverall,
          },
        }}
      >
        <AnimatePresence mode={"popLayout"}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <motion.div key={product.id} style={{ width: "100%" }}>
                <ProductLabel
                  total={product.total}
                  number={index + 1}
                  id={product.id}
                  key={product.id}
                  product={product}
                  deleteProduct={deleteProduct}
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ scale: 0.5, opacity: 0, filter: "blur(5px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{
                scale: 0.5,
                opacity: 0,
                filter: "blur(5px)",
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
              style={{
                color: theme.secondTitles,
                position: "absolute",
                top: "45%",
                margin: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <EmptyListIcon />
              No hay productos cargados...
            </motion.p>
          )}
        </AnimatePresence>
      </section>
      <button
        className={productList.length > 0 ? "listButton" : "listButton locked"}
        onClick={handleSave}
      >
        <CheckIcon />
      </button>
    </div>
  );
}

export default ListProducts;
