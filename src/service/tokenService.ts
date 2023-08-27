import * as jwt from 'jsonwebtoken';
import tokenModel from '../modules/tokenModel';

type Typeuser = {

    id:string

}

class tokenService {
    

    generateTokens(payload: any) {
        const accesToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accesToken,
            refreshToken
        }
    }
    async saveToken(userID: any, refreshToken: any) {

        const tokenData = await tokenModel.findOne({ user: userID })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();

        }

        const token = await tokenModel.create({ user: userID, refreshToken });


        return token;
    }
    async deleteToken(refreshToken: string) {
        console.log(refreshToken);

        const tokenData = await tokenModel.deleteOne({ refreshToken: refreshToken });
        console.log(tokenData);

        return tokenData;

    }
    async validateAccesToken(token: string): Promise<any> {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCES_SECRET);
            return userData;
        } catch (error) {

            console.log(error);
            

        }
    }
    async validateRefreshToken(token: string): Promise<null | Typeuser>{
        try {
            
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            const userr = userData as Typeuser;
            return  userr;

        } catch (error) {

            console.log(error);
            return null;

        }
    }
    async findToken(refreshToken:string){
        const tokenData = await tokenModel.findOne({ refreshToken:refreshToken});
        return tokenData;
    }
}

export default new tokenService()