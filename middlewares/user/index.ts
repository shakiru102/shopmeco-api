import { NextFunction, Request, Response } from "express";
import { updateIndividualProfileInfo, updatePasswordValidate, updateWorkshopInfoValidate } from "../../utils/joi";
import User from "../../models/User";

export const updateIndividualProfileInfoValidation = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const { error } = updateIndividualProfileInfo(req.body)
    if(error) return res.status(400).send({ error: error.details[0].message });
    next()
   } catch (error: any) {
    res.status(500).send({ error: error.message })
   }
}

export const updatePasswordValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
     const { error } = updatePasswordValidate(req.body)
     if(error) return res.status(400).send({ error: error.details[0].message });
     next()
    } catch (error: any) {
     res.status(500).send({ error: error.message })
    }
 }

export const updateWorkshopValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = updateWorkshopInfoValidate(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message });
        next()
       } catch (error: any) {
        res.status(500).send({ error: error.message })
       }
}

export const confirmAccountType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.userId
        const user = await User.findOne({ _id: userId, userAccountsId: {
            $in: "business"
        }})
        if(!user) return res.status(400).send({ error: "Create a business account to update information." });
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}