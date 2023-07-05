import { Router } from "express"
import { updateWorkshopValidation } from "../../middlewares/user"
import { buisnessTimeValidations, businessAuth, businessServiceSchemaValidations } from "../../middlewares/business"
import { businessLogo, businessPhotos, createBusinessService, deleteBusinessService, getBusinessServices, suspendBusinessService, updateBusinessServiceDetails, updateOpeningTime, updateServiceDisplayPhoto, updateWorkshopInfo } from "../../controllers/business"
import { auth } from "../../middlewares/auth/auth"
import upload from "../../utils/multer"

const route = Router()


route.patch('/update-business-info', auth, businessAuth, updateWorkshopValidation, updateWorkshopInfo )
route.patch('/update-business-logo', auth, businessAuth, upload.single('file'), businessLogo)
route.patch('/business-service-status/:businessServiceId', auth, businessAuth, suspendBusinessService)
route.patch('/update-business-photos', auth, businessAuth, upload.array('files'), businessPhotos)
route.patch('/update-business-time', auth, businessAuth, buisnessTimeValidations, updateOpeningTime)
route.patch('/business-service-display-photo/:businessServiceId', auth, businessAuth, upload.single('file'), updateServiceDisplayPhoto)
route.post('/create-business-service', auth, businessAuth, upload.single('file'), businessServiceSchemaValidations, createBusinessService)
route.get('/business-services', getBusinessServices)
route.put('/business-service-details/:businessServiceId', auth, businessAuth, upload.single('file'), businessServiceSchemaValidations, updateBusinessServiceDetails)
route.delete('/business-service/:businessServiceId', auth, businessAuth, deleteBusinessService)


export default route