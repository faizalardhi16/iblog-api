import express, { Router } from "express";
import UserService from "../service/user.service";
import { PrismaClient } from "@prisma/client";


const prisma: PrismaClient = new PrismaClient();
const user = new UserService(prisma);

const router: Router = express.Router();


router.post("/create-user", async (req,res) => {
    try {
        const result = await user.makeUser(req.body);
        res.status(200).json(result)
    } catch (error: any) {
        res.status(error.response.status).json(error.response)
    }
})


export {router as userRouter}