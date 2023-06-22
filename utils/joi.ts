import Joi from "joi";
import { IUser } from "../types";

const buisnessAccountSchema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    password: Joi.string().required().min(8),
    phoneNumber: Joi.string().min(10),
    state: Joi.string(),
    workShop: Joi.string(),
    userAccountsId: Joi.string().required().min(24).max(24),
    workShopAddress: Joi.string(),
})

const individualAccountSchema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    password: Joi.string().required().min(8),
    phoneNumber: Joi.string().min(10),
    state: Joi.string(),
    address: Joi.string(),
    carModel: Joi.string(),
    carName: Joi.string(),
    userAccountsId: Joi.valid('individual', 'business').required(),

})

const updateIndividualProfileInfoSchema = Joi.object<IUser>({
    fullName: Joi.string(),
    address: Joi.string(),
    carModel: Joi.string(),
    carName: Joi.string(),
    phoneNumber: Joi.string(),
    state: Joi.string(),
})

const updatePasswordSchema = Joi.object<{oldPassword: string; newPassword: string}>({
    newPassword: Joi.string().required().min(8),
    oldPassword: Joi.string().required().min(8)
})



export const buisnessAccount = (user: IUser) => buisnessAccountSchema.validate(user)
export const individualAccount = (user: IUser) => individualAccountSchema.validate(user)
export const updateIndividualProfileInfo = (user: IUser) => updateIndividualProfileInfoSchema.validate(user)
export const updatePasswordValidate = (data: object) => updatePasswordSchema.validate(data)