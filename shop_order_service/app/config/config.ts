import Joi from "joi";

const envVarsSchema = Joi.object()
  .keys({
    ENV: Joi.string().valid("production", "development").required(),
    SECRET_KEY: Joi.string().min(64).required(),
    SOS_DB: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    PORT: Joi.number().default(7008),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.ENV,
  secretKey: envVars.SECRET_KEY,
  SOS_DB: envVars.SOS_DB,
  DB_NAME: envVars.DB_NAME,
  port: envVars.PORT,
};
