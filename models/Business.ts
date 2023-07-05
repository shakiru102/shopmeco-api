import mongoose from "mongoose";
import { BuisnessAccountsProps } from "../types";

const schema = new mongoose.Schema<BuisnessAccountsProps>({
    userId: {
        type: String
    },
    workShop: {
        type: String
    },
    workShopAddress: {
        type: String
    },
    workShopPhotos: [
        {
            url: {
                type: String
            },
            cloudId: {
                type: String
            }
        }
    ],
    businessTime: {
       from: {
          day: { type: String },
          time: { type: String }
       },
       to: {
        day: { type: String },
        time: { type: String }
       }
    },
    isAccountActive: {
        type: Boolean,
        default: false
    },
    caption: {
        type: String
    },
    description: {
        type: String
    },
    workShopLogo: {
        cloudId: { 
            type: String 
        },
        url: {
            type: String
        }
    }
}, { timestamps: true })

export default mongoose.model<BuisnessAccountsProps>('business accounts', schema)