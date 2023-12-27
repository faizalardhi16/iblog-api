
export type CreateUserDto = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    avatar?: string;
    experience: string;
    hobby: string[];
    birth: string;
}

export type UserInterface = {
    user_id?: number
    username: string
    email: string
    password: string
    avatar?: string
}

export type ProfileInterface = {
    id?:number;
    user_id: number; 
    experience: string;
    hobby: string[];
    birth: Date;
}

export type CreateUserRepo = {
    user: UserInterface,
    profile: ProfileInterface
}

export type UpdateUserDto = {
    profile_id: number;
    user_id: number;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    avatar?: string;
    experience: string;
    hobby: string[];
    birth: string;
}