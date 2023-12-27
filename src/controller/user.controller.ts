import express, { Router } from "express";
import UserService from "../service/user.service";
import { PrismaClient } from "@prisma/client";
import { CreateUserValidator } from "../validator/user.validator";


const prisma: PrismaClient = new PrismaClient();
const user = new UserService(prisma);

const router: Router = express.Router();


router.post("/create-user", CreateUserValidator, async (req,res) => {
    try {
        const result = await user.makeUser(req.body);
        res.status(result.status).json(result)
    } catch (error: any) {
        res.status(500).json()
    }
})

router.patch("/update-user", async (req,res) => {
    try {
        const result = await user.editUser(req.body)
        res.status(result.status).json(result)
    } catch (error) {
        res.status(500).json()
    }
})


export {router as userRouter}