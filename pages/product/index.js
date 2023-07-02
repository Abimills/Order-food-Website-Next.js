import PizzaList from "@/components/PizzaList";
import axios from "axios";
import React from "react";

const MenuView = ({ pizzaList }) => {
  return (
    <>
      <PizzaList pizzaList={pizzaList} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data.products,
      admin,
    },
  };
};

export default MenuView;
