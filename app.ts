//@ts-nocheck
const express = require('express');
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

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("connected" );
    app.listen(PORT)
  })
  .catch(err => console.log(err));

app.use(morgan('dev'));

app.get('/update-users', (req, res) => {
  
  //count query
  Blog.find().skip(req.query.step).limit(1)
  .then((result)=>{
    if (result.length>0) {
      res.json(result)
    }
    else{
      res.json({result})
    }
  })
  .catch((err)=>{
    console.log("some err");
  })

  // res.json({
  //   message: "hello from backend! express.js"
  // })


})


app.get('/all-users', (req, res) => {


  // if (req.query.update) {
  //   console.log("yes");
  // }
  console.log(req.query.step + '- step');

  //count query
  Blog.countDocuments()
  .then((count)=>{
    console.log("length:"+count);
  })
  .catch((err)=>{
    console.log("some err");
  })


  //get all users
  Blog.find().skip(req.query.step).limit(1)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
    }

    )

  // res.json({
  //   message: "hello from backend! express.js"
  // })


})


