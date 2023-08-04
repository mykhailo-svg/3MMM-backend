
//some some
import * as uuid from 'uuid';
import * as express from 'express';
const morgan = require('morgan');
const cors = require('cors');







import mongoose from 'mongoose';
import Blog from './modules/userPlaceholder';





//express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())


const dbURI = "mongodb+srv://user:Gekrq1YYqKpRlwm9@cluster0.lmqr4rh.mongodb.net/test?retryWrites=true&w=majority";
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

app.use(morgan('dev'));









app.get('/all-users', (req: any, res: any) => {

  console.log(req.query.step + '- step');

  

  
  Blog.countDocuments()
    .then((count: number) => {
      console.log("length:" + count);
    })
    .catch((err: string) => {
      console.log("some err");
    })


  //get all users

  let step_parameter: any = req.query.step;
  const idUniq = uuid.v4();
  console.log(idUniq);


  Blog.find().skip(step_parameter).limit(1)
    .then((result: any) => {
      res.json(result)
    })
    .catch((err: any) => {
      console.log(err)
    }


    )


})


// app.get('/all-users', (req: any, res: any) => {
  
//   Blog.find().skip()
//     .then((result: any) => {
//       res.json(result)
//     })
//     .catch((err: any) => {
//       console.log(err)
//     }

//     )
    
// })