import mongoose from "mongoose";

const schema = new mongoose.Schema<{
    name: string;
    description: string;
}>({
    description: {
        type: String,
    },
    name: {
        type: String,
    }
})

export default mongoose.model<{
    name: string;
    description: string;
    _id: object;
}>('accounts', schema)