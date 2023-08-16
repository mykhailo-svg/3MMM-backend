import { Router} from "express";
import userController from "../../Controllers/user-controller";


const UserRouter = Router()



UserRouter.get('/get-user/:id', userController.getUserById)


UserRouter.get('/all-users', userController.getAllUsers)


export default UserRouter;

