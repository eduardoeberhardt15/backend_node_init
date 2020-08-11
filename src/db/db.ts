import {User, IUserSchema} from "./models/user";
import { IUser } from "src/interfaces/IUser";
import { Document } from "mongoose";

export class Db{


    selectAllUsers = function(query = {}, fields:string):Promise<[]>{

        return new Promise(resolve=>
        User.findOne(query, fields).lean().exec( (e:any, docs:[])=> {
        resolve(docs); })
        
        );
    };

    selectUserByEmail = async function(email:string):Promise<IUserSchema | null>{ 

        let user =  await User.findOne({email}).select("+password");
        return user;
    }

    insertUser = async function(user:IUser):Promise<boolean>{ 

        const {email} = user;
        try{
        
        if(await User.findOne({email})){
            console.log("usuario já cadastrado");
            return false;
        }
        const users =   await User.create(user);
        
        return true;

        }catch(err){
            console.log(err.message);
            return false;
        }
    };

    updatePassword = async function(params:IUser):Promise<boolean>{

        const {id, password} = params;

        try{
            await User.findByIdAndUpdate(id, {
                "$set": {
                    password
                }
            });
            console.log("password Updated");
            return true;

        }catch(err){
            console.log(err.message);
            return false;
        }
    };

    

};

