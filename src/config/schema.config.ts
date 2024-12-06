import * as Joi from '@hapi/joi' //

export const configValidationSchema = Joi.object({
  ENV: Joi.string().required(),
  APP_URL: Joi.string().required(),
  // DATABASE_HOST: Joi.string().required(),
  // DATABASE_PORT: Joi.string().default(5432).required(),
  // DATABASE_USERNAME: Joi.string().required(),
  // DATABASE_PWD: Joi.string().required(),
  // DATABASE_NAME: Joi.string().required(),
  // ENCRYPTION_KEY: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_SECRET_EXPIRES: Joi.number().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET_EXPIRES: Joi.number().required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_USERNAME: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),
  SMTP_FROM_EMAIL: Joi.string().required(),
  SMTP_FROM_NAME: Joi.string().required(),
})
