import {Router} from "express";
import { auth } from "./auth";

const router = Router();

router.get("/", (request, response) =>{

    return response.status(201).send();
});

router.post("/auth", (request, response)=>{
    return auth(request, response);
})

export {router};