import PatientModel from '../model/Patient.model.js';
import UserModel from '../model/User.model.js';
import VillagerModel from '../model/Vllager.model.js';

export async function getDivisions(req,res){
    const{ email } = req.body;
    var newlyaffected = 0;
    var alreadyaffected = 0;
    var i =0;

    try {
        const details = await UserModel.findOne({email});
        const gsDivisons = details.gsDivisions
        gsDivisons.forEach( async (element) => {
        //    console.log(element);
            // console.log(gsDivisons.length)
            const newlyaffect = await PatientModel.find({
              divisionNumber: element,
              affectedStatus: 1,
            });
            const alreadyaffect = await PatientModel.find({
              divisionNumber: element,
              affectedStatus: 2,
            });
            if(newlyaffect){
                newlyaffected += newlyaffect.length;
            }
            if(alreadyaffect){
                alreadyaffected += alreadyaffect.length
            }
            i++;
            if (i == gsDivisons.length) {
                res.status(200).json({already : alreadyaffected , newlyaffected : newlyaffected});
             }
        })
       
    } catch (error) {
        console.log(error);
    }
}

export async function addAlreadyPatient(req ,res){
    const{userId, affectedStatus , phicomment} = req.body;

    try {
        const updatePatient = await PatientModel.findOneAndUpdate(
            {userId : userId},
            {affectedStatus : affectedStatus , phicomment : phicomment},
            {new : true}
        );

        if (updatePatient) {
            res.status(200).json({type : "Success"});
        }else{
            res.status(404).json({type : "User not found"});
        }
    } catch (error) {
        console.log(error);
    }
}
