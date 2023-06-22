import { Request, Response } from "express";
import User from "../../models/User";
import { saveFile } from "../../utils/cloudinary";
import { IUser } from "../../types";
import { decryptPassword } from "../../utils/bcrypt";

export const userProfile = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    try {
        const user = await User.findById(userId, { password: 0 })
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const updateUserPhoto = async (req: Request, res: Response) => {
    const file = req.file
    // @ts-ignore
    const userId = req.userId
    if(!file) return res.status(400).send({ error: "File not found" });
    try {
        const { response, error } = await saveFile(file?.path, 'users', userId )
        if(error) return res.status(400).send({ error });
        const updatePhoto = await User.updateOne({ _id: userId}, { 
            $set: {
                picture: response?.secure_url
            }
        })
        res.status(200).json(updatePhoto)
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const updateProfileInfo = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId
        const {
            address,
            carModel,
            carName,
            fullName,
            phoneNumber,
            state,
        }: IUser = req.body
        const isUpdated = await User.updateOne({ _id: userId}, {
            $set: { 
                ...(address && { address }),
                ...(carModel && { carModel }),
                ...(carName && { carName }),
                ...(fullName && { fullName }),
                ...(phoneNumber && { phoneNumber }),
                ...(state && { state }),
            }
        })
        if(isUpdated.modifiedCount === 0 ) return res.status(400).send({ error: "Couldn't update profile" })

        res.status(200).json({ message: "Profile updated successfully" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const updateUserPasswords = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId
        const { oldPassword, newPassword } = req.body
        const user = await User.findById(userId)
        if(!user) return res.status(400).send({ error: "User not found" })
        const isPassword = await decryptPassword(oldPassword, user?.password as string)
        if(!isPassword) return res.status(400).send({ error: "Password is incorrect" })
        const updatePassword = await User.updateOne({ _id: userId }, {
            $set: {
                password: newPassword
            }
        })
        if(updatePassword.modifiedCount === 0 ) return res.status(400).send({ error: "Couldn't update password" })
        res.status(200).send({message: "Password updated successfully" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}