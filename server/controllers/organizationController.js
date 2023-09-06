// const generateUniqueId = require("generate-unique-id")
import generateUniqueId from "otp-generator"
import campaignModel from "../model/Campaign.model.js"
import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt";
import axios from "axios";
import CampaignModel from "../model/Campaign.model.js";
// const organizations = require("../model/users/organization")
// const user = require("../model/user")
// const { settime } = require("./timecontroller")
// const user = require("../model/user")
// const bcrypt = require('bcryptjs')
// const { default: UserModel } = require("../model/User.model")

export async function createcampaign (req,res){
    const{name,date,location,report,sponsorshipamount,organizationid,campaigntime} = req.body
    console.log(req.body)
    // try {
        // const time = await settime()
        // console.log(time)
        // generateUniqueId({

        // });
        const details = await UserModel.findOne({_id : organizationid})
        const time = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Colombo");
        const newtime = await time.data.datetime 
        console.log(details);
        // console.log(details.division)
        if(details){
        if(!details.gsDivision){
          res.status(404).json({type : "error" , message : "We cannot see any Associated Division With Your Organization"})
        }
        else{
        // const id = await generateUniqueId({
        //   length: 4,
        //   useLetters: false,
        //   useNumbers: true,

        // });
        // const campid = "Camp_"+id;
        const camp = await new campaignModel({
          name: name,
          date: date,
          time : campaigntime,
          location: location,
          organizationid: organizationid,
          createdAt: newtime,
          updatedAt: newtime,
          divisionNumber : details.divisionNumber,
        });

        const campaign = await camp.save();
        if(campaign){
            console.log(campaign)
            res.status(201).json({type : "success" , message : "Campaign Created Successfully!"})
        }else{
            res.status(404).json({type: "success", message : "There is an Error while creating the campaign.Please Try Again Later"})
        }
      }
    }else{
      res.status(404).json({type : "error" , message : "Campaign Not Found"})
    }
    // } catch (error) {
    //     res.json({type : "error" , message : error})
    // }

}

const getorganization = async(req,res) => {
  const {email} = req.body
  console.log(email);
  const existuser = await organizations.findOne({email})
  if(existuser){
    console.log(existuser)
    res.status(200).json({user : existuser})
  }else{
    res.status(404).json({type : "error" , message : "No User Found"})
  }

}

const getAllCampaigns = async(req,res) => {
  const{division} = req.body
  const existcampaigns = await campaigns.find({division})
  if(existcampaigns){
    console.log(existcampaigns);
    res.status(200).json({type : "success" , message : existcampaigns})
  }
  else{
    res.status(404).json({type : "error" , message : "No Campaign Found"})
  }
}

export async function getOrganizationCampaigns(req,res){
  const{organizationid} = req.body;
  console.log(req.body)
  // const time = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Colombo");
  // const newtime = await time.data.datetime;
  const campaigns = await CampaignModel.find({organizationid});
  console.log(campaigns);
  if(campaigns){
      res.status(200).json({ type: "success", message: campaigns });
  }else{
    res.status(404).json({type : "error" , message : "No Campaign Found"});
  }
}


// module.exports = {createcampaign,registerorganization,getorganization,getAllCampaigns}