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
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
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

  const [page, setPage] = useState(1);
  const pokePerPage = 8;
  const lastIndexPage = page * pokePerPage;
  const firstIndexPage = lastIndexPage - pokePerPage;
  const urlPage = pokemonFiltered?.slice(firstIndexPage, lastIndexPage);
  const totalPage = Math.ceil(pokemonFiltered?.length / pokePerPage);
  const pageNumbers = [];

  const [pageButton, setPageButton] = useState(1);
  const buttonPerPage = 10;
  const lastIndexPageButton = pageButton * buttonPerPage;
  const firstIndexPageButton = lastIndexPageButton - buttonPerPage;
  const totalPageButton = Math.ceil(totalPage / buttonPerPage);

  for (
    let i = firstIndexPageButton + 1;
    i <= (lastIndexPageButton > totalPage ? totalPage : lastIndexPageButton);
    i++
  ) {
    pageNumbers.push(i);
  }

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
        {urlPage?.map((pokemons, i) => (
          <ListPokemons pokemons={pokemons} key={i} />
        ))}
      </section>
      <div className="paginated-content">
        <button
          className="btn-buttton-page-content"
          onClick={() => setPageButton(pageButton - 1)}
          disabled={pageButton === 1}
          style={{ opacity: pageButton === 1 ? ".1" : "" }}
        >
          <div className="triangulo_izq"></div>
        </button>
        <button
          className="btn-page-card"
          onClick={() => {
            setPage(page - 1);
            if (page === lastIndexPageButton - buttonPerPage + 1) {
              setPageButton(pageButton - 1);
            }
          }}
          disabled={page === 1}
          style={{ opacity: page === 1 ? ".1" : "" }}
        >
          -
        </button>
        <button
          className="btn-page help"
          onClick={() => {
            setPage(1);
            setPageButton(1);
          }}
        >
          {1}
        </button>
        <span>..</span>
        {pageNumbers.map((number, i) => (
          <button
            style={{
              background: number == page ? "rgba(255, 255, 0,0.8)" : "",
              color: number == page ? "black" : "",
            }}
            className="btn-page"
            key={i}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}
        <span>..</span>
        <button
          className="btn-page help"
          onClick={() => {
            setPage(totalPage);
            setPageButton(Math.ceil(totalPage / buttonPerPage));
          }}
        >
          {totalPage.toString()}
        </button>
        <button
          className="btn-page-card"
          onClick={() => {
            setPage(page + 1);
            if (page === lastIndexPageButton) {
              setPageButton(pageButton + 1);
            }
          }}
          disabled={page === totalPage}
          style={{ opacity: page === totalPage ? ".1" : "" }}
        >
          +
        </button>
        <button
          className="btn-buttton-page-content"
          onClick={() => setPageButton(pageButton + 1)}
          disabled={pageButton === totalPageButton}
          style={{ opacity: pageButton === totalPageButton ? ".1" : "" }}
        >
          <div className="triangulo_der"></div>
        </button>
      </div>
      <h4 className="podedex__page">
        <b>Page:</b>
        {page}
      </h4>
    </div>
  );
};

export default PokedexPage;
