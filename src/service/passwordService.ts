
import SignupgModel from "../modules/userSignupModel";

import * as bcrypt from 'bcrypt';

import * as uuid from 'uuid';
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDTO";
import ApiError from "../Errors/error-handler";




class passwordService {
    async activation(email:string) {
        const user = await SignupgModel.findOne({email});

        if (!user) {
            
            throw ApiError.BadRequest("No existing email" ,[])
        }
    }

}

export default new passwordService()