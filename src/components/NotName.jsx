import React from "react";
import { useDispatch } from "react-redux";
import { setTrainer } from "../store/states/trainer.slice";
const NotName = () => {
  const dispatch = useDispatch();

  const handleReset = (e) => {
    dispatch(setTrainer(""));
  };

  return (
    <div className="nameValidation">
      <section className="validationInfo">
        <h3 className="validationPhrase">
          Su nombre debe llevar por lo menos 3 caracteres
        </h3>
        <button className="validationBtn" onClick={handleReset}>
          Intentar nuevamente
        </button>
        <img className="validationImg" src="../../img/pikachu.gif" alt="" />
      </section>
    </div>
  );
};

export default NotName;
