import Image from "next/image";
import styles from "../styles/Footer.module.css";
import softDrinks from "../public/images/soft-drinks.jpg";
import { GiFullPizza } from "react-icons/gi";
const Footer = () => {
  return (
    <div className={styles.container}>
      <GiFullPizza className={styles.pizzahat} />

      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES,WE DID. THE AB PIZZZA, WELL BAKED SLICE OF PIZZA
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANT</h1>
          <p className={styles.text}>
            1434 R. Rand straat #304.
            <br /> New York, 85022
            <br /> (602) 867-1222
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 - 22:00
          </p>
          <p className={styles.text}>
            SATURDAY-SUNDAY
            <br /> 12:00 -24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
