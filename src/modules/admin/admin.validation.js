import Joi from "joi";
import objectId from 'joi-objectid';
Joi.objectId = objectId(Joi);

export const createDepValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().min(2).max(50).required().messages({
          "any.required": "Send a name for the department, please",
          "string.empty": "name is required",
        }),
      }),
  };
export const createProjectValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().max(50).required().messages({
          "any.required": "Send a name for the user, please",
          "string.empty": "name is required",
        }),
        group: Joi.required(),
        supervisorName: Joi.string().min(3).max(20).required(),
        depId:Joi.objectId().required()
      }),
  };