import Joi from "joi";
import { IUser } from "../types";

const buisnessAccountSchema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    password: Joi.string().required().min(8),
    phoneNumber: Joi.string().required().min(10),
    servicesId: Joi.array().items(Joi.string().required().min(24).max(24)).required(),
    state: Joi.string().required(),
    workShop: Joi.string().required(),
    userAccountsId: Joi.string().required().min(24).max(24),
    workShopAddress: Joi.string().required(),
})

const individualAccountSchema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    password: Joi.string().required().min(8),
    phoneNumber: Joi.string().required().min(10),
    state: Joi.string().required(),
    address: Joi.string().required(),
    carModel: Joi.string().required(),
    carName: Joi.string().required(),
    userAccountsId: Joi.string().required().min(24).max(24),

})

export const buisnessAccount = (user: IUser) => buisnessAccountSchema.validate(user)
export const individualAccount = (user: IUser) => individualAccountSchema.validate(user)