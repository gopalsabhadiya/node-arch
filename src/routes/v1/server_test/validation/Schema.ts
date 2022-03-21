import Joi from "@hapi/joi";

export default {
    testPayload: Joi.object().keys({
        testString: Joi.string().length(50).required(),
    }),
};
