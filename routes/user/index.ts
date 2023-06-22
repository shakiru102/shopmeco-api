import { Router } from "express";
import { auth } from "../../middlewares/auth/auth";
import { userProfile } from "../../controllers/user";

const route = Router()
route.use(auth)

route.get('/user-profile', userProfile)

export default route