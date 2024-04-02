import React from "react";
import FormTrainer from "../components/HomePage/FormTrainer";
import "../styles/HomePage.css";
import { useSelector } from "react-redux";
import NotName from "../components/NotName";

const HomePage = () => {
  const trainer = useSelector((state) => state.trainer);

  return (
    <div className="home">
      {trainer.length > 0 && trainer.length < 3 && <NotName />}
      <img className="home__img" src="../../img/pokedex.png" alt="" />
      <section className="greeting__card">
        <h2 className="home__greeting">¡Hola entrenador!</h2>
        <p className="home__phrase">Para poder comenzar, dame tu nombre</p>
      </section>
      <FormTrainer />
      <div className="stripe__red">red</div>
      <div className="stripe__black">black</div>
      <div className="circle">
        <div className="circle__i"></div>
      </div>
    </div>
  );
};

export default HomePage;
