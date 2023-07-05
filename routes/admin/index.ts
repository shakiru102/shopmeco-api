import { Router } from "express";
import { adminAuth, categorySchemaValidations, createAdminValidations, serviceSchemaValidations } from "../../middlewares/admin";
import { adminSignin, createAdmin, createCategory, createService, editCategory, editService, getAllBusinessAccounts, updateBusinessActiveStatus } from "../../controllers/admin";

const route = Router()

route.post('/create-admin', createAdminValidations, createAdmin)
route.post('/signin-admin', adminSignin)
route.post('/create-service', adminAuth, serviceSchemaValidations, createService)
route.post('/create-category', adminAuth, categorySchemaValidations, createCategory)
route.get('/business', adminAuth, getAllBusinessAccounts)
route.patch('/business-status/:businessId', adminAuth, updateBusinessActiveStatus)
route.patch('/edit-service/:serviceId', adminAuth, serviceSchemaValidations, editService)
route.patch('/edit-category/:categoryId', adminAuth, categorySchemaValidations, editCategory)

export default route