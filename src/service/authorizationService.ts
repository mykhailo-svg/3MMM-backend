
import SignupgModel from "../modules/userSignupModel";

import * as bcrypt from 'bcrypt';

import * as uuid from 'uuid';
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDTO";
import ApiError from "../Errors/error-handler";




class userService {
    async registration(email: string, password: string) {
        const candidate = await SignupgModel.findOne({ email: email });
        if (candidate) {
            console.log(`User with ${email} exists!`);

            throw ApiError.BadRequest(`User with ${email} exists!`, [])
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await SignupgModel.create({ email, password: hashPassword, activationLink });

        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);


        const userDTO = new UserDto(user);

        const tokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDTO
        }
    }
    async activate(activationLink: string) {

        const user = await SignupgModel.findOne({ activationLink });


        if (!user) {

            throw new Error('Wrong activation link!!!')

        }
        user.isActivated = true;
        user.save();

    }
    async login(email: string, password: string) {


        const user = await SignupgModel.findOne({ email });

        if (!user) {

            throw ApiError.BadRequest("User wasn't found!", [])


        }
        const exitstingPassword = await bcrypt.compare(password, user.password)
        if (!exitstingPassword) {

            throw ApiError.BadRequest("Incorrect password", []);

        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }

    }
    async logout(refreshToken: string) {
        console.log('refresh token ' + refreshToken);

        const token = await tokenService.deleteToken(refreshToken);
        return token;

    }
    async refresh(refreshToken: string) {
        if (!refreshToken) {

            throw ApiError.UnauthorizedError();
        }
        const userDatas = await tokenService.validateRefreshToken(refreshToken);
        const DbTokenExists = await tokenService.findToken(refreshToken);
        if (!userDatas || !DbTokenExists) {

            throw ApiError.UnauthorizedError();
            
        }
        const user = await SignupgModel.findById(userDatas.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
    async getAllUsers(){
        const users = await SignupgModel.find();
        
    }

}

export default new userService()