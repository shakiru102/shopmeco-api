import { Router } from "express";
import { getAccount, getServices } from "../../controllers/extras";

const route = Router()

route.get('/services', getServices)
route.get('/accounts', getAccount)

export default route