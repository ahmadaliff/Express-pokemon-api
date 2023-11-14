import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const callAPI = async (
  endpoint,
  method = "GET",
  headers,
  params,
  data
) => {
  const baseURL = process.env.BASE_URL;
  const options = {
    baseURL,
    url: endpoint,
    method,
    headers,
    params,
    data,
  };

  const response = await axios(options);
  return response?.data;
};

export const getListPokemon = async () => {
  return await callAPI(`pokemon?limit=100&offset=0`);
};
export const getDetailPokemonByUuid = async (name) => {
  return await callAPI(`pokemon/${name}`);
};
