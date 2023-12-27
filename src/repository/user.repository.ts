import { PrismaClient, Prisma, Profile, User } from "@prisma/client";
import {  ProfileInterface, UserInterface } from "../interfaces/user.interface";
import Logger from "../utils/logger";
import { IResponse } from "../interfaces/response.interface";
import { selectQuery } from "../utils/selectQuery";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default class UserRepository{
    private logger: Logger = new Logger();

    constructor(private prismaService: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$transaction" | "$connect" | "$disconnect" | "$on" | "$use" | "$extends">){
        this.prismaService = prismaService
    }

    public async createUser(item: UserInterface){
        try {
            const resp = await this.prismaService.user.create({
                data: item,
                select: selectQuery(["email", "username", "avatar", "user_id"])
            });

            return{
                status: 200,
                message: `Success to create data => ${resp}`,
                data: resp
            }
        } catch (error: any) {
            this.logger.error(`${error.message} => ${item}`);
            return{
                status: 500,
                message: error.message,
                data: null
            }
        }
    }

    public async createProfile(item: ProfileInterface): Promise<IResponse<Partial<Profile>>>{
        try {
            const resp = await this.prismaService.profile.create({
                data: item,
                select: selectQuery(["experience", "hobby", "birth"])
            });

            return{
                status: 200,
                message: `Success to create data => ${resp}`,
                data: resp
            }
        } catch (error: any) {
            this.logger.error(`${error.message} => ${item}`);
            const modArr: Array<string> = error.message.split('\n')
            return{
                status: 500,
                message: modArr[modArr.length-1],
                data: null
            }
        }
    }

    public async userUpdate(item: UserInterface): Promise<IResponse<Partial<User>>>{
        try {
            const resp = await this.prismaService.user.update({
                where: {
                    user_id: item.user_id
                },
                data: item,
                select: selectQuery(["email","username","avatar"])
            })

            return{
                status: 200,
                message: 'Success to update data',
                data: resp
            }
        } catch (error: any) {
            this.logger.error(error.message)
            return{
                status: 500,
                message: error.message,
                data: null
            }
        }
    }

    public async profileUpdate(item: ProfileInterface): Promise<IResponse<Partial<Profile>>>{
        try {
            const resp = await this.prismaService.profile.update({
                where:{
                    id: item.id
                },
                data: item,
                select: selectQuery(["experience", "hobby", "birth"])
            })

            return{
                status: 200,
                message: 'Success to update data',
                data: resp
            }
        } catch (error: any) {
            this.logger.error(error.message);
            const modArr: Array<string> = error.message.split('\n')
            
            return{
                status: 500,
                message: modArr[modArr.length-1],
                data: null
            }
        }
    }

}