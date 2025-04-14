import User from "../models/usermodels.js";
import jwt from 'jsonwebtoken'

export const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "1h"});
}

export const verifyUser =async(req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
        res.json({id:user._id, name:user.name, email:user.email, token: generateToken(user._id)})
    }else {
        res.status(401).json({message: "Invalid Credentials"})
    }
}

export const registerUser = async(req,res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({message:"User already exists"})

    const user = await   User.create({name, email, password});
    res.status(201).json({_id:user._id,message:"User registration successful", token: generateToken(user._id) })
}

export const getUserProfile = async(req, res) =>{
    res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
}