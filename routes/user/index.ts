import { Router } from "express";
import { auth } from "../../middlewares/auth/auth";
import { createBuisnessAccount, updateProfileInfo, updateUserPasswords, updateUserPhoto, updateWorkshopInfo, userProfile } from "../../controllers/user";
import upload from "../../utils/multer";
import { confirmAccountType, updateIndividualProfileInfoValidation, updatePasswordValidation, updateWorkshopValidation } from "../../middlewares/user";

const route = Router()
route.use(auth)

route.get('/user-profile', userProfile)
route.patch('/user-photo', upload.single('file'), updateUserPhoto)
route.patch('/update-user-profile', updateIndividualProfileInfoValidation, updateProfileInfo)
route.patch('/update-password', updatePasswordValidation, updateUserPasswords)
route.patch('/update-business-info', updateWorkshopValidation, confirmAccountType, updateWorkshopInfo )
route.patch('/create-business-account', createBuisnessAccount)

export default route