import { NextFunction, Request, Response } from "express";
import { updateIndividualProfileInfo, updatePasswordValidate } from "../../utils/joi";

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