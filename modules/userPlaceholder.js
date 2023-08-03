const mongoose = require('mongoose');


const scheme = mongoose.Schema;

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

const Blog = mongoose.model('Users', blogScheme);

module.exports = Blog;