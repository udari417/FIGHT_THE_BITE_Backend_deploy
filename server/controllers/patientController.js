import PatientModel from "../model/Patient.model.js";
import UserModel from "../model/User.model.js";
import axios from "axios";

export async function addPatients(req, res) {
    // PatientModel.find({"hic" : "hiv"});
    const {name, address, wardId, phase, userId, affectedStatus, confirmDoctor, affectivityConfirmDate, divisionNumber,houseHoldNo } = req.body;

    const time = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Colombo");
    const newtime = await time.data.datetime;
    console.log(newtime)

    try {

        const patient = await new PatientModel({
            name : name,
            address: address,
            wardId: wardId,
            phase: phase,
            userId: userId,
            affectedStatus: affectedStatus,
            confirmDoctor: confirmDoctor,
            affectivityConfirmDate: newtime,
            houseHoldNo : houseHoldNo,
            divisionNumber: divisionNumber,
            createdAt: newtime,
            updatedAt: newtime,
        })

        const patients = await patient.save();
        if (patients) {
            // console.log(patient);
            res.status(201).json({ type: "success", message: "patient added Successfully!" })
        } else {
            res.status(404).json({ type: "error", message: "There is an Error while add patient.Please Try Again Later" })
        }
    } catch (error) {
        console.log(error);
    }


}

export async function getPatients(req, res) {

    var patients = [];
    var list1 = [];
    var i = 0;

    const { affectedStatus, email } = req.body;

    var details = await UserModel.findOne({ email });

    // console.log(details.gsDivisions);
    var divitions = details.gsDivisions;

    divitions.forEach(async (element) => {
        console.log(element);
        const patient = await PatientModel.find({ affectedStatus, divisionNumber : element });
        // console.log(patient)
        // patients.concat(patient)
        patients.push(patient)

        // console.log(patient)
        // if (i == 0) {
        // patients = patient.slice();
        // }else{
        // patients.push(patient);
        // patients.push(patients)
        // console.log(patients)
        // console.log(p)
        // }
        i++;
        console.log(i);
        
        // console.log(patients);
        if (divitions.length === i) {
            // console.log("Called")
            return res.status(200).json({ patientsList: patients  });
        }
    });
    // console.log(patients)



    // try {

    //     const patients = await PatientModel.find({ affectedStatus , divisionNumber });

    //     console.log(patients);
    //     if (patients) {
    //         res.status(201).json({ type: "success", message: patients });
    //     }else{
    //         res.status(404).json({type : "error" , message : "not found patients"});
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}

export async function getCountPatients(req, res) {

    const { affectedStatus, divisionNumber } = req.body;

    // console.log(affectedStatus);

    try {

        const patients = await PatientModel.getCount({ affectedStatus, divisionNumber });

        console.log(patients);
        if (patients) {
            res.status(201).json({ type: "success", message: patients });
        } else {
            res.status(404).json({ type: "error", message: "not found patients" });
        }
    } catch (error) {
        console.log(error);
    }
}