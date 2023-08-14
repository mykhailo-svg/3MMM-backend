import { Request,Response } from 'express';

import * as uuid from 'uuid';

import Blog from '../../modules/userPlaceholder';

class UserController {
    getUserById(req: Request, res: Response) {
        Blog.findById(req.params.id)
            .then((result: any) => {
                res.json(result)
            })
            .catch((err: any) => {
                console.log("some error")
            })
    }
    getAllUsers(req: Request, res: Response) {


        // console.log(req.query.step + '- step');



        Blog.countDocuments()
            .then((count: number) => {
                console.log("length:" + count);
            })
            .catch((err: string) => {
                console.log("some err");
            })


        //get all users

        let step_parameter: any = req.query.step;
        const idUniq = uuid.v4();
        console.log(idUniq);


        Blog.find().skip(step_parameter).limit(1)
            .then((result: any) => {
                res.json(result)
            })
            .catch((err: any) => {
                console.log(err)
            }


            )


    }
}

export default new UserController();