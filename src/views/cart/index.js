import React, { useEffect, useState } from "react";

import CartItem from "../../components/cartItem/index";
import QuantityBox from "../../components/quantityBox/index";
import SummaryBox from "../../components/summaryBox/index";
import Toast from "../../components/toast/index";

import data from "../../data/data.json";

import styles from "./style.module.css";

const Cart = () => {
  const [cart, changeCart] = useState([]);

  const [Notification, changeNotification] = useState([]);

  const clearNotif = (id) => {
    changeNotification((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };

  const pushNotif = (message, delay, type) => {
    changeNotification((prevState) => {
      setTimeout(() => {
        clearNotif(prevState.length + 1);
      }, delay);
      return [
        ...prevState,
        {
          message,
          id: prevState.length + 1,
          type,
        },
      ];
    });
  };

  const startcart = (newCart) => {
    changeCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div>
      <Toast notifList={Notification} />
      <div className={styles.main}>
        <h1>Order Summary</h1>
        <div className={styles.item_list}>
          <div className={styles.head_container}>
            <p>Items({cart.length})</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
          <div className={styles.list_box}>
            {cart.length ? (
              cart.map((item) => {
                return (
                  <div className={styles.list_row}>
                    <CartItem
                      name={item.name}
                      img={item.img_url}
                      deleteItem={() => {
                        deleteItem(item.id);
                      }}
                    />
                    <QuantityBox
                      quantity={item.quantity}
                      incrementQuantity={() =>
                        changeQuantity(item.id, "increment")
                      }
                      decrementQuantity={() =>
                        changeQuantity(item.id, "decrement")
                      }
                    />
                    <p> ${item.price}</p>
                  </div>
                );
              })
            ) : (
              <button
                type="button"
                className={styles.reload}
                onClick={reloadItems}
              >
                Reload Items In The Cart
              </button>
            )}
          </div>
        </div>
        <div className={styles.summary}>
          <SummaryBox cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
