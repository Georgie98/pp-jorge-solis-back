const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const User = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()


//----------------------------Login and register routing and rendering-----------------//
router.get("/login", function(req, res) {
    res.render("login");
})

router.get("/register", function(req, res){
    res.render("register");
})

router.get("/delete", function(req, res){
    res.render("delete");
})


// -------------------------- User register -----------------------------------------//
const schemaRegistered = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    mail: Joi.string().min(6).max(1024).required().email(),
    phone: Joi.number().min(10).required(),
    password: Joi.string().min(6).max(255).required(),
    age: Joi.number().min(1).required(),
    gender: Joi.string().min(3).max(255).required(),
    hobby: Joi.string().min(6).max(255).required()
})

router.post("/register", async (req, res) => {
    
    const {error} = schemaRegistered.validate(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    const existingEmail = await User.findOne({mail: req.body.mail});

    if(existingEmail){
        return res.status(400).json({error:true, mensaje: "email ya registrado"});
    }

    const salt = await bcrypt.genSalt(10);
    const saltPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        mail: req.body.mail,
        phone: req.body.phone,
        password: saltPassword,
        age: req.body.age, 
        gender: req.body.gender, 
        hobby: req.body.hobby
    });

    try{
        const userDB = await user.save();
        res.redirect("login");
    }

    catch (error) {
        res.status(400).json(error);
    }

})

//--------------------------------------End of user registration -------------------//

//-------------------------------------User login----------------------------------//

const schemaLogin = Joi.object({
    mail: Joi.string().min(6).max(1024).required().email(),
    password: Joi.string().min(6).max(255).required()
})

router.post("/login", async (req,res) => {

    const {error} = schemaLogin.validate(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    const user = await User.findOne({mail: req.body.mail});
    if(!user){
        return res.status(400).json({error: "Email no registrado" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).json({error: true, mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign({
        name : user.name, 
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header("auth-token", token);
    
    
});

//-----------------------------------Delete user --------------------------------//

router.post("/delete", async (req,res) => {
    
    await User.deleteOne({mail: req.body.mail});

    res.redirect("delete");

});

//------------------------------Check all users-------------------------------------//

router.get("/users", async (req,res) => {
    
    try{
        const users = await User.find({}).lean();
        res.render("users", {users});
    }
    catch{
        console.error(err);
        res.status(500);
    }
});






module.exports = router; 