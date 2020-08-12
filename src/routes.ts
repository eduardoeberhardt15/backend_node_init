import {Router} from "express";
import { auth } from "./auth";

import {midlewareAuth} from "./midlewareAuth";

const router = Router();
router.use("/auth", midlewareAuth);

router.get("/", (request, response) =>{

    return response.status(201).send({ok:"its working"});
});

router.post("/auth", auth);

export {router};