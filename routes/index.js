import express from "express";
import {
  catchPokemon,
  getDetailPokemon,
  getMyPokemonList,
  getPokemonList,
  releasePokemon,
  renameMyPokemon,
} from "../controllers/index.js";

const router = express.Router();

router.get("/pokemon", getPokemonList);
router.get("/pokemon/:uuid", getDetailPokemon);
router.post("/catch/pokemon/:uuid", catchPokemon);
router.get("/myPokemon", getMyPokemonList);
router.delete("/release/pokemon/:uuid", releasePokemon);
router.patch("/rename/pokemon/:uuid", renameMyPokemon);

export default router;
