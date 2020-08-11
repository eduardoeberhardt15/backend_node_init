import jwt from "jsonwebtoken";
import hashToken from "./config/auth.json"; 


class Token{

    public sign(unique:string, time?:number):string{

        const token:string = jwt.sign({unique}, hashToken.secret, {
            expiresIn: time || 86400
        });

        return token;
    }

    public validation(token:string):Object{

        let objReturn={};

        jwt.verify(token, hashToken.secret, (err, decoded) =>{
           if(decoded) objReturn=decoded;
           
        });

        return objReturn;
    }
}

export default new Token();