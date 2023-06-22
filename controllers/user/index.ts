import { Request, Response } from "express";
import User from "../../models/User";

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