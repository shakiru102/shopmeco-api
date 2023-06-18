import e, { NextFunction, Request, Response } from "express";
import { buisnessAccount, individualAccount } from "../../utils/joi";

export const businessSignupAccountMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = buisnessAccount(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message });
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const individualSignupAccountMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = individualAccount(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message });
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}