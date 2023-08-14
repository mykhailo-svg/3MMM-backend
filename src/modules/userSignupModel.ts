import mongoose from 'mongoose';


import {InferSchemaType,Schema} from 'mongoose'

const scheme = mongoose.Schema;

export interface InterfaceSignupUser extends mongoose.Document {
    email: string
    password:string 
    isActivated:boolean
    activationLink:string
    
};



const signupScheme = new mongoose.Schema<InterfaceSignupUser>({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    isActivated:{type:Boolean,default:false},
    activationLink:{type:String}

}, { timestamps: false ,versionKey:false});

let SignupgModel = mongoose.model('Signup', signupScheme);



export default SignupgModel;