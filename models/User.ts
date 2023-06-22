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
}, { timestamps: true })

export default mongoose.model<IUser>('users', schema)