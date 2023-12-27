import { IsArray, IsString } from "class-validator";
import { CreateUserDto } from "../interfaces/user.interface";

export default class CreateUserValidator implements CreateUserDto{
    @IsString()
    username!: string;

    @IsString()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    confirm_password!: string;

    @IsString()
    avatar?: string;

    @IsString()
    experience!: string;

    @IsArray()
    hobby!: string[]
    
    @IsString()
    birth!: string;
}