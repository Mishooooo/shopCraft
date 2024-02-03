import React from "react";
import classes from "./CartHeader.module.css";
import { TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import { setOverlay } from "@/store/overlaySlice"; // import the action creator


export default function CartHeader({ productsId, onItemSelect, selectedItems}) {
  const dispatch = useDispatch();

  const showWarning = () =>
    dispatch(
      setOverlay({
        text: "Remove all the selected product from cart?",
        onConfirm: handleRemoveProducts,
      })
    );
    
  const handleRemoveProducts = async () => {
    try {
      const response = await fetch(
        `/api/user-page/cart`,
        {
          method: "DELETE",
          body: JSON.stringify({arrOfProductIds: selectedItems})
        }
      );

         if (
           !response.ok ||
           !(response.status >= 200 && response.status < 300)
         ) {
           throw new Error( response.status );
         }
    dispatch(removeFromCart(selectedItems));

    } catch (error) {
           
 const errorText = `Sorry, there was a problem removing products from cart! Status: ${error.message}`;
 dispatch(setOverlay({ text: errorText }));

    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.select_container}>
        <p>Select all items</p>
        <input
          type="checkbox"
          onChange={(event) =>
            onItemSelect(productsId, event.target.checked, true)
          }
        />
      </div>
      <button
        className={classes.clear_container}
        onClick={showWarning}
      >
        <TrashIcon className={classes.trashIcon} />
        <p>Remove selected</p>
      </button>
    </div>
  );
}
