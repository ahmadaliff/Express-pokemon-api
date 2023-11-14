export const checkPrime = (number) => {
  for (var i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
};

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 100);
};

export const getFibonacciNumber = (countRename) => {
  let num1 = 0,
    sum = 0,
    num2 = 1;
  for (let i = 1; i < countRename; i++) {
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
  }

  return {
    prevFibonacciNumber: countRename === 0 || countRename === 1 ? 0 : num1,
    fibonacciNumber: countRename === 0 || countRename === 1 ? countRename : sum,
    newCountRename: countRename + 1,
  };
};

export const checkThereIsMyPokemon = (data) => {
  return data?.myPokemon !== undefined && data?.myPokemon?.length > 0;
};

export const checkPokemonIsInListWithId = (data, uuid) => {
  return !data?.pokemon?.find((val) => val.id === uuid);
};

export const checkMyPokemonIsInListWithId = (data, uuid) => {
  return !data?.myPokemon?.find((val) => val.id === uuid);
};

export const checkMyPokemonIsInListWithName = (data, name) => {
  return {
    status: data?.myPokemon?.find((val) => val.name === name),
    length: data?.myPokemon?.filter((val) => val.name === name).length,
  };
};
