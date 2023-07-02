import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { reset } from "@/redux/cartSlice";
import axios from "axios";

const Cart = () => {
  const [showPayment, setShowPayment] = useState(false);
  const router = useRouter();
  // This values are the props in the UI
  const cart = useSelector((state) => state.cart);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push(`/orders/${res.data._id}`);
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;

              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });

              // Your code here after capture the order
            });
          }}
        />
      </>
    );
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.tables}>
          <thead>
            <tr className={styles.table}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          {cart.products.map((product) => {
            return (
              <tbody key={product._id}>
                <tr className={styles.cartNumbers}>
                  <td>
                    <Image
                      src={product.img}
                      alt=""
                      width="100"
                      height="100"
                      className={styles.imgContainer}
                    />
                  </td>
                  <td>
                    <span className={styles.name}>{product.title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {product.extras.length < 1
                        ? "none"
                        : product.extras.map((extra) => (
                            <span key={extra._id}>{extra.text},</span>
                          ))}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>${product.price}</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.total}>
                      ${product.price * product.quantity}
                    </span>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}> Cart Total</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}> Subtotal: </b> ${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}> Discount: </b> $0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}> Total: </b> ${cart.total}
          </div>
          {showPayment ? (
            <div style={{ maxWidth: "750px", minHeight: "200px" }}>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AayXMYCySbs06oNCeUzT7VoC0fFxeuZSt9cQAJKg4MFAHI2Zi0RsBLmsecPnHJH73-S9ODN4H5qWUuEf",
                  components: "buttons",
                  currency: "USD",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              className={styles.button}
              onClick={() => setShowPayment(true)}
            >
              CHECKOUT NOW
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
