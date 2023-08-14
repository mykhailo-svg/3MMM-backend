import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import * as express from 'express';

const cors = require('cors');

import * as morgan from 'morgan';

import mongoose from 'mongoose';

import Blog from './modules/userPlaceholder';

import UserRouter from './routers/User/user-router';

dotenv.config();




//express app
const app = express();



const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(morgan('dev'));

app.use(cookieParser());

const dbURI = process.env.DB_URL;
// "mongodb+srv://<username>:<password>@cluster0.lmqr4rh.mongodb.net/?retryWrites=true&w=majority"

const OPTIONS: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(dbURI, OPTIONS)
  .then((result: any) => {
    console.log("connected" + result);
    app.listen(PORT)
  })
  .catch((err: string) => console.log(err));








app.use('',UserRouter);





