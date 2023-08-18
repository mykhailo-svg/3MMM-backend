import { Request, Response } from 'express';
import authorizationService from '../service/authorizationService';
import { validationResult } from 'express-validator';
import ApiError from '../Errors/error-handler';

class AuthorizationController {
    async registration(req: Request, res: Response, next: (error: any) => void) {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Error while validation",errors.array()) )
            }

            const { email, password } = req.body;


            const userData = await authorizationService.registration(email, password)
            res.cookie('refreshToken', userData, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false })
            return res.json(userData);
        }
        catch (error) {
            next(error);

        }


    }
    async login(req: Request, res: Response, next: (error: string) => void) {

        try {
            const {email,password } = req.body;
            const userData = await authorizationService.login(email,password);
            res.cookie('refreshToken', userData, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false })
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }


    }
    async logout(req: Request, res: Response, next: (error: string) => void) {

        try {
            console.clear();
            const {refreshToken} = req.cookies;
            console.log(refreshToken + ' -token');
            
            const token = await authorizationService.logout(refreshToken.refreshToken);
            res.clearCookie('refreshToken');
            return res.json(refreshToken.refreshToken)
        }
        catch (error) {
            console.log(error);
            
        }



    }
    async activate(req: Request, res: Response, next: (error: string) => void) {

        try {
            console.log(`link ${req.params.link}`);

            const activationLink = req.params.link;
            await authorizationService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        }
        catch (error) {
            console.log(error);
            next(error);
        }


    }
    async refresh(req: Request, res: Response, next: (error: string) => void) {

        try {
            console.log(req.cookies.refreshToken.refreshToken + ' -token cookie');
            res.json(req.cookies.refreshToken.refreshToken)
            
        }
        catch (error) {
            next(error);
        }


    }
    async getUsers(req: Request, res: Response, next: (error: string) => void) {

        try {
            res.json('hiii')
        }
        catch (error) {
            next(error);
        }


    }
}

export default new AuthorizationController();