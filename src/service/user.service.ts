import { PrismaClient, Profile, User } from "@prisma/client";
import UserRepository from "../repository/user.repository";
import { CreateUserDto, CreateUserRepo, UpdateUserDto } from "../interfaces/user.interface";
import { IResponse } from "../interfaces/response.interface";


export default class UserService{

    constructor(private prismaService: PrismaClient){
        this.prismaService = prismaService;
    }

    public async makeUser(item: CreateUserDto){
        try {
           const responseMakeUser = await this.prismaService.$transaction(async (trx) => {

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

                if(respUser.status !== 200 || respUser.data === null){
                    throw respUser
                }

                request.profile.user_id = Number(respUser.data.user_id);

                const respProfile: Awaited<IResponse<Partial<Profile>>> = await userRepository.createProfile(request.profile)
              
                if(respProfile.status !== 200){
                    throw respProfile
                }

                return{
                    status: 200,
                    message: `Success to create user => ${request}`,
                    data: request
                };
                
           });

           console.log(responseMakeUser, "MAKE USER")
           return responseMakeUser;

        } catch (error: any) {
            return{
                status: error.status ?? 500,
                message: error.message ?? 'Failed to create user',
                data: null
            }
        }
    }

    public async editUser(item: UpdateUserDto){
        try {
            const responseEditUser = await this.prismaService.$transaction(async (trx) => {
                const userTransaction = new UserRepository(trx);

                const modifyDate = Date.parse(item.birth);

                const modifiedDate = new Date(modifyDate);

                const payload: CreateUserRepo = {
                    user: {
                        username: item.username,
                        user_id: item.user_id,
                        email: item.email,
                        avatar: item.avatar,
                        password: item.password,
                    },
                    profile: {
                        id: item.profile_id,
                        experience: item.experience,
                        hobby: item.hobby,
                        birth: modifiedDate,
                        user_id: item.user_id
                    }
                }

                const respUpdateUser: Awaited<IResponse<Partial<User>>> 
                    = await userTransaction.userUpdate(payload.user);

                if(respUpdateUser.status !== 200){
                    throw respUpdateUser
                }

                const respProfileUpdate: Awaited<IResponse<Partial<Profile>>> =
                    await userTransaction.profileUpdate(payload.profile);
                
                if(respProfileUpdate.status !== 200){
                    throw respProfileUpdate
                }

                return{
                    status: 200,
                    message: 'Success to update data',
                    data: {user: respUpdateUser, profile: respProfileUpdate}
                }
            })

            console.log(responseEditUser, "EDIT USER")
            return responseEditUser;
        } catch (error:any) {
            return{
                status: 500,
                message: error.message,
                data: null
            }
        }
    }


}