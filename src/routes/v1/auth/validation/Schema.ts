import Joi from "@hapi/joi";

export default {
    userCredential: Joi.object().keys({
        contactNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    }),
};
