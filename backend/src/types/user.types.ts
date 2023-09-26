export interface IUser {
    username: string,
    email: string,
    password: string,
    role: string,
    isVerified: boolean
}

export interface IFetchUser extends IUser {
    _id: any
}