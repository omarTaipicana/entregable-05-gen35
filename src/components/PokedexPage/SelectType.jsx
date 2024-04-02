import React, { useEffect } from "react";
import useResponse from "../../hooks/useResponse";

const SelectType = ({
  setSelectType,
  setPokeSearch,
  setPage,
  setPageButton,
}) => {
  const URL = "https://pokeapi.co/api/v2/type/";
  const [types, getTypes] = useResponse(URL);
  useEffect(() => {
    getTypes();
  }, []);

  const handleOnChange = (e) => {
    setSelectType(e.target.value);
    setPokeSearch("");
    setPage(1);
    setPageButton(1);
  };



  return (
    <select className="select" onChange={handleOnChange}>
      <option className="select__option" value="allPokemons">
        Todos los pokemones
      </option>
      {types?.results.map((type) => (
        <option className="select__option" value={type.url} key={type.url}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

export default SelectType;
