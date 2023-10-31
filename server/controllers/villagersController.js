// import { from } from "nodemailer/lib/mime-node/le-windows.js";
import VillagerModel from "../model/Vllager.model.js";
import UserModel from "../model/User.model.js";
import otpgenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
// import mailerController from "../controllers/mailerController.js";
// import smssender from "../controllers/mailerController.js";
import OtpModel from "../model/Otp.model.js";
// import { smssender } from "../controllers/mailerController.js";
import { smssender } from "../controllers/mailerController.js";
import PatientModel from "../model/Patient.model.js";
import axios from "axios";


export async function villagerregister(req,res){
  const{email,password,divisionNumber,gsDivision,nic,name,contact} = req.body
  
  const existuser = await UserModel.findOne({email});
  // console.log(existuser)
  if(!existuser){
    const hashedpassword =  bcrypt.hashSync(password,10)
    const newuser = await new UserModel({
      nic,
      email,
      divisionNumber,
      gsDivision,
      password : hashedpassword,
      name,
      contact,
      role : "Villager",
      houseHoldNo : "ASD12"
    })

    await newuser.save();
    const message =
      "Dear " +
      name.toUpperCase() +
      ",\\n" +
      "Your Have Successfully Registered as a Villager in our System." +
      "\\n" +
      "Your Registered Details"+ "\\n" +
      "Name: " + name +
      "\\n"+
      "NIC: " + nic +
      "\\n"+
      "E-mail: "+ email +
      "\\n"+
      "Contact: " + contact +
      "\\n"+
      "Division Number: " + divisionNumber +
      "\\n"+
      "Division Name: " + gsDivision +
      "\\n"+
      "Thank You"+
      "\\n"+
      "Fight The Bites Team";
    await smssender(contact,message)
    return res.status(201).json({type : "success", message : "User Registered Succesfully"})
  }else{
    return res.status(404).json({type : "error" , message : "Email Already Exists"})
  }
}


export async function addVillager(req, res) {
  try {
    const { address, gsDivision, divisionNumber, houseHoldNo, members,houseHolderNIC } =
      req.body;

    // check for existing details
    let error = {};
    // let i = 0;
    // while (members[i]) {
    //     const existNIC = await VillagerModel.find({ "members.nic": "123456" } );
    //     const existContact = await VillagerModel.findOne({ contact: members[i].contact });

    //     if (existNIC) {
    //         return res.status(500).send({ nic: members[i].nic });
    //         error.nic = [i, "Please use unique NIC"];
    //     }
    //     if (existContact) {
    //         error.contact = [i, "Please use unique Contact Number"];
    //     }
    //     i++;
    // }

    if (!(Object.keys(error).length === 0 && error.constructor === Object)) {
      return res.status(500).send({ error });
    } else {
      try {
        const user = new VillagerModel({
          address,
          gsDivision,
          divisionNumber,
          houseHoldNo,
          members,
          houseHolderNIC
        });

        // return save result as a response
        user
          .save()
          .then((result) =>
            res.status(201).send({ msg: "Register Successfully" })
          )
          .catch((error) => res.status(500).send({ error }));
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "aiyooo" });
  }
}

//! uploard the image function for competition

export async function SaveCompetitionImage(req,res){
  const {userId} = req.body;

  try {
    let details = await VillagerModel.findOne({_id : userId});

    console.log(details);

    return res.status(200).send({type : "Succes" , message : details});

  } catch (error) {
    console.log(error);
  }
}

export async function getVilagerDetails(req,res){

  const {email} = req.body;

  try {
    var details = await UserModel.findOne({email});

    if(details){
      return res.status(200).send({type : "Success" , message : details});
    }else{
      return res.status(404).send({type : "Error"});
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getVillagers(req, res) {
  // const villagerdetails = new Map();
  var gsDivision;
  var divisionNumber;
  var householdno;
  var address;
  var contact;
  let nic = req.params.nic;
  // const 
  console.log(nic);
  // try {
    // try {
      const existuser = await UserModel.findOne({ nic });
      if(!existuser){
      
      
      let users = await VillagerModel.find({
        members: {
          $elemMatch: {
            nic,
          },
        },
      });
      console.log(users);
      // console.log(users)
      await users.forEach((element) =>  {
        householdno = element.houseHoldNo;
        gsDivision = element.gsDivision;
        divisionNumber = element.divisionNumber;
        address = element.address;

        // villagerdetails.set('gsdivision',element.gsDivision);
        // villagerdetails.set('divisionnumber',element.divisionNumber);
        // villagerdetails.set('householdno',element.houseHoldNo);
        // return villagerdetails;
      });
      // console.log(villagerdetails);
      if (!users) {
        res
          .status(404)
          .json({ type: "error", message: "We Cannot Find Any User" });
      } else {
        let members = users[0].members;
        let i = 0;
        while (members[i]) {
          let nicx = members[i].nic ? members[i].nic : "";
          if (nicx === nic) {
            const firstindex = members[i].contact.charAt(0);
            if (firstindex === "0") {
              // console.log("Hi")
              // members[i].contact.charAt(0) = "94";
              // console.log(members[i].contact)
              const rawmobile = members[i].contact;
              const mobile = "94" + rawmobile.slice(1);
              // console.log(mobile)
              // const otp = await random({
              //   min : 100,
              //   max : 1000,
              // });
              const otp = otpgenerator.generate(4, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
              });
              console.log(otp)

              const message =
                "Dear " +
                members[i].name.toUpperCase() +
                ",\\n" +
                "Your OTP for Villager NIC Validation Process is " +
                "\\n" +
                otp +
                "\\n" +
                "This OTP is Only Valid for 15 minutes." +
                "\\n" +
                "\\n" +
                "Thank You." +
                "\\n" +
                "Fight The Bites Team";
              // bcrypt.
              // console.log(mobile);
              const token = jwt.sign({ nic }, ENV.JWT_SECRET, {
                expiresIn: "15m",
              });
              console.log(token)
              const response = await smssender(
                mobile,
                message
              );
             
              // console.log(response)
              if (response.status === 200) {
                const hashedotp = await bcrypt.hash(otp, 15);
                console.log(hashedotp)
                const otps = new OtpModel({
                  nic,
                  otp: hashedotp,
                  type: 1,
                  token,
                });
                await otps.save();
                console.log(otps);
                // console.log(villagerdetails)
                return res
                  .status(200)
                  .json({gsdivision: gsDivision,divisionnumber: divisionNumber,houseHoldno: householdno,address: address,contact: mobile,message: members[i], type: "success", token });
              }else{
                console.log("There is an error.")
              }
            }

            // const results = axios.post("")

            // mailcontroller.smssender()
            // mailer
            // return res.status(200).send({ member : members[i], type : "success"});
          }
          i++;
        }
        return res
          .status(201)
          .send({ message: "Cannot find NIC", type: "error" });
      }
    }else{
      return res.status(404).json({type : "error" , message : "User Already Exists"})
    }
    // } catch (error) {
    //   return res
    //     .status(500)
    //     .send({ message: "Cannot find NIC", type: "error" });
    // }
  } 
  // } catch (error) {
  //   return res
  //     .status(501)
  //     .send({ type: "error", message: "We Cannot find any User" });
  // }

  export async function getfamilymembers(req,res){
    const familymembers = [];
    const{houseHoldNo} = req.body;
    console.log(req.body);
    const existfamily = await VillagerModel.findOne({houseHoldNo})
    // const existpatients = await PatientModel.findOne({})
    var i = 0;
    if(existfamily){
      for(const element of existfamily.members){
        const existpatient = await PatientModel.findOne({nic : element.nic , affectedStatus : 0})
        if(!existpatient){
          familymembers.push(element)
        }
        i++;
        if (i === existfamily.members.length) {
          return res.json({type : "success" , message : familymembers})
        }
      }

      
    }else{
      return res.status(404).json({type : "error" , message : "No Family Found With this House Hold Number"})
    }
  }

  export async function informaffectivity(req,res){
    const{name,houseHoldNo,divisionNumber,nic,symptoms,contact} = req.body
    console.log(req.body);

    const time = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Colombo");
    // console.log(time)

    const newpatient = await new PatientModel({
      name,
      houseHoldNo,
      divisionNumber,
      nic,
      createdAt: time.data.datetime,
      updatedAt: time.data.datetime,
      symptoms,
    });
    var message =
      "Dear " +
      name.toUpperCase() +
      ",\\n" +
      "\\n" +
      "We informed about Your Symptoms to our Doctor. He will check your Symptoms and send you an invitation for a meeting within 2 hours." +
      "\\n" +
      "We have noticed that you have below mentioned Symptoms" +
      "\\n" +
      "\\n";
      for(let i=0 ; i<symptoms.length;i++) {
        message += "\\t"+"\\t"+"\\t"+ (i+1)+". " + symptoms[i] + "\\n";
      }   
      message += "\\n";
      message += "We wish you a Healthy Life" + "\\n" + "\\n";
      message += "Thank You." +
      "\\n" +
      "\\n" +
      "Fight The Bites Team";
    const mobile = "94" + contact.slice(1);
    await smssender(mobile,message)
    const savedpatient = await newpatient.save()
    if(savedpatient){
      return res.status(201).json({type : "success" , message : "We informed Your Symptoms to our Doctor Successfully. He will contact you within 2 hours."})
    }
    // await smssender()
    
  }

  // export async function getdivisioncampaigns(req,res) {
  //   const{}
  // }
