import jwt from 'jsonwebtoken'
import { IUser } from '../types'

export const generateToken = (userId: string) => jwt.sign({ userId }, process.env.JWT_SIGNATURE as string, {
    expiresIn: '2d'
} )

export const decodeToken = (token: string) => jwt.decode(token, process.env.JWT_SIGNATURE as any)