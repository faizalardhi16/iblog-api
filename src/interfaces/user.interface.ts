
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
    username: string
    email: string
    password: string
    avatar?: string
}

export type ProfileInterface = {
    user_id: number; 
    experience: string;
    hobby: string[];
    birth: Date;
}

export type CreateUserRepo = {
    user: UserInterface,
    profile: ProfileInterface
}