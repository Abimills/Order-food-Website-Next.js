import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Feature.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import pizzaPic from "../public/images/pizza-bg.jpg";
import white from "../public/images/white-bg-movie.jpg";
import softDrinks from "../public/images/soft-drinks.jpg";
import burger from "../public/images/burger-bg.jpg";
const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    {
      id: 4,
      img: white,
    },
    {
      id: 1,
      img: pizzaPic,
    },
    {
      id: 2,
      img: burger,
    },
    // {
    //   id: 3,
    //   img: softDrinks,
    // },
  ];
  const handleArrow = (direction) => {
    if (direction === "left") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "right") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.wrapper}
        style={{ transform: `translate(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={img.id}>
            <Image
              className={styles.bgImages}
              src={img.img}
              alt="food images"
            />
          </div>
        ))}
      </div>
      <div className={styles.rightArrow} onClick={() => handleArrow("left")}>
        <AiOutlineArrowLeft />
      </div>
      <div
        className={styles.arrowLeftContainer}
        onClick={() => handleArrow("right")}
      >
        <AiOutlineArrowRight />
      </div>
    </div>
  );
};

export default Featured;
