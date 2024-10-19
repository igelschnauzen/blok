const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => { //session
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn: "7d"});
}

const registerUser = async (req, res) => {
    try {
        const {name, password} = req.body;

        let user = await userModel.findOne({name});

        if(user) return res.status(400).json("User already exists!");
        if(!name || !password) return res.status(400).json("All fields are required!");
        if(!validator.isStrongPassword(password, {minSymbols: 0})) return res.status(400).json("Invalid password!");

        //registration
        user = new userModel({name, password});

        const salt = await bcrypt.genSalt(10); //hashing a password
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id); //jwt session

        res.status(200).json({_id: user._id, name, token});
    } catch(error) {
        console.log(error);
        res.status(500).json(error);    }
};

const loginUser = async(req, res) => {
    const {name, password} = req.body;

    try {
        let user = await userModel.findOne({name});

        if(!user) return res.status(400).json("Invalid name or password");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json("Invalid name or password");

        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name, token});

    } catch (error) {
        console.log(error);
        res.status(500).json(error);    
    }
}

const findUser = async(req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);
        res.status(200).json(user);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {registerUser, loginUser, findUser, getUsers};
