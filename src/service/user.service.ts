import { Prisma, PrismaClient } from "@prisma/client";
import UserRepository from "../repository/user.repository";
import { CreateUserDto, CreateUserRepo } from "../interfaces/user.interface";


export default class UserService{

    constructor(private prismaService: PrismaClient){
        this.prismaService = new PrismaClient();
    }

    public async makeUser(item: CreateUserDto){
        try {
           const responseMakeUser = this.prismaService.$transaction(async (trx) => {

                const userRepository = new UserRepository(trx);

                const modifyDate = Date.parse(item.birth);

                const modifiedDate = new Date(modifyDate);

                let request: CreateUserRepo = {
                    user: {
                        username: item.username,
                        email: item.email,
                        avatar: item.avatar,
                        password: item.password,
                    },
                    profile: {
                        user_id: 0,
                        experience: item.experience,
                        hobby: item.hobby,
                        birth: modifiedDate
                    }
                };

                const respUser = await userRepository.createUser(request.user);

                if(!respUser.status){
                    return{
                        status: 500,
                        message: 'Error to Create User',
                        data: null
                    }
                }

                request.profile.user_id = Number(respUser.data.user_id);

                const respProfile = await userRepository.createProfile(request.profile)

                if(!respProfile.status){
                    return{
                        status: 500,
                        message: 'Error to Create Profile',
                        data: null
                    }
                }

                return{
                    status: 200,
                    message: `Success to create user => ${request}`,
                    data: request
                };
           })

           return responseMakeUser;

        } catch (error: any) {
            return{
                status: error.response.status ?? 500,
                message: error.response.message ?? 'Failed to create user',
                data: null
            }
        }
    }


}