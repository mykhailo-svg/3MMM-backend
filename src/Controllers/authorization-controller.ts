import { Request, Response } from 'express';
import authorizationService from '../service/authorizationService';




class AuthorizationController {
    async registration(req: Request, res: Response) {

        try {

            const {email,password} = req.body; 
            
            
            const userData = await authorizationService.registration(email, password)
            res.cookie('refreshToken', userData, { maxAge: 30 * 24 * 60 * 60 * 1000 ,httpOnly:true})
            return res.json(userData);
        }
        catch (error) {
            console.log(error);

        }


    }
    async login(req: Request, res: Response) {

        try {
            res.json('hiii')
        }
        catch (error) {

        }


    }
    async logout(req: Request, res: Response) {

        try {
            res.json('hiii')
        }
        catch (error) {

        }


    }
    async activate(req: Request, res: Response) {

        try {
            res.json('hiii')
        }
        catch (error) {

        }


    }
    async refresh(req: Request, res: Response) {

        try {
            res.json('hiii')
        }
        catch (error) {

        }


    }
    async getUsers(req: Request, res: Response) {

        try {
            res.json('hiii')
        }
        catch (error) {

        }


    }
}

export default new AuthorizationController();