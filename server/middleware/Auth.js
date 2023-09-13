import Jwt from "jsonwebtoken";
// import ENV from "../config.js"

export default async function Auth(req, res, next) {
    try {
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details of the logged user
        const decodedToken =  Jwt.verify(token, process.env.JWT_SECRET);
        
        const id = req.body.id ? req.body.id : "";
        id ? req.user = {userId : id} : req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send({error: "Authentication Failed!"})
    }
}



export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}