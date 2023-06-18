import mongoose from "mongoose";
import { IUser } from "../types";

const schema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
    },
    address: {
        type: String,
    },
    carModel: {
        type: String,
    },
    carName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    servicesId: {
        type: Array
    },
    state: {
        type: String,
    },
    workShop: {
        type: String,
    },
    workShopAddress: {
        type: String,
    },
    workShopPhoto: [
        {
            cloudId: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    userAccountsId: {
        type: Array,
    },
    picture: {
        type: String,
    }
})

export default mongoose.model<IUser>('users', schema)