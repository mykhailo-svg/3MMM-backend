var uuid = require('uuid');
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
var OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(dbURI, OPTIONS)
    .then(function (result) {
    console.log("connected" + result);
    app.listen(PORT);
})
    .catch(function (err) { return console.log(err); });
app.use(morgan('dev'));
app.get('/all-users', function (req, res) {
    console.log(req.query.step + '- step');
    Blog.countDocuments()
        .then(function (count) {
        console.log("length:" + count);
    })
        .catch(function (err) {
        console.log("some err");
    });
    //get all users
    var step_parameter = req.query.step;
    var idUniq = uuid.v4();
    console.log(idUniq);
    Blog.find().skip(step_parameter).limit(1)
        .then(function (result) {
        res.json(result);
    })
        .catch(function (err) {
        console.log(err);
    });
});
