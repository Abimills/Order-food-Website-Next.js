import styles from "../../styles/Order.module.css";
import { MdPaid } from "react-icons/md";
import { RiEBikeLine } from "react-icons/ri";
import { MdBakeryDining } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";
import { GiStorkDelivery } from "react-icons/gi";
import { AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";

const Order = ({ order }) => {
  const status = order.status;
  const statusChoose = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.tables}>
            <thead>
              <tr className={styles.table}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableValue}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>

                <td>
                  <span className={styles.total}>${order.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusChoose(0)}>
            <MdPaid className={styles.otherIcon} />
            <span className={styles.progress}>Payment</span>
            <div className={styles.checkedIcon}>
              <AiFillCheckCircle className={styles.checkedIcon} />
            </div>
          </div>
          <div className={statusChoose(1)}>
            <MdBakeryDining className={styles.otherIcon} />
            <span className={styles.progress}>Preparing</span>
            <div className={styles.checkedIcon}>
              <AiFillCheckCircle className={styles.checkedIcon} />
            </div>
          </div>
          <div className={statusChoose(2)}>
            <RiEBikeLine className={styles.otherIcon} />
            <span className={styles.progress}>On the Way</span>
            <div className={styles.checkedIcon}>
              <AiFillCheckCircle className={styles.checkedIcon} />
            </div>
          </div>
          <div className={statusChoose(3)}>
            <GiStorkDelivery className={styles.otherIcon} />
            <span className={styles.progress}>Delivered</span>
            <div className={styles.checkedIcon}>
              <AiFillCheckCircle className={styles.checkedIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}> Cart Total</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}> Subtotal: </b> ${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}> Discount: </b> $0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}> Total: </b> ${order.total}
          </div>
          <button disabled className={styles.button}>
            Paid
          </button>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http:localhost:3000/api/orders/${params.query.id}`
  );
  return {
    props: {
      order: res.data,
    },
  };
};

export default Order;
