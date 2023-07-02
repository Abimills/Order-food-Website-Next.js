import styles from "../styles/Navbar.module.css";
import { MdCall } from "react-icons/md";
import { IoIosPizza } from "react-icons/io";
import { BsFillCartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={
        scrolled ? `${styles.container} ${styles.scrolled}` : styles.container
      }
    >
      <div className={styles.item}>
        <div className={styles.callButton}>
          <MdCall />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>068932345</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href={"/"} passHref>
            <li className={styles.listItem}>Home</li>
          </Link>
          <li
            className={styles.listItem}
            onClick={() => router.push("/product")}
          >
            Menu
          </li>
          <IoIosPizza className={styles.pizzaNav} />
          <li
            className={styles.listItem}
            onClick={() => router.push("/events")}
          >
            Events
          </li>
          <li
            className={styles.listItem}
            onClick={() => router.push("/events")}
          >
            Blog
          </li>
          <li
            className={styles.listItem}
            onClick={() => router.push("/events")}
          >
            Contact
          </li>
        </ul>
      </div>
      <Link href={"/cart"} passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <BsFillCartFill />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
