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
    picture: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model<IUser>('users', schema)