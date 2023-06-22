import { Router } from "express";
import { auth } from "../../middlewares/auth/auth";
import { updateProfileInfo, updateUserPasswords, updateUserPhoto, userProfile } from "../../controllers/user";
import upload from "../../utils/multer";
import { updateIndividualProfileInfoValidation, updatePasswordValidation } from "../../middlewares/user";

const route = Router()
route.use(auth)

route.get('/user-profile', userProfile)
route.patch('/user-photo', upload.single('file'), updateUserPhoto)
route.patch('/update-user-profile', updateIndividualProfileInfoValidation, updateProfileInfo)
route.patch('/update-password', updatePasswordValidation, updateUserPasswords)

export default route