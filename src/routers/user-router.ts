import { Router } from "express";

const UserRouter = new Router()

import Blog from '../modules/userPlaceholder';

UserRouter.get('/get-user/:id',(req:Express.Request, res:Express.Response) => {
  
  
    Blog.findById(req.params.id)
      .then((result: any) => {
        res.json(result)
      })
      .catch((err: any) => {
        console.log("some error")
      }
  
      )})


export default UserRouter;

