import mongoose from "mongoose";
import { AdminProps } from "../types";

const schema = new mongoose.Schema<AdminProps>({
    staffId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model<AdminProps>('admin', schema);