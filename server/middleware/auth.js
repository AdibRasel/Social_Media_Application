import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({path:"../Config.env"});
export const verifyToken = async (req, res, next)=>{
    try{
        let token = req.header("Authorization");
        
        if(!token){
            return res.status(403).send("access denied");
        }

        if(token.startsWith("Bearer")){
            token = token.slice(7, token.length).trimleft();
        }

        const verifed = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifed;
        
        next()

    }catch(err){
        res.status(500).json({error:err.message})
    }
}