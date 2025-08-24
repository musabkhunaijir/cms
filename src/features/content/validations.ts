import * as Joi from 'joi';

export const createContentSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().required(),
});

export const updateContentSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});
