import { Router } from "express";
import { createBuisnessUserAccount, createIndividualUserAccount, signInWithEmailAndPassword, signinWithGoogle } from "../../controllers/auth/auth";
import { businessSignupAccountMiddleware, individualSignupAccountMiddleware } from "../../middlewares/auth/auth";
import upload from "../../utils/multer";

const route = Router()

route.post('/signup-business', businessSignupAccountMiddleware, upload.array('files'), createBuisnessUserAccount)
route.post('/signup', individualSignupAccountMiddleware, createIndividualUserAccount)
route.post('/signup/google', signinWithGoogle)
route.post('/signin', signInWithEmailAndPassword)


export default route