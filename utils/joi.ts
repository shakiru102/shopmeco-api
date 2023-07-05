import Joi from "joi";
import { AdminProps, BuisnessAccountsProps, BusinessServicesProps, ICategoryProps, IServicesProps, IUser } from "../types";

const buisnessAccountSchema = Joi.object<IUser | BuisnessAccountsProps>({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    password: Joi.string().required().min(8),
    phoneNumber: Joi.string().min(10),
    state: Joi.string(),
    workShop: Joi.string(),
    workShopAddress: Joi.string(),
    description: Joi.string(),
    caption: Joi.string()
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

const updateWorkShopInfoSchema = Joi.object<BuisnessAccountsProps>({
    workShop: Joi.string(),
    workShopAddress: Joi.string(),
    caption: Joi.string(),
    description: Joi.string(),
})

const googleSchema = Joi.object<{accessToken: string; accountType: string}>({
    accessToken: Joi.string().required(),
    accountType: Joi.valid('individual', 'business').required()
});

const businessTimeSchema = Joi.object<BuisnessAccountsProps['businessTime']>({
    from: Joi.object({
        day: Joi.string().required(),
        time: Joi.string().required()
    }).required(),
    to: Joi.object({
        day: Joi.string().required(),
        time: Joi.string().required()
    }).required()
})

const adminSchema = Joi.object<AdminProps>({
    staffId: Joi.string().required(),
     name: Joi.string().required(),
    password: Joi.string()
})

const serviceSchema = Joi.object<IServicesProps>({
    name: Joi.string().required(),
    caption: Joi.string()
})

const categorySchema = Joi.object<ICategoryProps>({
    name: Joi.string().required(),
    serviceId: Joi.string().required().min(24).max(24),
    caption: Joi.string()
})

const businessServiceSchema = Joi.object<BusinessServicesProps>({
    categoryId: Joi.string().required().min(24).max(24),
    description: Joi.string().required(),
    price: Joi.number().required(),
    serviceId: Joi.string().required().min(24).max(24),
    title: Joi.string().required(),
})

const suspendBusinessServiceSchema = Joi.object({
    status: Joi.string().valid('active', 'disabled').required()
})


export const buisnessAccount = (user: IUser) => buisnessAccountSchema.validate(user)
export const individualAccount = (user: IUser) => individualAccountSchema.validate(user)
export const updateIndividualProfileInfo = (user: IUser) => updateIndividualProfileInfoSchema.validate(user)
export const updatePasswordValidate = (data: object) => updatePasswordSchema.validate(data)
export const updateWorkshopInfoValidate = (user: IUser) => updateWorkShopInfoSchema.validate(user)
export const googleSchemaValidate = (data: object) => googleSchema.validate(data)
export const businessTimeSchemaValidate = (data: BuisnessAccountsProps['businessTime']) => businessTimeSchema.validate(data)
export const adminSchemaValidate = (data: AdminProps) => adminSchema.validate(data)
export const serviceSchemaValidate = (data: IServicesProps) => serviceSchema.validate(data)
export const categorySchemaValidate = (data: ICategoryProps) => categorySchema.validate(data)
export const businessServiceSchemaValidate = (data: BusinessServicesProps) => businessServiceSchema.validate(data)
export const suspendServiceValidate = (data: any) => suspendBusinessServiceSchema.validate(data)