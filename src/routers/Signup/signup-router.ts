import { Router } from "express";

import authorizationController from "../../Controllers/authorization-controller";

const { getUsers, login, logout, registration, refresh, activate } = authorizationController;
const AuthorizationRouter = Router();

import { body } from 'express-validator';
import authMiddleware from "../../middlewares/auth-middleware";




AuthorizationRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 40 }),

    registration
);
AuthorizationRouter.post('/login', login);
AuthorizationRouter.post('/logout', logout);
AuthorizationRouter.get('/activate/:link', activate);
AuthorizationRouter.post('/refresh', refresh);
AuthorizationRouter.get('/userss',authMiddleware, getUsers);


export default AuthorizationRouter;

