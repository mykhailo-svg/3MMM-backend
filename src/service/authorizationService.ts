import SignupgModel from "../modules/userSignupModel";

import * as bcrypt from 'bcrypt';

import * as uuid from 'uuid';
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDTO";




class userService{
    async registration(email:string,password:string){
        const candidate = await SignupgModel.findOne({email:email});
        if (candidate) {
            throw new Error(`User with ${email} exists!!!`)
        }
        const hashPassword = await bcrypt.hash(password,3);
        const activationLink = uuid.v4();
        const user = await SignupgModel.create({email,password:hashPassword,activationLink});

        await mailService.sendActivationMail(email,activationLink);


        const userDTO = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDTO});

        await tokenService.saveToken(userDTO.id,tokens.refreshToken);

        return{
            ...tokens,
            user:userDTO
        }
    }
}

export default new userService()