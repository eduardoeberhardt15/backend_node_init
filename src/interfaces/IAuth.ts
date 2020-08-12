import {Request} from "express";

export interface requestAuth extends Request{
    email:string | undefined;
}

export interface decode extends Object{
    unique?:string;
}