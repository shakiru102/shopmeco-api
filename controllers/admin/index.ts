import { Request, Response } from "express";
import { AdminProps, ICategoryProps, IServicesProps } from "../../types";
import Admin from "../../models/Admin";
import { decryptPassword, encryptPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
import Business from "../../models/Business";
import paginatedResult from "../../utils/pagination";
import Service from "../../models/Service";
import Category from "../../models/Category";

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { name, password, staffId }: AdminProps = req.body
        const isAdmin = await Admin.findOne({ staffId })
        if(isAdmin) return res.status(400).send({ error: "staff already registered" })
        const hashedPassword = await encryptPassword(password ? password : staffId as string)
        const admin = await Admin.create({
            name,
            staffId,
            password: hashedPassword
        })
        if(!admin) return res.status(400).send({ error: "Admin user not created" })
        res.status(200).send({ message: "Admin created successfully "})
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const adminSignin = async (req: Request, res: Response) => {
    try {
        const { staff, password } = req.body
        let user: AdminProps
        const isStaffId = await Admin.findOne({ staffId: staff })
        if(!isStaffId) {
        const isStaffName = await Admin.findOne({ name: staff })
        if(!isStaffName) return res.status(400).send({ error: "Invalid staff name or id" })
          user = isStaffName
        }
        else user = isStaffId

        const isPassword = await decryptPassword(password, user.password as string)
        if(!isPassword) return res.status(400).send({ error: "Invalid password" })
        const token = generateToken(user._id as string)
        res.status(200).send({ message: "Admin authenticated", token: token })

    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const getAllBusinessAccounts = async (req: Request, res: Response) => {
   try {
    const page = parseInt(req.query.page as string) || 1 
    const limit = parseInt(req.query.limit as string) || 10 
    const businessName = req.query.businessName || ''
      const account = await Business.find({
        ...(businessName && { workShop: {
            $regex: businessName,
            $options: "i"
        }})
      })
      res.status(200).send(paginatedResult(account, page, limit))
   } catch (error: any) {
    res.status(500).send({ error: error.message });
   }
}

export const updateBusinessActiveStatus = async (req: Request, res: Response) => {
    try {
        const businessId = req.params.businessId
        const updateBusinessStatus = async (value: boolean) => {
            const updateAccount = await Business.updateOne({ _id: businessId }, {
                $set: {
                    isAccountActive: value
                }
               })
    
               if(updateAccount.modifiedCount === 0) return res.status(400).send({ error: "Account status not updated" });
    
               res.status(200).send({ error: "Account status updated successfully." });
        }
        const business = await Business.findById(businessId)
        if(!business) return res.status(400).send({ error: "Business not found" });
        if(business.isAccountActive) updateBusinessStatus(false)
        else updateBusinessStatus(true)
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
}

export const createService = async (req: Request, res: Response) => {
    try {
        const service = await Service.create(req.body)
        if(!service) return res.status(400).send({ error: "Could not create service" });
        res.status(200).send({ message: "Service created" });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body)
        if(!category) return res.status(400).send({ error: "Could not create category" });
        res.status(200).send({ message: "Category created" });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const editService = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.serviceId
        const { name, caption }: IServicesProps = req.body
        const updateService = await Service.updateOne({ _id: serviceId}, {
            $set: {
                ...(name && { name }),
                ...(caption && {caption })
            }
        })
        if(updateService.modifiedCount === 0) return res.status(400).send({ error: "Service not found" })
        res.status(200).send({ message: "Service updated successfully "});
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const editCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId
        const { name, caption, serviceId }: ICategoryProps = req.body
        const updateCategory = await Category.updateOne({ _id: categoryId, serviceId }, {
            $set: {
                ...(name && { name }),
                ...(caption && { caption })
            }
        })
        if(updateCategory.modifiedCount === 0) return res.status(400).send({ error: "Category not found" })
        res.status(200).send({ message: "Category updated successfully "});
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}