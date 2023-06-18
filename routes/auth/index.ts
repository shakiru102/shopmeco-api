import { Router } from "express";
import { createBuisnessUserAccount, createIndividualUserAccount, signinWithGoogle } from "../../controllers/auth/auth";
import { businessSignupAccountMiddleware, individualSignupAccountMiddleware } from "../../middlewares/auth/auth";
import upload from "../../utils/multer";

const route = Router()

route.post('/signup-buisness', upload.array('files'), businessSignupAccountMiddleware, createBuisnessUserAccount)
route.post('/signup', individualSignupAccountMiddleware, createIndividualUserAccount)
route.post('/signup/google', signinWithGoogle)


export default route