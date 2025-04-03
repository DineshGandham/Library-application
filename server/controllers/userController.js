import User from "../models/usermodels";

export const verifyUser =async(req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
        res.json({id:user._id, name:user.name, email:user.emai})
    }else {
        res.status(401).json({message: "Invalid Credentials"})
    }
}