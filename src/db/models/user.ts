import {mongoose, Schema, Document} from "../mongooseConection";
import bcrypt from "bcrypt"; //bcrypt.hash and bcrypt.compare

export interface IUserSchema extends Document {
    id?: string;
    email: string;
    name: string;
    password: string;
  }
  

const Userschema:Schema = new mongoose.Schema({
            
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        lowercase:true
    },
    password:{
        type: String,
        required:true,
        select:false
    },
    createAt:{
        type:Date,
        default: Date.now
    },
});

Userschema.pre<IUserSchema>("save", async function(next){ 
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model<IUserSchema>("user", Userschema, "user");

export {User};