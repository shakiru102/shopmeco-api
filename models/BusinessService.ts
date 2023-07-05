import mongoose from "mongoose";
import { BusinessServicesProps } from "../types";

const schema = new mongoose.Schema<BusinessServicesProps>({
    businessId: {
        type: String
    },
    description: { type: String },
    displayPhoto: {
        cloudId: { type: String },
        url: { type: String }
    },
    categoryId: { type: String },
    serviceId: { type: String },
    isActive: { 
        type: Boolean,
        default: true
     },
    price: { type: Number },
    title: { type: String },
    userId: { type: String },
    reviews: [
        {
            reviewerId: { type: String },
            review: { type: String },
            rating: { type: Number },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
}, { timestamps: true })

export default mongoose.model<BusinessServicesProps>('business services', schema)