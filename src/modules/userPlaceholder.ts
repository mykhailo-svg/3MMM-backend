import mongoose from 'mongoose';


import {InferSchemaType,Schema} from 'mongoose'

const scheme = mongoose.Schema;

export interface IUser extends mongoose.Document {
    name: string; 
    somethingElse?: number; 
};


const blogScheme = new mongoose.Schema({
    gender: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true,

    },
}, { timestamps: false });

let BlogModel = mongoose.model('Users', blogScheme);



export default BlogModel;