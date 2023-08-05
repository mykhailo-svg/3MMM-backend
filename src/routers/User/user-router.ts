//@ts-nocheck
import { Router} from "express";


const UserRouter = new Router()

import userController from "./user-controller";

UserRouter.get('/get-user/:id', userController.getUserById)


UserRouter.get('/all-users', userController.getAllUsers)


export default UserRouter;

