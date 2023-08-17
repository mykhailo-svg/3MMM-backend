import { Request, Response } from 'express';
import ApiError from '../Errors/error-handler';



export default function (err: any, req: Request, res: Response, next: () => void) {

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message ,errors:err.errors})
    }
    return res.status(500).json({message:'Uncaught error'})

}