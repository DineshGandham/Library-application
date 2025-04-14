import jwt from 'jsonwebtoken';
import user from '../models/usermodels.js';

const protect = async(req, res, next) => {
    let token = req.headers.authorization;

    if(token && token.startsWith("Bearer")){
        try {
            const decode = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET);
            req.user = await user.findById(decode.id).select("-password")
            next();
        } catch (error) {
            res.status(401).json({message:"Unauthorized - Invalid Token"})
        }
    }else{
        res.status(401).json({message:"No token provided"})
    }
}

export default protect