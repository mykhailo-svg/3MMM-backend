//@ts-nocheck
import { Request, Response } from 'express';
import ApiError from '../Errors/error-handler';
import tokenService from '../service/tokenService';



export default function (err: any, req: Request, res: Response, next: (err:any) => void) {

    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {

            return next(ApiError.UnauthorizedError());
            
        }
        const accesToken = authorizationHeader.split(' ')[1];
        if (!accesToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccesToken(accesToken);
        if (!userData) {

            return next(ApiError.UnauthorizedError());            
        }
        req.user = userData;
        next('');
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}