import mongoose from "mongoose";
import { ICategoryProps } from "../types";

const schema = new mongoose.Schema<ICategoryProps>({
  name: {
    type: String
  },
  caption: {
    type: String
  },
  serviceId: {
    type: String
  }
},{ timestamps: true})

export default mongoose.model<ICategoryProps>('categories', schema)