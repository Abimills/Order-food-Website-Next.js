import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        At our pizza place, we pride ourselves on providing exceptional service
        to our customers. From the moment you walk through our doors, you will
        be greeted with a warm smile and friendly hello. Our team of
        knowledgeable staff is always happy to help you select the perfect pizza
        and toppings to satisfy your cravings. We use only the freshest
        ingredients in our pizzas, and our chefs take great care in preparing
        each pie to perfection. Our fast and efficient delivery service ensures
        that your pizza will arrive hot and fresh right to your doorstep.
        Whether you're dining in or ordering delivery, we strive to provide a
        pleasant and enjoyable experience for all of our customers.
      </p>
      <div className={styles.wrapper}>
        {pizzaList?.map((pizza) => {
          return <PizzaCard key={pizza._id} pizza={pizza} />;
        })}
      </div>
    </div>
  );
};

export default PizzaList;
