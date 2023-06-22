import { Request, Response } from "express";
import { IUser } from "../../types";
import { saveFile } from "../../utils/cloudinary";
import User from "../../models/User";
import { decryptPassword, encryptPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
import axios from "axios";

export const createBuisnessUserAccount = async (req: Request, res: Response) => {
    try {
        const imageData: IUser['workShopPhoto'] = []
        const files = req.files
        const isUser = await User.findOne({ email: req.body.email })
        if(isUser) return res.status(400).send({ error: "User already exists" })
        if(files){
            for(let file of files as any) {
                const { path, originalname } = file
                const { error, response } = await saveFile(path, 'work-shop-photo')
                if(error) res.status(400).send({ warning: "Error saving work shop photo: " + originalname})
                response && imageData.push({
                    cloudId: response.public_id,
                    url: response.secure_url
                })
            }
        }
        const { 
            email,
            password,
            fullName,
            phoneNumber,
            workShop,
            workShopAddress,
            userAccountsId
        }: IUser = req.body
        const hashedPassword = await encryptPassword(password as string)
        const user = await User.create({
            email,
            fullName,
            password: hashedPassword,
            userAccountsId,
            ...(files && { workShopPhoto: imageData }),
            ...(phoneNumber && { phoneNumber }),
            ...(workShop && { workShop }),
            ...(workShopAddress && { workShopAddress })
         })
         if(!user) return res.status(400).send({ error: "Could not create user" })
         const token = generateToken(user._id)
         res.status(200).send({
            message: "User created successfully",
            token
         })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const createIndividualUserAccount = async (req: Request, res: Response) => {
   try {
    const isUser = await User.findOne({ email: req.body.email })
    if(isUser) return res.status(400).send({ error: "User already exists" })
        const {
            address,
            carModel,
            carName,
            email,
            fullName,
            password,
            phoneNumber,
            state,
            userAccountsId,

        }: IUser = req.body
        const hashedPassword = await encryptPassword(password as string)
        const user = await User.create({
            email,
            fullName,
            password: hashedPassword,
            userAccountsId,
            ...(address && { address }),
            ...(carModel && { carModel }),
            ...(carName && { carName }),
            ...(phoneNumber && { phoneNumber }),
            ...(state && { state }),
         })
         if(!user) return res.status(400).send({ error: "Could not create user" })
         const token = generateToken(user._id)
         res.status(200).send({
            message: "User created successfully",
            token
         })
   } catch (error: any) {
     res.status(500).send({ error: error.message })
   }
}

export const signinWithGoogle = async (req: Request, res: Response) => {
    try {
        if(!req.body.accessToken) return res.status(400).send({ error: "accessToken is required" })
       const authUser = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${req.body.accessToken}`)
       console.log(authUser);
       if(authUser.status = 200 ){
          if(!authUser.data.email) return res.status(400).send({ error: 'User email not added to google scope' });
          const user = await User.findOne({ email: authUser.data.email})
          if(user) {
            return res.status(200).send({ message: "User is authenticated" })
          }
             const createUser = await User.create({ 
                email: authUser.data.email,
                fullName: authUser.data.name,
                picture: authUser.data.picture,
             })
             if(!createUser) return res.status(400).send({ message: 'Could not create user' })
            res.status(200).send({ message: "User is authenticated" })
       }
       
    } catch (error: any) {
       res.status(error.response.status).send(error.response.data)
    }
 }

 export const signInWithEmailAndPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const isEmail = await User.findOne({ email })
        if(!isEmail) return res.status(400).send({ error: "Email or password is invalid" })
        const isPassword = await decryptPassword(password, isEmail.password as string)
        if(!isPassword) return res.status(400).send({ error: "Email or password is invalid" })
        console.log(isEmail._id);
        
        const token = generateToken(isEmail._id)
        res.status(200).json({
            message: "User is authenticated",
            token
        })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
 }

// export const  