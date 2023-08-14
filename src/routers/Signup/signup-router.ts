import { Router} from "express";

import authorizationController from "../../Controllers/authorization-controller";

const {getUsers,login,logout,registration,refresh,activate} = authorizationController;
const AuthorizationRouter = Router()



AuthorizationRouter.post('/registration',registration);
AuthorizationRouter.post('/login',login);
AuthorizationRouter.post('/logout',logout);
AuthorizationRouter.get('/activate/:linl',activate);
AuthorizationRouter.get('/refresh',refresh);
AuthorizationRouter.get('/gusers',getUsers);


export default AuthorizationRouter;

