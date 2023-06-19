import mongoose from "mongoose";

const schema = new mongoose.Schema<{ name: string }>({
    name: {
        type: String
    }
})

export default mongoose.model<{name: string; _id: object}>('services', schema)