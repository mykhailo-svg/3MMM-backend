import { Router} from "express";


const UserRouter = Router()

import userController from "./user-controller";

UserRouter.get('/get-user/:id', userController.getUserById)


UserRouter.get('/all-users', userController.getAllUsers)


export default UserRouter;

