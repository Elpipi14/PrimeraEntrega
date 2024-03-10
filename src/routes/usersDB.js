import { Router } from "express";

import UserManager  from "../daos/mongoDb/DB/userManager.js";
const userDao = new UserManager();

const routerUser = Router();

routerUser.get ("/", async (req, res)=>{
    try {
        const user = await userDao.getAll();
        res.json(user)
    } catch (error) {
        res.status(500).json({message:"error server"});
    }
})

export default routerUser;
