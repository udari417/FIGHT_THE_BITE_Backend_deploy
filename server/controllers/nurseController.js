import UserModel from "../model/User.model.js";

export async function getNurseDetails(req,res){
    console.log(req.body)
    const{email} = req.body;

    if(email){
        var result = await UserModel.findOne({email},"-password")
        // console.log(result.name)
        if(result.phase === "1"){
            return res.json({type : "Febrile Phase",result})
        }else if(result.phase === "2"){
            return res.json({type : "Critical Phase",result})
        }else{
            return res.json({type : "High Critical Phase",result})
        }
        // console.log(result)
        // res.json(result)

    }else{
        res.json({message : "Invalid Email",type : "error"})
    }

    // req.body.name;
    // res.json({message : "Udari"})
}