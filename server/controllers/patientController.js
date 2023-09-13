import PatientModel from "../model/Patient.model.js";
import axios from "axios";

export async function addPatients(req, res) {
    // PatientModel.find({"hic" : "hiv"});
    const { address, wardId, phase, userId, affectedStatus, confirmDoctor, affectivityConfirmDate, divisionNumber } = req.body;

    const time = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Colombo");
    const newtime = await time.data.datetime;
    console.log(newtime)

    try {

        const patient = await new PatientModel({
            address: address,
            wardId: wardId,
            phase: phase,
            userId: userId,
            affectedStatus: affectedStatus,
            confirmDoctor: confirmDoctor,
            affectivityConfirmDate: newtime,
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

    const { affectedStatus , divisionNumber } = req.body;

    // console.log(affectedStatus);

    try {

        const patients = await PatientModel.find({ affectedStatus , divisionNumber });
        
        console.log(patients);
        if (patients) {
            res.status(201).json({ type: "success", message: patients });
        }else{
            res.status(404).json({type : "error" , message : "not found patients"});
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCountPatients(req, res) {

    const { affectedStatus , divisionNumber } = req.body;

    // console.log(affectedStatus);

    try {

        const patients = await PatientModel.getCount({ affectedStatus , divisionNumber });
        
        console.log(patients);
        if (patients) {
            res.status(201).json({ type: "success", message: patients });
        }else{
            res.status(404).json({type : "error" , message : "not found patients"});
        }
    } catch (error) {
        console.log(error);
    }
}