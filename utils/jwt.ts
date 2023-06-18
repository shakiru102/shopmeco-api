import jwt from 'jsonwebtoken'
import { IUser } from '../types'

export const generateToken = (userId: string) => jwt.sign({ userId }, process.env.JWT_SIGNATURE as string, {
    expiresIn: '2d'
} )