import { NextFunction, Request, Response } from "express";
import { adminSchemaValidate, categorySchemaValidate, serviceSchemaValidate } from "../../utils/joi";
import { decodeToken } from "../../utils/jwt";
import Admin from "../../models/Admin";

export const createAdminValidations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = adminSchemaValidate(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message });
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if(!token) return res.status(401).send({ error: 'No token provided' })
        const decode: any = decodeToken(token)
        if(!decode) return res.status(401).send({ error: 'User unauthorized' })
        const isAdmin = await Admin.findById(decode.userId)
        if(!isAdmin) return res.status(401).send({ error: 'User unauthorized' })
        //  @ts-ignore
       req.adminId = decode.userId
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const serviceSchemaValidations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = serviceSchemaValidate(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message });
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const categorySchemaValidations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = categorySchemaValidate(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message });
        next()
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}