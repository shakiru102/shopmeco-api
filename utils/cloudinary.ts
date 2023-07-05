import cloudinary from 'cloudinary'
import env from 'dotenv'

env.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


export const saveFile = async (filePath: string, folder: string, id?: string) => {
    try {
        const response = await cloudinary.v2.uploader.upload(filePath, {
            folder,
            ...(id && { public_id: id })
        })
        return {response}
    } catch (error: any) {
        return {error}
    }
    
}

export const deleteFile = async (publicId: string) => {
    try {
        const response = await cloudinary.v2.uploader.destroy(publicId)
        return { response }
    } catch (error: any) {
        return { error }
    }
}