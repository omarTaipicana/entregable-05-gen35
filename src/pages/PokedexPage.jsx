import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useResponse from "../hooks/useResponse";
import ListPokemons from "../components/PokedexPage/ListPokemons";
import "../styles/PokedexPage.css";
import SelectType from "../components/PokedexPage/SelectType";

const PokedexPage = () => {
  const [selectType, setSelectType] = useState("allPokemons");
  const [pokeSearch, setPokeSearch] = useState("");
  const trainer = useSelector((state) => state.trainer);
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
  const [pokemons, getPokemons, hasError, isLoading, getTypes] =
    useResponse(URL);
  useEffect(() => {
    if (selectType === "allPokemons") {
      getPokemons();
    } else {
      getTypes(selectType);
    }
  }, [selectType]);

  const inputSearch = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setPokeSearch(inputSearch.current.value.trim().toLowerCase());
    inputSearch.current.value = "";
    setSelectType("allPokemons");
  };

  const pokemonFiltered = pokemons?.results.filter((poke) => {
    return poke.name.includes(pokeSearch);
  });

  return (
    <div className="page">
      <img className="page__img" src="../../img/pokedex.png" alt="" />
      <div className="page__stripe__red">red</div>
      <div className="page__stripe__black">black</div>
      <div className="page__circle">
        <div className="page__circle__i"></div>
      </div>
      <p className="page__greeting">
        <span className="page__name"> Bienvenido {trainer}, </span>
        <span className="page__phrase">
          aqui podras encontrar tu pokemon favorito{" "}
        </span>
      </p>
      <section className="page__inputs">
        <form className="page__form" onSubmit={handleSubmit}>
          <input className="page__input" ref={inputSearch} type="text" />
          <button className="page__btn">Search</button>
        </form>
        <SelectType
          setSelectType={setSelectType}
          setPokeSearch={setPokeSearch}
        />
      </section>
      <section className="list">
        {pokemonFiltered?.map((pokemons, i) => (
          <ListPokemons pokemons={pokemons} key={i} />
        ))}
      </section>
    </div>
  );
};

export default PokedexPage;
