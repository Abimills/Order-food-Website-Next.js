import styles from "../../styles/Product.module.css";
import Image from "next/image";
import abel from "../../public/images/pizza-bg.jpg";
import { useState } from "react";
import { GiFullPizza } from "react-icons/gi";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addProduct } from "@/redux/cartSlice";
const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();
  const changePrice = (num) => {
    setPrice(price + num);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };
  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(+option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => option._id !== extra._id));
    }
  };
  const handleAddbtn = () => {
    dispatch(addProduct({...pizza, extras, price, quantity}));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            width="500"
            height="500"
            objectFit="contain"
            alt=""
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <GiFullPizza className={styles.pizzaCircle1} />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <GiFullPizza className={styles.pizzaCircle2} />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <GiFullPizza className={styles.pizzaCircle3} />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => {
            return (
              <div className={styles.option} key={option._id}>
                <input
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className={styles.checkbox}
                  onChange={(e) => handleChange(e, option)}
                />
                <label htmlFor="double">{option.text}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleAddbtn}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async (params) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.query.id}`
  );
  return {
    props: {
      pizza: res?.data.product,
    },
  };
};

export default Product;
