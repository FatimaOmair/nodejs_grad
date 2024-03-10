import Joi from "joi";
import objectId from 'joi-objectid';
Joi.objectId = objectId(Joi);

export const createDepValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().max(50).required().messages({
          "any.required": "Send a name for the user, please",
          "string.empty": "name is required",
        }),
        userId:Joi.objectId().required()
       
      }),
  };

  export const createProjectValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().max(50).required().messages({
          "any.required": "Send a name for the user, please",
          "string.empty": "name is required",
        }),
        group: Joi.array().items(Joi.string()).required(),
        supervisorname: Joi.string().max(50).required(),
        depId:Joi.objectId().required()
       
      }),
  };