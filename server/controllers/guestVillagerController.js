import GuestModel from "../model/Guest.model.js";
import bcrypt from "bcrypt";
import UserModel from "../model/User.model.js";

export async function GuestRegister(req,res){
    const{email,address,password,contact,GuestVillager,members,newgsDivision,oldgsDivision,newdivisionnumber} = req.body;
    const existemail = await UserModel.findOne({email})
    const existguest = await GuestModel.findOne({email})
    console.log(existemail);
    if(!existemail && !existguest){
        var hashedpassword = bcrypt.hashSync(password,10)
        if(password){
            const user = new GuestModel({
              email,
              address,
              GuestVillager,
              members,
              newgsDivision,
              oldgsDivision,
              password : hashedpassword,
              newdivisionnumber,
              contact,
            });
            const newuser = await user.save();
            console.log(newuser);
            if(newuser){
                res.status(201).json({type: "success" , message : "Registered Successfully"})
            }else{
                res.status(404).json({type : "error" , message : "User Registration Failed. Please Try Again Later"})
            }
        }
    }else{
        res.status(404).json({type : "error" , message: "Email Already Exists"})
    }
}


export async function getGuestVillagers(req, res) {
    let gnd = req.params.gnd;
    try {
        let data = await GuestModel.find({ newdivisionnumber: gnd, status: 0 });

        if (!data)
            return res.status(501).send({ error: "Cannot find users data" });

        return res.status(201).send(data);
    } catch (error) {
        return res.status(500).send({ error });
    }
}