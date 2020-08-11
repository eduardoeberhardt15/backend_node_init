export interface IUser{
    id?:string;
    name:string;
    email:string;
    password:string;
}

export interface IUserClass{

    save: (user:IUser)=>Promise<boolean>,
    findByEmail: (email:string)=>Promise<IUser>
}