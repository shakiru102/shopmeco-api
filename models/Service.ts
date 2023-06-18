import mongoose from "mongoose";

export default mongoose.model<{name: string; _id: object}>('services')