import Joi from "@hapi/joi";
import {UserTypeEnum} from "../../../../util/enum/UserTypeEnum";
import ValidationRegex from "../../../../util/statics/ValidationRegex";

export default {
    sendOTP: Joi.object().keys({
        contactNo: Joi.string().length(10).pattern(ValidationRegex.CONTACT_NO_REGEX).required(),
    }),
    verifyOTP: Joi.object().keys({
        otp: Joi.string().length(4).pattern(ValidationRegex.NUMBER_REGEX).required(),
    }),
    register: Joi.object().keys({
        type: Joi.string().valid(...Object.values(UserTypeEnum)).required(),
        fullName: Joi.any().when('type', {
            is: UserTypeEnum.PERSONAL,
            then: Joi.string().required().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
            otherwise: Joi.string().optional()
        }),
        userName: Joi.any().when('type', {
            is: UserTypeEnum.PERSONAL,
            then: Joi.string().required().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
            otherwise: Joi.string().optional()
        }),
        emailId: Joi.any().when('type', {
            is: UserTypeEnum.PERSONAL,
            then: Joi.string().required().email(),
            otherwise: Joi.string().optional()
        }),
        businessName: Joi.any().when('type', {
            is: UserTypeEnum.BUSINESS,
            then: Joi.string().required().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
            otherwise: Joi.string().optional()
        }),
        category: Joi.any().when('type', {
            is: UserTypeEnum.BUSINESS,
            then: Joi.string().required().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
            otherwise: Joi.string().optional()
        }),
        subCategory: Joi.any().when('type', {
            is: UserTypeEnum.BUSINESS,
            then: Joi.string().required().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
            otherwise: Joi.string().optional()
        }),
        businessDescription: Joi.any().when('type', {
            is: UserTypeEnum.BUSINESS,
            then: Joi.string().required().max(300),
            otherwise: Joi.string().optional()
        }),
        address: Joi.object().keys({
            pinCode: Joi.string().pattern(ValidationRegex.NUMBER_REGEX),
            city: Joi.string().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
            state: Joi.string().required().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
            country: Joi.string().required().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
        }).required()
    }),
};
