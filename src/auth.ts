import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {Db} from "./db/db";
import hashToken from "./config/auth.json"; 
import { IUserSchema } from "./db/models/user";

export async function auth(request:Request, response:Response):Promise<Response>{

    const {name, email, password} = request.body;

    const mongoDb = new Db();
    const user:IUserSchema | null = await mongoDb.selectUserByEmail(email);
    if(!user){
        return response.status(400).send(false);
    }
    
    if(!await bcrypt.compare(password, user.password)){
        return response.status(401).send(false);
    }

    const token = jwt.sign({email}, hashToken.secret, {
        expiresIn: 86400
    });
    
    
    // const user = await mongoDb.insertUser({name, email, password});
    /*jwt.verify(token, hashToken.secret, (err, decoded) =>{
        console.log(decoded);
    });*/
    return response.status(200).send(
        {token}
    );
    
}