import { getDetailPokemonByUuid } from "../helpers/apiHelper.js";
import {
  checkMyPokemonIsInListWithId,
  checkMyPokemonIsInListWithName,
  checkPokemonIsInListWithId,
  checkPrime,
  checkThereIsMyPokemon,
  getFibonacciNumber,
  getRandomNumber,
} from "../helpers/checkHelper.js";
import {
  isdbEmpty,
  readData,
  setDbWithPokemonList,
  storeData,
} from "../helpers/databaseHelper.js";
import {
  handleClientError,
  handleResponse,
  handleServerError,
} from "../helpers/handleResponseHelper.js";

import { v4 as uuidv4 } from "uuid";

const data = readData();

export const getPokemonList = async (req, res) => {
  try {
    if (isdbEmpty()) {
      await setDbWithPokemonList();
    }
    return handleResponse(res, 200, {
      data: { pokemon: readData().pokemon },
      message: "success",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

export const getDetailPokemon = async (req, res) => {
  try {
    const { uuid } = req.params;
    if (isdbEmpty()) {
      await setDbWithPokemonList();
    }
    if (checkPokemonIsInListWithId(data, uuid)) {
      return handleClientError(res, 404, "Data Not Found");
    }

    return handleResponse(res, 200, {
      data: await getDetailPokemonByUuid(
        data?.pokemon?.filter((val) => val.id === uuid)[0].name
      ),
      message: "success",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

export const catchPokemon = async (req, res) => {
  try {
    const { uuid } = req.params;
    if (isdbEmpty()) {
      await setDbWithPokemonList();
    }
    if (checkPokemonIsInListWithId(data, uuid)) {
      return handleClientError(res, 404, "Data Not Found");
    }

    const pokemonData = {
      name: data?.pokemon.filter((val) => val.id === uuid)[0].name,
      renameCount: 0,
      id: uuidv4(),
    };

    const { status, length } = checkMyPokemonIsInListWithName(
      data,
      pokemonData.name
    );
    if (status) {
      pokemonData.name = `${pokemonData.name}_number_${length}`;
    }

    if (Math.random() < 0.5) {
      if (!data?.myPokemon) {
        data.myPokemon = [pokemonData];
      } else {
        data?.myPokemon.push(pokemonData);
      }

      storeData(data);

      return handleResponse(res, 200, {
        data: pokemonData,
        message: `Success catch pokemon : ${pokemonData.name}`,
      });
    } else {
      return handleResponse(res, 200, {
        message: `you failed to catch pokemon : ${pokemonData.name}, Try Again`,
      });
    }
  } catch (error) {
    return handleServerError(res);
  }
};

export const getMyPokemonList = async (req, res) => {
  try {
    if (isdbEmpty()) {
      await setDbWithPokemonList();
    }
    if (!checkThereIsMyPokemon(data)) {
      return handleClientError(res, 404, "MyPokemon list Empty");
    }
    return handleResponse(res, 200, {
      data: { myPokemon: readData().myPokemon },
      message: "success",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

export const releasePokemon = async (req, res) => {
  try {
    const { uuid } = req.params;
    if (isdbEmpty()) {
      await setDbWithPokemonList();
    }

    if (checkMyPokemonIsInListWithId(data, uuid)) {
      return handleClientError(res, 404, "Data Not Found");
    }

    const pokemonData = data?.myPokemon.filter((val) => val.id === uuid)[0];
    const randomNumber = getRandomNumber();

    if (checkPrime(randomNumber)) {
      data.myPokemon = data?.myPokemon?.filter((val) => val.id !== uuid);
      storeData(data);
      return handleResponse(res, 200, {
        number: randomNumber,
        message: `Pokemon : ${pokemonData.name} release`,
      });
    } else {
      return handleResponse(res, 200, {
        number: randomNumber,
        message: `you failed to release pokemon : ${pokemonData.name}, Try Again`,
      });
    }
  } catch (error) {
    return handleServerError(res);
  }
};

export const renameMyPokemon = async (req, res) => {
  try {
    const { uuid } = req.params;
    if (isdbEmpty()) {
      await setDbWithPokemonList();
    }
    if (checkMyPokemonIsInListWithId(data, uuid)) {
      return handleClientError(res, 404, "Data Not Found");
    }

    const dataMyPokemon = data?.myPokemon.filter((val) => val.id === uuid)[0];

    const { prevFibonacciNumber, fibonacciNumber, newCountRename } =
      getFibonacciNumber(dataMyPokemon.renameCount);

    data.myPokemon = data.myPokemon.filter((val) => val.id !== uuid);
    const newName =
      dataMyPokemon.renameCount === 0
        ? `${dataMyPokemon.name}-${fibonacciNumber}`
        : `${dataMyPokemon.name.replace(
            `-${prevFibonacciNumber}`,
            ""
          )}-${fibonacciNumber}`;

    data.myPokemon.push({
      name: newName,
      id: dataMyPokemon.id,
      renameCount: newCountRename,
    });

    storeData(data);

    return handleResponse(res, 200, {
      data: data?.myPokemon.filter((val) => val.id === uuid)[0],
      message: `Success Rename from :  ${dataMyPokemon.name} , to : ${newName}`,
    });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
