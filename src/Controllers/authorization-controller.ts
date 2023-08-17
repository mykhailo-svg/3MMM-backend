import { Request, Response } from 'express';
import authorizationService from '../service/authorizationService';




class AuthorizationController {
    async registration(req: Request, res: Response,next:(error:string)=>void) {

        try {

            const {email,password} = req.body; 
            
            
            const userData = await authorizationService.registration(email, password)
            res.cookie('refreshToken', userData, { maxAge: 30 * 24 * 60 * 60 * 1000 ,httpOnly:true})
            return res.json(userData);
        }
        catch (error) {
            next(error);

        }


    }
    async login(req: Request, res: Response,next:(error:string)=>void) {

        try {
            res.json('hiii')
        }
        catch (error) {
            next(error);
        }


    }
    async logout(req: Request, res: Response,next:(error:string)=>void) {

        try {
            res.json('hiii')
        }
        catch (error) {
            next(error);
        }


    }
    async activate(req: Request, res: Response,next:(error:string)=>void) {

        try {
            console.log(`link ${req.params.link}`);
            
            const activationLink = req.params.link;
            await authorizationService.activate(activationLink);

            return res.redirect(process.env.API_URL);
        }
        catch (error) {
            console.log(error);
            next(error);
        }


    }
    async refresh(req: Request, res: Response,next:(error:string)=>void) {

        try {
            res.json('hiii')
        }
        catch (error) {
            next(error);
        }


    }
    async getUsers(req: Request, res: Response,next:(error:string)=>void) {

        try {
            res.json('hiii')
        }
        catch (error) {
            next(error);
        }


    }
}

export default new AuthorizationController();