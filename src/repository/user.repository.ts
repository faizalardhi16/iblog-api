import { PrismaClient, Prisma } from "@prisma/client";
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
            throw Error();
        }
    }

    public async createProfile(item: ProfileInterface){
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
            throw Error();
        }
    }

}