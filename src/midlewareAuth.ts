
import {Request, Response, NextFunction, RequestHandler} from "express";
import tokens from "./token";
import { requestAuth, decode } from "./interfaces/IAuth";


export const midlewareAuth:RequestHandler = (request:any, response:Response, next:NextFunction)=>{

    const authHeader = request.headers.authorization;

    if(!authHeader) response.status(401).send({error:"Token not provided"});

    const token:decode | undefined = tokens.validation(authHeader);
    if(token){
        
        request.email = token;
        return next();
    } 

    else return response.status(401).send({error: "Ivalid Token"})

}