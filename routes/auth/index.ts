import { Router } from "express";
import { createBuisnessUserAccount, createIndividualUserAccount, signInWithEmailAndPassword, signinWithGoogle } from "../../controllers/auth/auth";
import { businessSignupAccountMiddleware, googleSchemaValidations, individualSignupAccountMiddleware } from "../../middlewares/auth/auth";
import upload from "../../utils/multer";

const route = Router()

route.post('/signup-business', businessSignupAccountMiddleware, upload.single('file'), createBuisnessUserAccount)
route.post('/signup', individualSignupAccountMiddleware, createIndividualUserAccount)
route.post('/signin/google', googleSchemaValidations, signinWithGoogle)
route.post('/signin', signInWithEmailAndPassword)


export default route