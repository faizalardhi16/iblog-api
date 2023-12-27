import { IsArray, IsString, validateOrReject } from "class-validator";
import { CreateUserDto } from "../interfaces/user.interface";
import CreateUserSchema from "../schema/user.schema";
import { NextFunction, Request, Response } from "express";
import Logger from "../utils/logger";


const logger = new Logger();

export const CreateUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = new CreateUserSchema();

        schema["email"] = req.body.email;
        schema["username"] = req.body.username;
        schema["password"] = req.body.password
        schema["confirm_password"] = req.body.confirm_password
        schema["avatar"] = req.body.avatar
        schema["experience"] = req.body.experience
        schema["hobby"] = req.body.hobby
        schema["birth"] = req.body.birth
        
        
        await validateOrReject(schema);

        next();
    } catch (error: any) {
        if(!error[0].constraints){
            res.send(400).json({
                status: 400,
                message: 'Error validate',
                data: null
            });

            return
        }
        const obj = Object.keys(error[0].constraints).map((item: any) => {return item});
        logger.error(error);
        res.status(400).json({status: 400, message: error[0].constraints[obj[0]], data: null})
    }
}