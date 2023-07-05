import { Request, Response } from "express";
import Service from "../../models/Service";
import Account from "../../models/Business";

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find()
        res.status(200).json(services)
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const getAccount = async (req: Request, res: Response) => {
    try {
        const accounts = await Account.find()
        res.status(200).json(accounts)
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}