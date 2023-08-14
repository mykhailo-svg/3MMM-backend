import SignupgModel from "../modules/userSignupModel";

import * as bcrypt from 'bcrypt';

import * as uuid from 'uuid';
import mailService from "./mailService";




class userService{
    async registration(email:string,password:string){
        const candidate = await SignupgModel.findOne({email:email})
        if (candidate) {
            throw new Error(`User with ${email} exists!!!`)
        }
        const hashPassword = await bcrypt.hash(password,3);
        const activationLink = uuid.v4();
        const user = await SignupgModel.create({email,password:hashPassword,activationLink});

        await mailService.sendActivationMail(email,activationLink)
    }
}

export default new userService()