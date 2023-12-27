import { IsArray, IsString, MinLength } from "class-validator";
import { CreateUserDto } from "../interfaces/user.interface";

export default class CreateUserSchema implements CreateUserDto{
    @IsString()
    @MinLength(8)
    username!: string;

    @IsString()
    @MinLength(8)
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsString()
    @MinLength(8)
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