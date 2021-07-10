const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true, 
        min: 6,
        max: 255
    },
    mail : {
        type: String,
        required: true, 
        min: 6,
        max: 1024
    },
    phone: {
        type: Number,
        required: true,
        min:10
    },
    password: {
        type: String, 
        required: true, 
        min: 6,
        max: 255
    },
    age: {
        type: Number, 
        required: true,
        min: 1
    },
    gender: {
        type: String, 
        required: true, 
        min: 3, 
        max: 255
    },
    hobby: {
        type: String, 
        required: true, 
        min: 6, 
        max: 255
    }, 
    registerDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);