import { NextFunction, Request, Response } from "express";
import Business from "../../models/Business";
import { businessServiceSchemaValidate, businessTimeSchemaValidate } from "../../utils/joi";

export const businessAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.userId
        const user = await Business.findOne({ userId })
        if(!user) return res.status(401).send({ error: "User unauthorized, create a business account to gain access" });
        // @ts-ignore
        req.businessId = user._id
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const buisnessTimeValidations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = businessTimeSchemaValidate(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message });
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const businessServiceSchemaValidations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = businessServiceSchemaValidate(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message });
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}