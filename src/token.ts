import jwt from "jsonwebtoken";
import hashToken from "./config/auth.json"; 
import { decode } from "./interfaces/IAuth";

class Token{

    public sign(unique:string, time?:number):string{

        const token:string = jwt.sign({unique}, hashToken.secret, {
            expiresIn: time || 86400
        });

        return token;
    }

    public validation(token:string | undefined):Object | undefined{ 

        let objReturn;

        if(token)
        jwt.verify(token, hashToken.secret, (err, decoded) =>{
           if(decoded){
               const resp:decode = decoded;
               objReturn=resp.unique;
           } 
           
        });

        return objReturn;
    }
}

export default new Token();