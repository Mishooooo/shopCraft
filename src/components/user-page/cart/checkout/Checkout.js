import styles from "./Checkout.module.css"; // Import the CSS module

const Checkout = ({ totalPrice }) => {
  return (
    <div className={styles.checkoutContainer}>
      <h3 className={styles.sectionTitle}>order Summary</h3>
      {/* <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>$24{subtotal}</span>
      </div> */}
      {/* <div className={styles.summaryRow}>
        <span>Shipping</span>
        <span className={shippingFee == 0 ? styles.freeShipping : ""}>
          {0 == 0 ? `Free Shipping` : `+${shippingFee}$`}
        </span>
      </div> */}
      <hr />
      <div className={styles.totalRow}>
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
      {/* <button
        onClick={() => saveCartToDbHandler()}
        disabled={
            // selected.length === 0
            false
        }
        className={
          selected?.length === 0 ? styles.disabledButton : styles.enabledButton
        }
      >
        Continue
      </button> */}
    </div>
  );
};

export default Checkout;
