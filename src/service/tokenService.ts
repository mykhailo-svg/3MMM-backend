import * as jwt from 'jsonwebtoken';
import tokenModel from '../modules/tokenModel';

class tokenService{
    generateTokens(payload:any){
        const accesToken = jwt.sign(payload,process.env.JWT_ACCES_SECRET,{expiresIn:'30m'});
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'});
        return {
            accesToken,
            refreshToken
        }
    }
    async saveToken(userID:any,refreshToken:any){

        const tokenData = await tokenModel.findOne({user:userID})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
            
        }

        const token = await tokenModel.create({user:userID,refreshToken});


        return token;
    }
}

export default new tokenService()