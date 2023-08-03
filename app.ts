const uuid = require('uuid');
const express = require('express')
const morgan = require('morgan');
const cors = require('cors');


const Blog = require('./modules/userPlaceholder');

const mongoose = require('mongoose');


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
  .then((result: string) => {
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
  const idUniq = uuid.v4()
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


