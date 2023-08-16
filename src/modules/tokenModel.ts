import mongoose from 'mongoose';


import {InferSchemaType,Schema} from 'mongoose'

const scheme = mongoose.Schema;

export interface InterfaceSignupUser extends mongoose.Document {
    user:any
    refreshToken:string
    
};



const tokenScheme = new mongoose.Schema<InterfaceSignupUser>({
    user:{type:Schema.Types.ObjectId,ref:'Signup'},
    refreshToken:{type:String,required:true}

}, { timestamps: false ,versionKey:false});

let tokenModel = mongoose.model('Tokens', tokenScheme);



export default tokenModel;