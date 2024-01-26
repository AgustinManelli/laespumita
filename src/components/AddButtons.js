import "../stylesheets/AddButtons.css";
import { useEffect } from "react";
function AddButtons({
  addProduct,
  deleteAllProduct,
  productList,
  inputCalculatorFocus,
}) {
  const AddIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="addCircle"
      data-src="/icons/shopping-basket-add-01-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
    >
      <path
        d="M21.0524 11.5L21.3307 9.83981C21.5126 8.75428 21.6036 8.21152 21.3123 7.85576C21.0209 7.5 20.4854 7.5 19.4144 7.5H4.58564C3.51461 7.5 2.9791 7.5 2.68773 7.85576C2.39637 8.21152 2.48735 8.75428 2.66933 9.83981L3.87289 17.0194C4.27181 19.3991 4.47127 20.5889 5.28565 21.2945C6.10003 22 7.27396 22 9.62182 22H12"
        strokeLinecap="round"
        className="AddIconBag"
      ></path>
      <path
        d="M14 18H22M18 22L18 14"
        strokeLinecap="round"
        className="AddIconPlus"
      ></path>
      <path
        d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
        className="AddIconBag"
      ></path>
    </svg>
  );

  const DeleteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="deleteCircle"
      data-src="/icons/delete-02-stroke-rounded.svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
    >
      <path
        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
        strokeLinecap="round"
        className="DeleteIconLid"
      ></path>
      <path d="M9.5 16.5L9.5 10.5" strokeLinecap="round"></path>
      <path d="M14.5 16.5L14.5 10.5" strokeLinecap="round"></path>
    </svg>
  );
  /*const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputCalculatorFocus) {
      addProduct();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [addProduct]);*/
  return (
    <section className="addButtonsContainer">
      <button
        id="btnAdd"
        onClick={() => {
          addProduct();
        }}
        className="addButtonCircle"
      >
        <AddIcon />
      </button>
      <button
        onClick={() => {
          deleteAllProduct();
        }}
        className={
          productList.length === 0
            ? "addButtonCircle locked"
            : "addButtonCircle"
        }
      >
        <DeleteIcon />
      </button>
    </section>
  );
}

export default AddButtons;
