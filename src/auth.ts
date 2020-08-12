import { Request, Response } from "express";
import bcrypt from "bcrypt";

import {Db} from "./db/db";
import { IUserSchema } from "./db/models/user";
import tokens from "./token";
import { requestAuth } from "./interfaces/IAuth";

export async function auth(request:Request, response:Response):Promise<Response>{

    const {name, email, password} = request.body;
    const headerAuth:string | undefined = request.headers.authorization;

    const mongoDb = new Db();
    const user:IUserSchema | null = await mongoDb.selectUserByEmail(email);
    if(!user){
        return response.status(400).send(false);
    }
    
    if(!await bcrypt.compare(password, user.password)){
        return response.status(401).send(false);
    }
    
    const token = tokens.sign(email);
   
    return response.status(200).send(
        {token}
    );
    
    //request.email
}