import e, { NextFunction, Request, Response } from "express";
import { buisnessAccount, individualAccount } from "../../utils/joi";
import axios from "axios";
import User from "../../models/User";
import { decodeToken } from "../../utils/jwt";

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

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
  if(!token) return res.status(401).send({ error: 'No token provided' })
  const authUser = async (id: string) => {
        const user = await User.findById(id,{ password: 0 });
        return user;
      }

      await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
      .then(async (response) => {
           const { email } = response.data
           const user = await authUser(email)
           if (!user) return res.status(401).send({ error: 'User unauthorized' })  
          //  @ts-ignore
           req.userId = user.id
           next()
      })
      .catch(async () => {
        const decode: any = decodeToken(token)
        if(!decode) return res.status(401).send({ error: 'User unauthorized' })
        //  @ts-ignore
       req.userId = decode.userId
        next()
    })
}
