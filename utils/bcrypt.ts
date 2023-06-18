import bcrypt from "bcrypt"

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}