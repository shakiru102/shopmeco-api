import { Request, Response } from "express"
import Business from "../../models/Business"
import { BuisnessAccountsProps, ImageProps } from "../../types"
import { deleteFile, saveFile } from "../../utils/cloudinary"
import BusinessService from "../../models/BusinessService"
import paginatedResult from "../../utils/pagination"
import { suspendServiceValidate } from "../../utils/joi"

export const updateWorkshopInfo = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId
        const { workShop, workShopAddress, caption, description }: BuisnessAccountsProps = req.body
        const updateWorkshop = await Business.updateOne({ userId }, {
            $set: {
                ...(workShop && { workShop }),
                ...(workShopAddress && { workShopAddress }),
                ...(caption && { caption }),
                ...(description && { description })
            }
        })
        if(updateWorkshop.matchedCount === 0) return res.status(400).send({ error: "Could not update work shop information" })
        res.status(200).send({ message: "Work shop information updated successfully" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const businessLogo = async (req: Request, res: Response) => {
    try {
        //  @ts-ignore
        const userId = req.userId
        const file = req.file
        if(!file) return res.status(404).send({ error: "File not found" })
        const { error, response } = await saveFile(file.path, userId)
        if(error) return res.status(400).send({ error })
        const updateLogo = await Business.updateOne({ userId }, {
            $set: {
                "workShopLogo.cloudId": response?.public_id,
                "workShopLogo.url": response?.secure_url
            }
        })
        if(updateLogo.modifiedCount === 0) return res.status(400).send({ error: "Couldn't update work shop logo" })
        res.status(200).send({ message: "Updated work shop logo" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const updateOpeningTime = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId
        const updateBusinessTime = await Business.updateOne({ userId }, {
            $set: { 
                "businessTime.from": req.body.from,
                "businessTime.to": req.body.to
             }
        })
        if(updateBusinessTime.modifiedCount == 0) return res.status(400).send({ error: "Could not set business time" })
        res.status(200).send({ message: "Business time is set successfully" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const businessPhotos = async (req: Request, res: Response) => {
    try {
    // @ts-ignore
        const userId = req.userId
        const files = req.files
        if(!files) return res.status(400).send({ error: "Files not found" })
        let photos: ImageProps[] = []
        // @ts-ignore
        for(let file of files) {
           const { path } = file
           const { response } = await saveFile(path, userId)
           response && photos.push({
            cloudId: response.public_idrr,
            url: response.secure_url
           })
        }
        const updateBusinessPhoto = await Business.updateOne({ userId }, {
            $push: {
                workShopPhotos: photos
            }
        })
        if(updateBusinessPhoto.modifiedCount === 0) return res.status(400).send({ error: "Couldn't update business photos" })
        res.status(200).send({ message: "Business photos updated successfully" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const createBusinessService = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId
        // @ts-ignore
        const businessId = req.businessId
        let displayPhoto: ImageProps 
        const file = req.file
        if(!file) return res.status(400).send({ error: "display photo not found" })
        const { error, response } = await saveFile(file.path, userId)
        if(error) return res.status(400).send({ error: error.message })
        displayPhoto = {
            cloudId: response?.public_id,
            url: response?.secure_url
        }
        const createService = await BusinessService.create({...req.body, displayPhoto, userId, businessId })
        if(!createService) return res.status(400).send({ error: "Could not create businesss ervice" })
        res.status(200).send({message: "Business service created" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const getBusinessServices = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1 
        const limit = parseInt(req.query.limit as string) || 10 
        const businessId = req.query.businessId
        const categoryId = req.query.categoryId
        const serviceId = req.query.serviceId
        const q = req.query.q
        const status = req.query.status
        const services = await BusinessService.find({ 
            ...(businessId && { businessId }),
            ...(categoryId && { categoryId }),
            ...(serviceId && { serviceId }),
            ...(q && { title: {
                $regex: q,
                $options: 'i'
            }}),
            ...(status && { isActive: status == 'active' ? true : false })
         })
        res.status(200).json(paginatedResult(services, page, limit))
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const suspendBusinessService = async (req: Request, res: Response) => {
    try {
        const { error } = suspendServiceValidate(req.body)
        if(error) return res.status(400).send({ error: error.details[0].message })
        // @ts-ignore
        const businessId = req.businessId
        const businessServiceId = req.params.businessServiceId
        const isBusinessServiceUpdated = await BusinessService.updateOne({ _id: businessServiceId, businessId }, {
            $set: {
                isActive: req.body.status == 'active' ? true : false 
            }
        })
        if(isBusinessServiceUpdated.modifiedCount === 0) return res.status(400).send({ error: "Could not update services status" })
        res.status(200).send({ message: "Business service status is updated successfully" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const updateServiceDisplayPhoto = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId
        const businessServiceId = req.params.businessServiceId
        const file = req.file
        if(!file) return res.status(400).send({ error: 'File not found' })
        const service = await BusinessService.findById(businessServiceId)
        if(!service) return res.status(400).send({ error: 'Invalid business service id' })
        await deleteFile(service.displayPhoto?.cloudId as string)
        const { error, response } = await saveFile(file.path, userId, service.displayPhoto?.cloudId)
        if(error) return res.status(400).send({ error: 'Error saving file' })
        await BusinessService.updateOne({ _id: businessServiceId }, {
            $set: {
                "displayPhoto.url": response?.secure_url,
                "displayPhoto.cloudId": response?.public_id
            }
        })
        res.status(200).send({ message: "Display photo has been updated" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const updateBusinessServiceDetails = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId
        const businessServiceId = req.params.businessServiceId
        const file = req.file
        let displayPhoto: ImageProps | null = null
        const service = await BusinessService.findById(businessServiceId)
        if(!service) return res.status(400).send({ error: 'Invalid business service id' })
        if(file){
            await deleteFile(service.displayPhoto?.cloudId as string)
            const { error, response } = await saveFile(file.path, userId, service.displayPhoto?.cloudId)
            if(error) return res.status(400).send({ error: 'Error saving file' })
            displayPhoto = {
                cloudId: response?.public_id,
                url: response?.secure_url
            }
        }
        const isUpdated = await BusinessService.updateOne({ _id: businessServiceId }, { 
            $set: {
                ...req.body, 
            ...(displayPhoto && { displayPhoto } )
            }
        })
        if(isUpdated.modifiedCount === 0) return res.status(400).send({error: "Could not update business service" })
        res.status(200).send({ message: "Business service has been updated" })

    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export const deleteBusinessService = async (req: Request, res: Response) => {
    try {
        const businessServiceId = req.params.businessServiceId
        const service = await BusinessService.findById(businessServiceId)
        if(!service) return res.status(400).send({ error: 'Invalid business service id' })
        const { error } = await deleteFile(service?.displayPhoto?.cloudId as string)
        if(error) return res.status(400).send({ error: "Could not delete display photo, entry not deleted" })
        await BusinessService.deleteOne({ _id: businessServiceId })
        res.status(200).send({ message: "Business service deleted" })
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}