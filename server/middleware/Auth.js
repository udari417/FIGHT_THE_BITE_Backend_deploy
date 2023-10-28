import Jwt from "jsonwebtoken";
import ENV from "../config.js"

export default async function Auth(req, res, next) {
    try {
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);

        // retrive the user details of the logged user
        const decodedToken =  Jwt.verify(token, ENV.JWT_SECRET);
        // console.log(decodedToken);
        // console.log(decodedToken.nic)
        req.value = decodedToken;
        
        // const id = req.body.id ? req.body.id : "";
        // id ? req.user = {userId : id} : req.user = decodedToken;
        next();
    } catch (error) {
        // console.log(error.message);
        if(error.message === "jwt expired"){
            res.status(404).json({type : "error" , message : "Session Expired"});
        }
        // res.status(401).send({error: "Authentication Failed!"})
    }
}



export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}