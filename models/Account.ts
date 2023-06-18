import mongoose from "mongoose";

export default mongoose.model<{
    name: string;
    description: string;
    _id: object;
}>('accounts')