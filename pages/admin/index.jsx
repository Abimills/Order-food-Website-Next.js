import axios from "axios";
import styles from "../../styles/Admin.module.css";
import { GiFullPizza } from "react-icons/gi";
import Image from "next/image";
import { useState } from "react";

const Admin = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products || []);
  const [orderList, setOrderList] = useState(orders || []);
  const status = ["preparing", "on the way", "delivered"];
  const handleStatus = async (id) => {
    const item = orderList?.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put(`api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data.order,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePizza = async (id) => {
    try {
      const res = await axios.delete(`api/products/${id}`);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList?.map((product) => {
            return (
              <tbody key={product._id}>
                <tr className={styles.trTitle}>
                  <td>
                    <Image
                      src={product.img}
                      width={50}
                      height={50}
                      alt=""
                      className={styles.adminImagePizza}
                    />
                  </td>
                  <td>{product._id.slice(0, 5)}...</td>
                  <td>{product.title}</td>
                  <td>{`${product.prices}`}</td>
                  <td>
                    <button className={styles.button}>Edit</button>
                    <button
                      className={styles.button}
                      onClick={() => handleDeletePizza(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList?.map((order) => {
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Page
                  </button>
                </td>
              </tr>
            </tbody>;
          })}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(`http://localhost:3000/api/products`);
  const orderRes = await axios.get(`http://localhost:3000/api/orders`);
  return {
    props: {
      products: productRes?.data.products,
      orders: orderRes?.data.orders,
    },
  };
};

export default Admin;
