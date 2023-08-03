var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var Blog = require('./modules/userPlaceholder');
var mongoose = require('mongoose');
//express app
var app = express();
var PORT = process.env.PORT || 3001;
app.use(cors());
var dbURI = "mongodb+srv://user:Gekrq1YYqKpRlwm9@cluster0.lmqr4rh.mongodb.net/test?retryWrites=true&w=majority";
// "mongodb+srv://<username>:<password>@cluster0.lmqr4rh.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (result) {
    console.log("connected");
    app.listen(PORT);
})
    .catch(function (err) { return console.log(err); });
app.use(morgan('dev'));
app.get('/update-users', function (req, res) {
    //count query
    Blog.find().skip(req.query.step).limit(1)
        .then(function (result) {
        if (result.length > 0) {
            res.json(result);
        }
        else {
            res.json({ result: result });
        }
    })
        .catch(function (err) {
        console.log("some err");
    });
    // res.json({
    //   message: "hello from backend! express.js"
    // })
});
app.get('/all-users', function (req, res) {
    // if (req.query.update) {
    //   console.log("yes");
    // }
    console.log(req.query.step + '- step');
    //count query
    Blog.countDocuments()
        .then(function (count) {
        console.log("length:" + count);
    })
        .catch(function (err) {
        console.log("some err");
    });
    //get all users
    Blog.find().skip(req.query.step).limit(1)
        .then(function (result) {
        res.json(result);
    })
        .catch(function (err) {
        console.log(err);
    });
    // res.json({
    //   message: "hello from backend! express.js"
    // })
});
