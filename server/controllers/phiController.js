import UserModel from '../model/User.model.js';
import VillagerModel from '../model/Vllager.model.js';

export async function getDivisions(req,res){
    const{ email } = req.body;

    try {
        const details = await UserModel.find({email});
        // console.log(divisions);

        // var division = divisions.members;
        // console.log(division);
        // for(const divis in divition){
        //     console.log(divis)
        // }    
        console.log(details[0].gsDivisions)
        // for(const divi)


        if(details){
            // var division = details[0].gsDivisions;
            // console.log(division);
            // res.status(200).json({type : "succes" , message : divisions});
        }else{
            res.status(404).json({type : "error" , message : "not found divition"});
        }
    } catch (error) {
        console.log(error);
    }
}