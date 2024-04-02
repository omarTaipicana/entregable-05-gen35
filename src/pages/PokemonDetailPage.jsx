import React, { useEffect } from "react";
import useResponse from "../hooks/useResponse";
import { useParams } from "react-router-dom";
import "../styles/PokemonDetailPage.css";

const PokemonDetailPage = () => {
  const { name } = useParams();
  const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const [pokemon, getPokemon, hasError, isLoading] = useResponse(URL);
  useEffect(() => {
    getPokemon();
  }, [name]);

  return (
    <div className="detail">
      <img className="detail__img_header" src="../../img/pokedex.png" alt="" />
      <div className="detail__stripe__red">red</div>
      <div className="detail__stripe__black">black</div>
      <div className="detail__circle">
        <div className="detail__circle__i"></div>
      </div>
      <article className={`detail__pokemon b-${pokemon?.types[0].type.name}`}>
        <header className={`detail__header bg-${pokemon?.types[0].type.name}`}>
          <img
            className="detail__img"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </header>
        <section className="detail__principal">
          <div className="id">
            <span className={`color-${pokemon?.types[0].type.name}`}>#</span>
            <h3 className={`detail__id color-${pokemon?.types[0].type.name}`}>
              {pokemon?.id}
            </h3>
          </div>

          <hr className="detail__hr1" />
          <h3 className={`detail__name color-${pokemon?.types[0].type.name}`}>
            {pokemon?.name}
          </h3>
          <hr className="detail__hr2" />

          <section className="detail__wh">
            <ul className="wh__ul">
              <li className="wh__li">
                <span className="wh__label">Peso</span>
                <span className="wh__value">{pokemon?.weight}</span>
              </li>
              <li className="wh__li">
                <span className="wh__label">Altura</span>
                <span className="wh__value">{pokemon?.height}</span>
              </li>
            </ul>
          </section>

          <section className="type__ability">
            <article className="type__ability__content">
              <h4 className="h4">Tipos</h4>
              <ul className="detail__types">
                {pokemon?.types.map((typeInfo) => (
                  <li
                    className={`detail__type bg-${typeInfo.type.name}`}
                    key={typeInfo.type.url}
                  >
                    {typeInfo.type.name}
                  </li>
                ))}
              </ul>
            </article>
            <article className="type__ability__content">
              <h4 className="h4">Habilidades</h4>
              <ul className="detail__abilities">
                {pokemon?.abilities.map((ability) => (
                  <li className="detail__ability" key={ability.ability.url}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </section>

        <section className="detail__stats">
          <h4 className="stat__title">Stats</h4>
          <hr className="stat__hr" />
          <ul className="detail__list">
            {pokemon?.stats.map((statInfo) => (
              <li className="detail__stat" key={statInfo.stat.url}>
                <span className="detail__stat__label">
                  {statInfo.stat.name}
                </span>
                <span
                  className={`detail__stat__value color-${pokemon?.types[0].type.name}`}
                >
                  {statInfo.base_stat}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <article className={`moves b-${pokemon?.types[0].type.name}`}>
        <h4 className="move__title">Moves</h4>
        <hr className="move__hr" />
        <section className="moves__card">
          {pokemon?.moves.map((move) => (
            <li
              className={`detail__move bg-${move.move.name}`}
              key={move.move.url}
            >
              {move.move.name}
            </li>
          ))}
        </section>
      </article>
    </div>
  );
};

export default PokemonDetailPage;
