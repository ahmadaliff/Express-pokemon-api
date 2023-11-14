import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";

import { getListPokemon } from "./apiHelper.js";

const database = new URL("../database/db.json", import.meta.url);

export const storeData = (data) => {
  writeFileSync(database, JSON.stringify(data));
};

export const readData = () => {
  return JSON.parse(readFileSync(database));
};

export const isdbEmpty = () => {
  return Object.entries(readData()).length === 0;
};

export const setDbWithPokemonList = async () => {
  const response = await getListPokemon();
  storeData({
    ...readData(),
    pokemon: response?.results.map((val) => ({ name: val.name, id: uuidv4() })),
  });
};
