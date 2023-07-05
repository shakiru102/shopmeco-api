import mongoose from "mongoose";
import { IServicesProps } from "../types";

const schema = new mongoose.Schema<IServicesProps>({
    name: {
        type: String
    },
    caption: {
        type: String
    }

}, { timestamps: true })

export default mongoose.model<IServicesProps>('services', schema)