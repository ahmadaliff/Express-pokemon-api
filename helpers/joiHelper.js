import joi from "joi";
export const schema = joi.object({
  name: joi.string().optional(),
});
export const schemaMyPokemon = joi.object({
  name: joi.string().required(),
  id: joi.string().required(),
  renameCount: joi.number().required(),
});
